import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"

export const metadata: Metadata = {
  title: "Why DS CARO for Adult Incontinence Skin Care",
  description:
    "Why nursing homes, assisted living buyers, distributors, and care-supply brands choose DS CARO for B2B Adult Incontinence Skin Care, OEM support, MOQ clarity, and SKU-level document review.",
  alternates: {
    canonical: "/why-dscaro",
  },
}

export default function WhyDscaroPage() {
  return <ProcurementDecisionPageTemplate slug="why-dscaro" />
}
