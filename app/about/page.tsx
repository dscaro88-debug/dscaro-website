import { Metadata } from "next"
import { AboutView } from "@/components/about-view"

export const metadata: Metadata = {
  title: "About DS CARO — Adult Incontinence Skin Care for B2B Buyers",
  description:
    "DS CARO is a focused B2B adult incontinence skin care brand of HUBEI DESHANG INDUSTRY & TRADE CO,.LTD, serving nursing homes, incontinence care distributors, and assisted living channels.",
  openGraph: {
    title: "About DS CARO — Adult Incontinence Skin Care",
    description:
      "OEM/ODM sourcing and product development support for no-rinse cleansing, barrier protection, and complete incontinence skin care kits, with SKU-level document review and launch-ready product planning.",
  },
}

export default function AboutPage() {
  return <AboutView />
}
