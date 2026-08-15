import { NextRequest, NextResponse } from "next/server"
import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"
import { validateContactPayload } from "@/lib/security/lead-validation"
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit"
import { verifyTurnstileToken } from "@/lib/security/turnstile"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ip = getClientIp(request)

    // 1) Rate limit by IP — cheapest check, runs first to blunt bursts.
    const ipLimit = checkRateLimit({ key: "contact-ip", id: ip, windowMs: 60_000, max: 5 })
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
      )
    }

    // 2) Honeypot + field-format validation.
    const validation = validateContactPayload(body)
    if (!validation.ok) {
      console.warn("[Contact] rejected:", validation.reason, "| ip:", ip, "| email:", body.email)
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    // 3) Rate limit by email.
    const emailLimit = checkRateLimit({
      key: "contact-email",
      id: String(body.email || ip),
      windowMs: 60_000,
      max: 3,
    })
    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests from this email. Please try again later." },
        { status: 429, headers: { "Retry-After": String(emailLimit.retryAfterSec) } }
      )
    }

    // 4) Cloudflare Turnstile (enforced only once keys are provisioned).
    const turnstile = await verifyTurnstileToken(body.cfTurnstileToken, ip)
    if (turnstile.configured && !turnstile.success) {
      console.warn("[Contact] turnstile failed | ip:", ip, "| email:", body.email)
      return NextResponse.json(
        { error: "Human verification failed. Please refresh and try again." },
        { status: 403 }
      )
    }

    const { firstName, lastName, email, phone, subject, orderNumber, message } = body

    const lead = await captureLead({
      source: "dscaro.com",
      type: "contact-form",
      fields: {
        name: `${firstName} ${lastName || ""}`.trim(),
        email,
        phone,
        subject,
        orderNumber,
        message,
      },
    })

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        delivery: lead.delivery,
        message: `Thank you for your inquiry. It has been recorded for ${siteConfig.email}. Our B2B team will respond within 1 business day.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[Contact API Error]", error)
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    )
  }
}
