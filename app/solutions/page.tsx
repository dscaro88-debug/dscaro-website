import { Metadata } from "next"

import { SolutionsView } from "@/components/solutions-view"

export const metadata: Metadata = {
  title: "Adult Incontinence Skin Care Solutions — Nursing Homes, Assisted Living, Home Care | DS CARO",
  description:
    "Facility-grade supply programs for adult incontinence skin care: nursing homes, assisted living, and home-care channels. Cleansing, barrier protection, and complete care kits with OEM/ODM support.",
  openGraph: {
    title: "Adult Incontinence Skin Care Solutions | DS CARO",
    description:
      "Cleansing, barrier protection, and complete care kits for nursing homes, assisted living, and home-care facilities. Private label and OEM available.",
  },
}

export default function SolutionsPage() {
  return <SolutionsView />
}
