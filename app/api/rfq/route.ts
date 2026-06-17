import { NextRequest, NextResponse } from "next/server"

import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      company,
      name,
      email,
      phone,
      country,
      product,
      sku,
      quantity,
      targetMarket,
      destinationPort,
      packagingNeeds,
      certificationNeeds,
      sourcePage,
      message,
    } = body

    if (!name || !email || !product || !quantity) {
      return NextResponse.json(
        { error: "Name, email, product, and quantity are required" },
        { status: 400 }
      )
    }

    const lead = await captureLead({
      source: "dscaro.com",
      type: "rfq-form",
      fields: {
        company,
        contactName: name,
        email,
        phone,
        country,
        product,
        sku,
        quantity,
        targetMarket,
        destinationPort,
        packagingNeeds,
        certificationNeeds,
        sourcePage,
        message,
      },
    })

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
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
