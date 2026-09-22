import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { FaqSection } from "@/components/seo/faq-section"
import { HowToJsonLd } from "@/components/seo/aeo-json-ld"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { howToOrderBulkFaqs } from "@/lib/aeo-faqs"

export const metadata: Metadata = {
  title: "How to Order Adult Incontinence Skin Care in Bulk",
  description:
    "Bulk ordering process for Adult Incontinence Skin Care: RFQ, MOQ, FOB pricing tiers, sample approval, packaging, OEM options, production timeline, and shipment preparation.",
  alternates: {
    canonical: "/how-to-order-bulk",
  },
}

export default function HowToOrderBulkPage() {
  return (
    <>
      <FaqJsonLd faqs={howToOrderBulkFaqs} />
      <HowToJsonLd slug="how-to-order-bulk" />
      <ProcurementDecisionPageTemplate slug="how-to-order-bulk" />
      <FaqSection
        faqs={howToOrderBulkFaqs}
        eyebrow="Bulk Ordering Questions"
        title="Bulk ordering: common buyer questions"
        intro="What care facilities, distributors and online sellers ask before their first bulk order — MOQ, mixed SKUs, samples, pricing tiers and repeat-order planning."
        ctaLabel="Start Bulk RFQ"
        ctaHref="/rfq?source=how-to-order-bulk-faq"
      />
    </>
  )
}
