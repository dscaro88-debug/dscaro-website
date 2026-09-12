import { Metadata } from "next"

import { BuyerIntentLandingPage } from "@/components/seo/buyer-intent-landing-page"
import { getBuyerIntentPage } from "@/lib/buyer-intent-pages"

const page = getBuyerIntentPage("long-term-care-distributors")!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/long-term-care-distributors" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/long-term-care-distributors",
  },
}

export default function LongTermCareDistributorsPage() {
  return <BuyerIntentLandingPage page={page} />
}
