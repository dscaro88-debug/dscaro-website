import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"

export const metadata: Metadata = {
  title: "Quality & Certification File Review for Care Supplies",
  description:
    "Quality, material safety, RoHS / REACH discussion, non-medical classification, labels, manuals, and SKU-level document file review for DS CARO Adult Incontinence Skin Care.",
  alternates: {
    canonical: "/quality-certifications",
  },
}

export default function QualityCertificationsPage() {
  return <ProcurementDecisionPageTemplate slug="quality-certifications" />
}
