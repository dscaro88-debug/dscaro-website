import { Metadata } from "next"

import { BuyerIntentLandingPage } from "@/components/seo/buyer-intent-landing-page"
import { getBuyerIntentPage } from "@/lib/buyer-intent-pages"

const page = getBuyerIntentPage("nursing-home-supplies")!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/nursing-home-supplies" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/nursing-home-supplies",
  },
}

export default function NursingHomeSuppliesPage() {
  return <BuyerIntentLandingPage page={page} />
}
