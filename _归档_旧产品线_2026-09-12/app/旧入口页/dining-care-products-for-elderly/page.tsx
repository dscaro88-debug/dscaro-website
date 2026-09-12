import { Metadata } from "next"

import { BuyerIntentLandingPage } from "@/components/seo/buyer-intent-landing-page"
import { getBuyerIntentPage } from "@/lib/buyer-intent-pages"

const page = getBuyerIntentPage("dining-care-products-for-elderly")!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/dining-care-products-for-elderly" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/dining-care-products-for-elderly",
  },
}

export default function DiningCareProductsForElderlyPage() {
  return <BuyerIntentLandingPage page={page} />
}
