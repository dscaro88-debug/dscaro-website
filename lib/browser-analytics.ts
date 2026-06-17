"use client"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    ttq?: { track?: (event: string, payload?: Record<string, unknown>) => void }
  }
}

type LeadEventType = "contact-form" | "request-quote" | "trade-account-application"

export function trackLeadSubmitted(type: LeadEventType, leadId: string) {
  if (typeof window === "undefined") return

  window.gtag?.("event", "generate_lead", {
    event_category: "lead",
    event_label: type,
    lead_id: leadId,
    value: 1,
  })

  window.ttq?.track?.("SubmitForm", {
    content_name: type,
    content_id: leadId,
  })
}

export function trackWhatsAppClick(context: string) {
  if (typeof window === "undefined") return

  window.gtag?.("event", "contact", {
    event_category: "engagement",
    event_label: `whatsapp:${context}`,
  })

  window.ttq?.track?.("Contact", {
    channel: "whatsapp",
    context,
  })
}
