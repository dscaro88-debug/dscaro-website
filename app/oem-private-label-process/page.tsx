import type { Metadata } from "next"

import { ProcurementDecisionPageTemplate } from "@/components/seo/procurement-decision-page"
import { procurementDecisionPages } from "@/lib/procurement-decision-pages"

const page = procurementDecisionPages["oem-private-label-process"]

export const metadata: Metadata = {
  title: "OEM & Private Label Process for Care Supply Buyers",
  description:
    "DS CARO OEM and private label process for care product distributors and online sellers: logo label, packaging, carton marks, inserts, SKU files, MOQ, and production timeline.",
  alternates: {
    canonical: "/oem-private-label-process",
  },
}

export default function OemPrivateLabelProcessPage() {
  return <ProcurementDecisionPageTemplate page={page} />
}
