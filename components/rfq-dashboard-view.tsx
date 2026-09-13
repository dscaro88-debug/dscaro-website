"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Clock, Flame, PackageCheck, Tags } from "lucide-react"

import type { Locale } from "@/lib/i18n"
import { useLocale } from "@/components/locale-provider"
import { rfqDashboardContent } from "@/lib/rfq-i18n"
import { scoreRfqLead } from "@/lib/rfq-scoring"
import type { CapturedLead } from "@/lib/leads"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const intlLocale: Record<Locale, string> = {
  en: "en-US",
  ja: "ja-JP",
  de: "de-DE",
  es: "es-ES",
  fr: "fr-FR",
  pt: "pt-PT",
  pl: "pl-PL",
}

const loadingText: Record<Locale, string> = {
  en: "Loading leads…",
  ja: "リードを読み込み中…",
  de: "Leads werden geladen…",
  es: "Cargando leads…",
  fr: "Chargement des leads…",
  pt: "Carregando leads…",
  pl: "Ładowanie leadów…",
}

const loadErrorText: Record<Locale, string> = {
  en: "Could not load leads.",
  ja: "リードを読み込めませんでした。",
  de: "Leads konnten nicht geladen werden.",
  es: "No se pudieron cargar los leads.",
  fr: "Impossible de charger les leads.",
  pt: "Não foi possível carregar os leads.",
  pl: "Nie udało się załadować leadów.",
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

function LeadCard({
  lead,
  c,
  locale,
}: {
  lead: DashboardLead
  c: (typeof rfqDashboardContent)[Locale]
  locale: Locale
}) {
  const fields = lead.fields
  const title =
    getText(fields.company) ||
    getText(fields.contactName) ||
    getText(fields.email) ||
    lead.id

  const priorityLabel =
    lead.computedPriority === "Hot"
      ? c.pHot
      : lead.computedPriority === "Qualified"
        ? c.pQualified
        : c.pNurture

  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge className="bg-[#1A365D] text-white">{priorityLabel}</Badge>
          <Badge variant="outline">{lead.computedScore}/100</Badge>
          {lead.computedTags.map((tag) => {
            const label =
              tag === "HIGH VALUE LEAD"
                ? c.tHighValue
                : tag === "OEM POTENTIAL"
                  ? c.tOem
                  : tag === "SAMPLE REQUEST"
                    ? c.tSample
                    : tag
            return (
              <Badge key={tag} className="bg-[#E67E22]/10 text-[#B85613]">
                {label}
              </Badge>
            )
          })}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p><span className="font-medium text-foreground">{c.fBuyer}:</span> {getText(fields.buyerType || fields.facilityType) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fProduct}:</span> {getText(fields.product || fields.productCategory) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fQuantity}:</span> {getText(fields.estimatedQuantity || fields.quantity) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fMonthly}:</span> {getText(fields.monthlyVolume) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fUrgency}:</span> {getText(fields.urgencyLevel) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fOem}:</span> {getText(fields.oemRequired) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fCountry}:</span> {getText(fields.country) || c.notProvided}</p>
          <p><span className="font-medium text-foreground">{c.fSubmitted}:</span> {new Date(lead.submittedAt).toLocaleString(intlLocale[locale] ?? "en-US")}</p>
        </div>
        {getText(fields.message) ? (
          <p className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            {getText(fields.message)}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-muted-foreground">{c.fLeadId}: {lead.id}</p>
      </CardContent>
    </Card>
  )
}

export function RfqDashboardView() {
  const { locale } = useLocale()
  const c = rfqDashboardContent[locale] ?? rfqDashboardContent.en

  const [leads, setLeads] = useState<DashboardLead[]>([])
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let active = true
    fetch("/api/rfq/leads")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        const raw: CapturedLead[] = Array.isArray(data?.leads) ? data.leads : []
        setLeads(raw.map(leadToDashboardLead))
        setStatus("ready")
      })
      .catch(() => {
        if (!active) return
        setStatus("error")
      })
    return () => {
      active = false
    }
  }, [])

  const hotLeads = leads.filter((lead) => lead.computedPriority === "Hot")
  const qualifiedLeads = leads.filter((lead) => lead.computedPriority === "Qualified")
  const highValueLeads = leads.filter((lead) => lead.computedTags.includes("HIGH VALUE LEAD"))
  const oemLeads = leads.filter((lead) => lead.computedTags.includes("OEM POTENTIAL"))
  const sampleLeads = leads.filter((lead) => lead.computedTags.includes("SAMPLE REQUEST"))

  const metrics = [
    { label: c.metricTotal, value: leads.length, icon: PackageCheck },
    { label: c.metricHot, value: hotLeads.length, icon: Flame },
    { label: c.metricQualified, value: qualifiedLeads.length, icon: BadgeCheck },
    { label: c.metricOem, value: oemLeads.length, icon: Tags },
    { label: c.metricSample, value: sampleLeads.length, icon: Clock },
  ]

  return (
    <>
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container-wide">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">
                {c.badge}
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                {c.heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                {c.heroDesc}
              </p>
            </div>
            <Link href="/rfq">
              <Button className="h-11 bg-[#E67E22] text-white hover:bg-[#D35400]">
                {c.openForm}
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

          {status === "loading" ? (
            <p className="mt-10 rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
              {loadingText[locale] ?? loadingText.en}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="mt-10 rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
              {loadErrorText[locale] ?? loadErrorText.en}
            </p>
          ) : null}

          {status === "ready" ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{c.sectionHot}</h2>
                <div className="space-y-4">
                  {(hotLeads.length > 0 ? hotLeads : highValueLeads).slice(0, 8).map((lead) => (
                    <LeadCard key={lead.id} lead={lead} c={c} locale={locale} />
                  ))}
                  {hotLeads.length === 0 && highValueLeads.length === 0 ? (
                    <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                      {c.emptyHot}
                    </p>
                  ) : null}
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{c.sectionOem}</h2>
                <div className="space-y-4">
                  {[...oemLeads, ...sampleLeads]
                    .filter((lead, index, arr) => arr.findIndex((item) => item.id === lead.id) === index)
                    .slice(0, 8)
                    .map((lead) => (
                      <LeadCard key={lead.id} lead={lead} c={c} locale={locale} />
                    ))}
                  {oemLeads.length === 0 && sampleLeads.length === 0 ? (
                    <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                      {c.emptyOem}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {status === "ready" ? (
            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-bold text-foreground">{c.sectionAll}</h2>
              <div className="grid gap-4">
                {leads.slice(0, 20).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} c={c} locale={locale} />
                ))}
                {leads.length === 0 ? (
                  <p className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                    {c.emptyAll}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
