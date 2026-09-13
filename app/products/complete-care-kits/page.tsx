import { Metadata } from "next"
import { allProducts, productCategories } from "@/lib/products"
import { ProductCategoryView } from "@/components/product-category-view"

export const metadata: Metadata = {
  title: "Incontinence Skin Care Kits — Cleanse · Protect · Moisturize | DS CARO",
  description:
    "B2B incontinence skin care kits combining no-rinse cleansing foam, adult barrier cream and no-sting skin protectant spray — one complete routine for facility trials, distributor sampling and home care.",
  openGraph: {
    title: "Incontinence Skin Care Kits for Care Facilities | DS CARO",
    description:
      "Complete cleanse–protect–moisturize kits for facility trials and distributor sampling.",
  },
}

export default function CategoryPage() {
  const category = productCategories.find((c) => c.slug === "complete-care-kits")
  if (!category) return null
  const products = allProducts.filter((product) => product.category === "Complete Care Kits")
  return <ProductCategoryView category={category} products={products} />
}
