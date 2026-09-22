import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { FaqSection } from "@/components/seo/faq-section"
import { HowToJsonLd } from "@/components/seo/aeo-json-ld"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { qualityCertificationsFaqs } from "@/lib/aeo-faqs"

export const metadata: Metadata = {
  title: "Quality & Certification File Review for Care Supplies",
  description:
    "Quality, material safety, RoHS / REACH discussion, non-medical classification, labels, manuals, and SKU-level document file review for DS CARO Adult Incontinence Skin Care.",
  alternates: {
    canonical: "/quality-certifications",
  },
}

export default function QualityCertificationsPage() {
  return (
    <>
      <FaqJsonLd faqs={qualityCertificationsFaqs} />
      <HowToJsonLd slug="quality-certifications" />
      <ProcurementDecisionPageTemplate slug="quality-certifications" />
      <FaqSection
        faqs={qualityCertificationsFaqs}
        eyebrow="Document Questions"
        title="Documents, testing and market-entry questions"
        intro="Which files exist for each SKU, how RoHS / REACH and COA requests are handled, and where the buyer's own market-entry responsibility starts."
        ctaLabel="Request File Review"
        ctaHref="/rfq?source=quality-certifications-faq"
      />
    </>
  )
}
