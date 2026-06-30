import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Long-Term Care Supply Blog — Product Guides and B2B Sourcing Notes | DS CARO",
  description:
    "B2B sourcing guides for long-term care supplies, adult bibs, underpads, OEM packaging, and care facility procurement.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Long-Term Care Supply Blog | DS CARO",
    description:
      "Product guides and B2B sourcing notes for nursing homes, assisted living, distributors, and private-label buyers.",
    url: "/blog",
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
