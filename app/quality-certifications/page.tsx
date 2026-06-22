import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { procurementDecisionPages } from "@/lib/procurement-decision-pages"

const page = procurementDecisionPages["quality-certifications"]

export const metadata: Metadata = {
  title: "Quality & Certification File Review for Care Supplies",
  description:
    "Quality, material safety, RoHS / REACH discussion, non-medical classification, labels, manuals, and SKU-level document file review for DS CARO long-term care supplies.",
  alternates: {
    canonical: "/quality-certifications",
  },
}

export default function QualityCertificationsPage() {
  return <ProcurementDecisionPageTemplate page={page} />
}
