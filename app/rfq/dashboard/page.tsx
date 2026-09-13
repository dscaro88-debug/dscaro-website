import type { Metadata } from "next"
import { RfqDashboardView } from "@/components/rfq-dashboard-view"

export const metadata: Metadata = {
  title: "RFQ Dashboard — DS CARO",
  description: "Categorized RFQ dashboard for DS CARO Adult Incontinence Skin Care inquiries.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RfqDashboardPage() {
  return <RfqDashboardView />
}
