import { Metadata } from "next"
import { featuredProducts, productCategories } from "@/lib/products"
import { ProductsListingView } from "@/components/products-listing-view"

export const metadata: Metadata = {
  title: "Adult Incontinence Skin Care Products — Cleansing, Barrier Protection & Kits | DS CARO",
  description:
    "B2B wholesale adult incontinence skin care: no-rinse cleansing, barrier protection, and complete care kits for nursing homes and assisted living. OEM/ODM with product-level documentation.",
  openGraph: {
    title: "Adult Incontinence Skin Care — B2B Wholesale | DS CARO",
    description:
      "Browse cleansing, barrier protection, and complete care kits for adult incontinence skin care. OEM/ODM with flexible MOQ for distributors.",
  },
}

export default function ProductsPage() {
  return <ProductsListingView categories={productCategories} featured={featuredProducts} />
}
