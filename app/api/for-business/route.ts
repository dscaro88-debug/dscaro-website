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
    const businessType = body.businessType
    const inquiryType = body.inquiryType
    const productCategory = body.productCategory || body.productInterests
    const estimatedQuantity = body.estimatedQuantity || body.expectedVolume || body.orderVolume
    const timeline = body.timeline
    const oemNeeds = body.oemNeeds
    const message = body.message

    if (!companyName || !contactName || !email || !country || !businessType || !inquiryType || !productCategory) {
      return NextResponse.json(
        { error: "Company, contact, email, country, business type, inquiry type, and product category are required" },
        { status: 400 }
      )
    }

    const lead = await captureLead({
      source: "dscaro.com",
      type: "business-inquiry",
      fields: {
        companyName,
        contactName,
        email,
        phone,
        country,
        businessType,
        inquiryType,
        productCategory,
        estimatedQuantity,
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
          `Your inquiry has been recorded for ${siteConfig.email}. Our B2B team will prepare a tailored proposal and contact you within 24 hours.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[For Business API Error]", error)
    return NextResponse.json(
      { error: "Failed to process your inquiry" },
      { status: 500 }
    )
  }
}
