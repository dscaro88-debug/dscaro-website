import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type { CapturedLead } from "@/lib/leads"

export interface LeadArchiveResult {
  status: "saved" | "failed"
  ledgerPath?: string
}

interface ArchiveLeadOptions {
  appendLedger?: boolean
}

const localLeadDir = path.join(process.cwd(), "data", "leads")
const runtimeLeadDir = process.env.VERCEL ? "/tmp/dscaro-leads" : localLeadDir
const jsonLedgerPath = path.join(runtimeLeadDir, "latest-leads.json")
const ndjsonLedgerPath = path.join(runtimeLeadDir, "lead-ledger.ndjson")

export async function archiveLead(
  lead: CapturedLead,
  options: ArchiveLeadOptions = {}
): Promise<LeadArchiveResult> {
  const { appendLedger = true } = options

  try {
    await mkdir(runtimeLeadDir, { recursive: true })

    const existing = await readLatestLeads()
    const latest = [lead, ...existing.filter((entry) => entry.id !== lead.id)].slice(0, 100)

    await writeFile(jsonLedgerPath, JSON.stringify(latest, null, 2), "utf8")

    if (appendLedger) {
      await writeFile(
        ndjsonLedgerPath,
        `${JSON.stringify(lead)}\n`,
        { encoding: "utf8", flag: "a" }
      )
    }

    return {
      status: "saved",
      ledgerPath: ndjsonLedgerPath,
    }
  } catch (error) {
    console.error("[DS CARO Lead Archive Error]", error)
    return { status: "failed" }
  }
}

export async function readLatestLeads(): Promise<CapturedLead[]> {
  try {
    const raw = await readFile(jsonLedgerPath, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed as CapturedLead[] : []
  } catch {
    return []
  }
}

export function getLeadStorageLocation() {
  return {
    directory: runtimeLeadDir,
    latestJson: jsonLedgerPath,
    ledgerNdjson: ndjsonLedgerPath,
  }
}
