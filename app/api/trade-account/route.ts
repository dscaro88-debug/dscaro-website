import { NextRequest, NextResponse } from "next/server"
import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"
import { validateTradeAccountPayload } from "@/lib/security/lead-validation"
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit"
import { verifyTurnstileToken } from "@/lib/security/turnstile"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ip = getClientIp(request)

    // 1) Rate limit by IP — cheapest check, runs first to blunt bursts.
    const ipLimit = checkRateLimit({ key: "trade-ip", id: ip, windowMs: 60_000, max: 5 })
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
      )
    }

    // 2) Honeypot + field-format / gibberish validation.
    const validation = validateTradeAccountPayload(body)
    if (!validation.ok) {
      console.warn("[Trade Account] rejected:", validation.reason, "| ip:", ip, "| email:", body.email)
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    // 3) Rate limit by email.
    const emailLimit = checkRateLimit({
      key: "trade-email",
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
      console.warn("[Trade Account] turnstile failed | ip:", ip, "| email:", body.email)
      return NextResponse.json(
        { error: "Human verification failed. Please refresh and try again." },
        { status: 403 }
      )
    }

    const companyName = body.companyName || body.company
    const contactName = body.contactName || body.name
    const email = body.email
    const phone = body.phone
    const country = body.country
    const website = body.website
    const businessType = body.businessType
    const annualRevenue = body.annualRevenue
    const productInterests = body.productInterests || body.productCategory
    const expectedVolume = body.expectedVolume || body.orderVolume
    const targetMarket = body.targetMarket
    const timeline = body.timeline
    const oemNeeds = body.oemNeeds
    const message = body.message

    const lead = await captureLead({
      source: "dscaro.com",
      type: "trade-account-application",
      fields: {
        companyName,
        contactName,
        email,
        phone,
        country,
        website,
        businessType,
        annualRevenue,
        productInterests,
        expectedVolume,
        targetMarket,
        timeline,
        oemNeeds,
        message,
        rawPayload: body,
      },
    })

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        delivery: lead.delivery,
        message:
          `Your trade account application has been recorded for ${siteConfig.email}. Our B2B team will review it and respond within 1 business day.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[Trade Account API Error]", error)
    return NextResponse.json(
      { error: "Failed to process your application" },
      { status: 500 }
    )
  }
}
