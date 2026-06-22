import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Clock, Flame, PackageCheck, Tags } from "lucide-react"

import type { CapturedLead } from "@/lib/leads"
import { readLatestLeads } from "@/lib/lead-storage"
import { scoreRfqLead } from "@/lib/rfq-scoring"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "RFQ Dashboard — DS CARO",
  description: "Categorized RFQ dashboard for DS CARO long-term care supply inquiries.",
  robots: {
    index: false,
    follow: false,
  },
}

type DashboardLead = CapturedLead & {
  computedScore: number
  computedPriority: string
  computedTags: string[]
}

function getText(value: unknown) {
  if (Array.isArray(value)) return value.join(", ")
  if (value === null || value === undefined) return ""
  return String(value)
}

function leadToDashboardLead(lead: CapturedLead): DashboardLead {
  const fallback = scoreRfqLead(lead.fields)
  const tags = Array.isArray(lead.fields.leadTags)
    ? lead.fields.leadTags.map(String)
    : fallback.tags

  return {
    ...lead,
    computedScore:
      typeof lead.fields.leadScore === "number" ? lead.fields.leadScore : fallback.score,
    computedPriority:
      typeof lead.fields.leadPriority === "string" ? lead.fields.leadPriority : fallback.priority,
    computedTags: tags,
  }
}

function LeadCard({ lead }: { lead: DashboardLead }) {
  const fields = lead.fields
  const title =
    getText(fields.company) ||
    getText(fields.contactName) ||
    getText(fields.email) ||
    lead.id

  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge className="bg-[#1A365D] text-white">{lead.computedPriority}</Badge>
          <Badge variant="outline">{lead.computedScore}/100</Badge>
          {lead.computedTags.map((tag) => (
            <Badge key={tag} className="bg-[#E67E22]/10 text-[#B85613]">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p><span className="font-medium text-foreground">Buyer:</span> {getText(fields.buyerType || fields.facilityType) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Product:</span> {getText(fields.product || fields.productCategory) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Quantity:</span> {getText(fields.estimatedQuantity || fields.quantity) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Monthly:</span> {getText(fields.monthlyVolume) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Urgency:</span> {getText(fields.urgencyLevel) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">OEM:</span> {getText(fields.oemRequired) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Country:</span> {getText(fields.country) || "Not provided"}</p>
          <p><span className="font-medium text-foreground">Submitted:</span> {new Date(lead.submittedAt).toLocaleString("en-US")}</p>
        </div>
        {getText(fields.message) ? (
          <p className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            {getText(fields.message)}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-muted-foreground">Lead ID: {lead.id}</p>
      </CardContent>
    </Card>
  )
}

export default async function RfqDashboardPage() {
  const leads = (await readLatestLeads()).map(leadToDashboardLead)
  const hotLeads = leads.filter((lead) => lead.computedPriority === "Hot")
  const qualifiedLeads = leads.filter((lead) => lead.computedPriority === "Qualified")
  const highValueLeads = leads.filter((lead) => lead.computedTags.includes("HIGH VALUE LEAD"))
  const oemLeads = leads.filter((lead) => lead.computedTags.includes("OEM POTENTIAL"))
  const sampleLeads = leads.filter((lead) => lead.computedTags.includes("SAMPLE REQUEST"))

  const metrics = [
    { label: "Total RFQs", value: leads.length, icon: PackageCheck },
    { label: "Hot Leads", value: hotLeads.length, icon: Flame },
    { label: "Qualified", value: qualifiedLeads.length, icon: BadgeCheck },
    { label: "OEM Potential", value: oemLeads.length, icon: Tags },
    { label: "Sample Requests", value: sampleLeads.length, icon: Clock },
  ]

  return (
    <>
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container-wide">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">
                RFQ Dashboard
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                Categorized Buyer Inquiries
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                New RFQs are automatically scored and tagged by buyer type, monthly volume, urgency, OEM signal, and sample request intent.
              </p>
            </div>
            <Link href="/rfq">
              <Button className="h-11 bg-[#E67E22] text-white hover:bg-[#D35400]">
                Open RFQ Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <Icon className="mb-4 h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{metric.value}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Hot / High Value</h2>
              <div className="space-y-4">
                {(hotLeads.length > 0 ? hotLeads : highValueLeads).slice(0, 8).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
                {hotLeads.length === 0 && highValueLeads.length === 0 ? (
                  <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                    No hot leads yet. New high-volume distributor, nursing home, and OEM RFQs will appear here.
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">OEM / Sample Follow-Up</h2>
              <div className="space-y-4">
                {[...oemLeads, ...sampleLeads]
                  .filter((lead, index, arr) => arr.findIndex((item) => item.id === lead.id) === index)
                  .slice(0, 8)
                  .map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                {oemLeads.length === 0 && sampleLeads.length === 0 ? (
                  <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                    No OEM or sample leads yet. OEM and sample signals are tagged automatically after submission.
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold text-foreground">All Recent RFQs</h2>
            <div className="grid gap-4">
              {leads.slice(0, 20).map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
              {leads.length === 0 ? (
                <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                  No RFQs recorded in the current runtime ledger yet.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
