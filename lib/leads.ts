import { siteConfig } from "@/lib/site-config"
import { archiveLead } from "@/lib/lead-storage"

export interface LeadPayload {
  source: string
  type: string
  fields: Record<string, unknown>
}

export interface CapturedLead extends LeadPayload {
  id: string
  submittedAt: string
  delivery: {
    archive: "saved" | "failed"
    email: "sent" | "skipped" | "failed"
    webhook: "sent" | "skipped" | "failed"
  }
  ledgerPath?: string
}

export async function captureLead(payload: LeadPayload): Promise<CapturedLead> {
  const lead = {
    ...payload,
    fields: {
      recipientEmail: siteConfig.email,
      ...payload.fields,
    },
    id: `${payload.source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    delivery: {
      archive: "failed" as const,
      email: "skipped" as const,
      webhook: "skipped" as const,
    },
  }

  console.log("[DS CARO Lead]", JSON.stringify(lead))

  const archive = await archiveLead(lead, { appendLedger: false })
  lead.delivery.archive = archive.status
  lead.ledgerPath = archive.ledgerPath
  lead.delivery.email = await sendLeadEmail(lead)
  lead.delivery.webhook = await sendLeadWebhook(lead)
  const finalArchive = await archiveLead(lead)

  if (finalArchive.status === "saved") {
    lead.delivery.archive = "saved"
    lead.ledgerPath = finalArchive.ledgerPath
  }

  return lead
}

async function sendLeadWebhook(lead: CapturedLead): Promise<CapturedLead["delivery"]["webhook"]> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL

  if (!webhookUrl) return "skipped"

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })

    if (!res.ok) {
      console.error("[DS CARO Lead Webhook Error]", res.status, await res.text())
      return "failed"
    }
    return "sent"
  } catch (error) {
    console.error("[DS CARO Lead Webhook Failure]", error)
    return "failed"
  }
}

async function sendLeadEmail(lead: CapturedLead): Promise<CapturedLead["delivery"]["email"]> {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) return "skipped"

  const to = process.env.LEAD_NOTIFY_EMAIL || siteConfig.email
  const from = process.env.LEAD_FROM_EMAIL || "DS CARO Website <onboarding@resend.dev>"
  const subject = `[DS CARO] New ${humanizeLeadType(lead.type)} - ${leadTitle(lead)}`

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: typeof lead.fields.email === "string" ? lead.fields.email : undefined,
        subject,
        text: leadPlainText(lead),
        html: leadHtml(lead),
      }),
    })

    if (!res.ok) {
      console.error("[DS CARO Lead Email Error]", res.status, await res.text())
      return "failed"
    }
    return "sent"
  } catch (error) {
    console.error("[DS CARO Lead Email Failure]", error)
    return "failed"
  }
}

function humanizeLeadType(type: string) {
  return type
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function leadTitle(lead: CapturedLead) {
  const company = lead.fields.companyName || lead.fields.company
  const name = lead.fields.contactName || lead.fields.name
  const product = lead.fields.productInterests || lead.fields.productCategory || lead.fields.subject
  return [company, name, product].filter(Boolean).join(" / ") || lead.id
}

function leadPlainText(lead: CapturedLead) {
  return [
    `Lead ID: ${lead.id}`,
    `Submitted: ${lead.submittedAt}`,
    `Source: ${lead.source}`,
    `Type: ${humanizeLeadType(lead.type)}`,
    "",
    ...Object.entries(lead.fields).map(([key, value]) => `${key}: ${formatValue(value)}`),
  ].join("\n")
}

function leadHtml(lead: CapturedLead) {
  const rows = Object.entries(lead.fields)
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(formatValue(value))}</td></tr>`
    )
    .join("")

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2>New DS CARO ${escapeHtml(humanizeLeadType(lead.type))}</h2>
      <p><strong>Lead ID:</strong> ${escapeHtml(lead.id)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(lead.submittedAt)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table>
    </div>
  `
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
