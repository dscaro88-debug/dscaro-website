import { NextRequest, NextResponse } from "next/server"
import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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

    if (!companyName || !contactName || !email || !country || !businessType || !productInterests) {
      return NextResponse.json(
        { error: "Company, contact, email, country, business type, and product interest are required" },
        { status: 400 }
      )
    }

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
