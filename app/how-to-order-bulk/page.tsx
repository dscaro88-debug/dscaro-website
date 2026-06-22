import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { procurementDecisionPages } from "@/lib/procurement-decision-pages"

const page = procurementDecisionPages["how-to-order-bulk"]

export const metadata: Metadata = {
  title: "How to Order Long-Term Care Supplies in Bulk",
  description:
    "Bulk ordering process for long-term care supplies: RFQ, MOQ, FOB pricing tiers, sample approval, packaging, OEM options, production timeline, and shipment preparation.",
  alternates: {
    canonical: "/how-to-order-bulk",
  },
}

export default function HowToOrderBulkPage() {
  return <ProcurementDecisionPageTemplate page={page} />
}
