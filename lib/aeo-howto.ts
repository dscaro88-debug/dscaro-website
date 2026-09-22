// DS CARO — HowTo structured data source (2026-09-22)
// The procurement pages already define a 4-step process array in
// lib/procurement-decision-pages.ts. That data is HowTo-ready — it was simply
// never emitted as JSON-LD. This file exposes it in schema.org shape.

import { procurementDecisionPages } from "@/lib/procurement-decision-pages"

export interface HowToStep {
  title: string
  desc: string
}

export interface HowToDefinition {
  name: string
  description: string
  totalTime?: string
  steps: HowToStep[]
}

export const howToDefinitions: Record<string, HowToDefinition> = {
  "how-to-order-bulk": {
    name: procurementDecisionPages["how-to-order-bulk"].title,
    description: procurementDecisionPages["how-to-order-bulk"].description,
    totalTime: "P30D",
    steps: procurementDecisionPages["how-to-order-bulk"].process,
  },
  "oem-private-label-process": {
    name: procurementDecisionPages["oem-private-label-process"].title,
    description: procurementDecisionPages["oem-private-label-process"].description,
    totalTime: "P45D",
    steps: procurementDecisionPages["oem-private-label-process"].process,
  },
  "quality-certifications": {
    name: "How DS CARO reviews SKU documentation before production",
    description: procurementDecisionPages["quality-certifications"].description,
    steps: procurementDecisionPages["quality-certifications"].process,
  },
}

// ─── Entity signals ─────────────────────────────────────────────────────────
// SameAs links let AI models confirm DS CARO is one real entity rather than
// several unrelated ones. Add only profiles that actually exist and are owned
// by DS CARO. Empty array => the field is omitted from JSON-LD entirely.
export const socialProfiles: string[] = [
  // "https://www.linkedin.com/company/ds-caro",
  // "https://www.youtube.com/@dscaro",
]

// Stable business identifiers, if/when available. Omit rather than guess.
export const businessIdentifiers: { type: string; value: string }[] = []
