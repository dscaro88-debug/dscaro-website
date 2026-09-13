import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"

export const metadata: Metadata = {
  title: "How to Order Adult Incontinence Skin Care in Bulk",
  description:
    "Bulk ordering process for Adult Incontinence Skin Care: RFQ, MOQ, FOB pricing tiers, sample approval, packaging, OEM options, production timeline, and shipment preparation.",
  alternates: {
    canonical: "/how-to-order-bulk",
  },
}

export default function HowToOrderBulkPage() {
  return <ProcurementDecisionPageTemplate slug="how-to-order-bulk" />
}
