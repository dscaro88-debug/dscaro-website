import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Adult Incontinence Skin Care Blog — Product Guides and B2B Sourcing Notes | DS CARO",
  description:
    "B2B sourcing guides for Adult Incontinence Skin Care, cleansing foams, bed pads, OEM packaging, and care facility procurement.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Adult Incontinence Skin Care Blog | DS CARO",
    description:
      "Product guides and B2B sourcing notes for nursing homes, assisted living, distributors, and private-label buyers.",
    url: "/blog",
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
