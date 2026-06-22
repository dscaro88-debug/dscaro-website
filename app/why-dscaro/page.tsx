import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { procurementDecisionPages } from "@/lib/procurement-decision-pages"

const page = procurementDecisionPages["why-dscaro"]

export const metadata: Metadata = {
  title: "Why DS CARO for Long-Term Care Supplies",
  description:
    "Why nursing homes, assisted living buyers, distributors, and care-supply brands choose DS CARO for B2B long-term care supplies, OEM support, MOQ clarity, and SKU-level document review.",
  alternates: {
    canonical: "/why-dscaro",
  },
}

export default function WhyDscaroPage() {
  return <ProcurementDecisionPageTemplate page={page} />
}
