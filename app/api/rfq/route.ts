import { NextRequest, NextResponse } from "next/server"

import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"
import { scoreRfqLead } from "@/lib/rfq-scoring"
import { validateRfqPayload } from "@/lib/security/lead-validation"
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit"
import { verifyTurnstileToken } from "@/lib/security/turnstile"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ip = getClientIp(request)

    // 1) Rate limit by IP — cheapest check, runs first to blunt bursts.
    const ipLimit = checkRateLimit({ key: "rfq-ip", id: ip, windowMs: 60_000, max: 5 })
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfterSec) } }
      )
    }

    // 2) Honeypot + field-format / gibberish validation.
    const validation = validateRfqPayload(body)
    if (!validation.ok) {
      console.warn("[RFQ] rejected:", validation.reason, "| ip:", ip, "| email:", body.email)
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    // 3) Rate limit by email — blocks one address hammering the form repeatedly.
    const emailLimit = checkRateLimit({
      key: "rfq-email",
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
      console.warn("[RFQ] turnstile failed | ip:", ip, "| email:", body.email)
      return NextResponse.json(
        { error: "Human verification failed. Please refresh and try again." },
        { status: 403 }
      )
    }

    const {
      company,
      name,
      email,
      phone,
      country,
      buyerType,
      facilityType,
      productCategory,
      product,
      sku,
      quantity,
      estimatedQuantity,
      monthlyVolume,
      urgencyLevel,
      oemRequired,
      targetMarket,
      destinationPort,
      packagingNeeds,
      certificationNeeds,
      sourcePage,
      message,
    } = body

    const requestedProduct = product || productCategory
    const requestedQuantity = quantity || estimatedQuantity

    const scoring = scoreRfqLead({
      ...body,
      product: requestedProduct,
      quantity: requestedQuantity,
      estimatedQuantity: requestedQuantity,
    })

    const lead = await captureLead({
      source: "dscaro.com",
      type: "rfq-form",
      fields: {
        company,
        contactName: name,
        email,
        phone,
        country,
        buyerType,
        facilityType,
        productCategory,
        product: requestedProduct,
        sku,
        quantity: requestedQuantity,
        estimatedQuantity: requestedQuantity,
        monthlyVolume,
        urgencyLevel,
        oemRequired,
        targetMarket,
        destinationPort,
        packagingNeeds,
        certificationNeeds,
        sourcePage,
        message,
        leadScore: scoring.score,
        leadPriority: scoring.priority,
        leadTags: scoring.tags,
        leadReasons: scoring.reasons,
      },
    })

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        leadScore: scoring.score,
        leadPriority: scoring.priority,
        leadTags: scoring.tags,
        leadReasons: scoring.reasons,
        delivery: lead.delivery,
        message: `Thank you. Your RFQ has been recorded for ${siteConfig.email}. We will reply with MOQ, FOB, lead time, and current document status within 1 business day.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[RFQ API Error]", error)
    return NextResponse.json(
      { error: "Failed to process your RFQ" },
      { status: 500 }
    )
  }
}
