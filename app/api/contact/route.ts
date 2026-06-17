import { NextRequest, NextResponse } from "next/server"
import { captureLead } from "@/lib/leads"
import { siteConfig } from "@/lib/site-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, orderNumber, message } = body

    // Basic validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required" },
        { status: 400 }
      )
    }

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
