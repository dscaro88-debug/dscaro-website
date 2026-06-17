import { NextResponse } from "next/server"
import { getLeadStorageLocation, readLatestLeads } from "@/lib/lead-storage"

export const runtime = "nodejs"

export async function GET() {
  const latestLeads = await readLatestLeads()
  const storage = getLeadStorageLocation()

  return NextResponse.json({
    ok: true,
    leadDelivery: {
      emailConfigured: Boolean(process.env.RESEND_API_KEY),
      webhookConfigured: Boolean(process.env.LEAD_WEBHOOK_URL),
      notifyEmail: process.env.LEAD_NOTIFY_EMAIL || "dscaro88@gmail.com",
    },
    analytics: {
      ga4Configured: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      googleVerificationConfigured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
      tiktokConfigured: Boolean(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID),
    },
    storage: {
      location: storage,
      recentLeadCount: latestLeads.length,
      latestLeadId: latestLeads[0]?.id || null,
    },
  })
}
