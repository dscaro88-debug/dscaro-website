import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { FaqSection } from "@/components/seo/faq-section"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { whyDscaroFaqs } from "@/lib/aeo-faqs"

export const metadata: Metadata = {
  title: "Why DS CARO for Adult Incontinence Skin Care",
  description:
    "Why nursing homes, assisted living buyers, distributors, and care-supply brands choose DS CARO for B2B Adult Incontinence Skin Care, OEM support, MOQ clarity, and SKU-level document review.",
  alternates: {
    canonical: "/why-dscaro",
  },
}

export default function WhyDscaroPage() {
  return (
    <>
      <FaqJsonLd faqs={whyDscaroFaqs} />
      <ProcurementDecisionPageTemplate slug="why-dscaro" />
      <FaqSection
        faqs={whyDscaroFaqs}
        eyebrow="Buyer Questions"
        title="Why buyers choose DS CARO"
        intro="How DS CARO differs from a general senior-care supplier, which product lines we focus on, and the practical terms — MOQ, samples, lead time, pricing — that decide whether a first order is easy to place."
        ctaLabel="Request Procurement Quote"
        ctaHref="/rfq?source=why-dscaro-faq"
      />
    </>
  )
}
