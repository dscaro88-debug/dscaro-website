import { Metadata } from "next"

import { BuyerIntentLandingPage } from "@/components/seo/buyer-intent-landing-page"
import { getBuyerIntentPage } from "@/lib/buyer-intent-pages"

const page = getBuyerIntentPage("assisted-living-supplies")!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/assisted-living-supplies" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/assisted-living-supplies",
  },
}

export default function AssistedLivingSuppliesPage() {
  return <BuyerIntentLandingPage page={page} />
}
