import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { FaqSection } from "@/components/seo/faq-section"
import { HowToJsonLd } from "@/components/seo/aeo-json-ld"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { oemPrivateLabelFaqs } from "@/lib/aeo-faqs"

export const metadata: Metadata = {
  title: "OEM & Private Label Process for Care Supply Buyers",
  description:
    "DS CARO OEM and private label process for care product distributors and online sellers: logo label, packaging, carton marks, inserts, SKU files, MOQ, and production timeline.",
  alternates: {
    canonical: "/oem-private-label-process",
  },
}

export default function OemPrivateLabelProcessPage() {
  return (
    <>
      <FaqJsonLd faqs={oemPrivateLabelFaqs} />
      <HowToJsonLd slug="oem-private-label-process" />
      <ProcurementDecisionPageTemplate slug="oem-private-label-process" />
      <FaqSection
        faqs={oemPrivateLabelFaqs}
        eyebrow="Private Label Questions"
        title="OEM and private label: what buyers ask first"
        intro="How OEM differs from private label, what can actually be customised, who handles label language and barcode, and how long an artwork round adds to your timeline."
        ctaLabel="Discuss OEM Project"
        ctaHref="/rfq?source=oem-private-label-process-faq&oem=Yes"
      />
    </>
  )
}
