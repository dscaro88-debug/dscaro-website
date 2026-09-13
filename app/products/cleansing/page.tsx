import { Metadata } from "next"
import { allProducts, productCategories } from "@/lib/products"
import { ProductCategoryView } from "@/components/product-category-view"

export const metadata: Metadata = {
  title: "No-Rinse Cleansing for Incontinence Care — Foams & Wipes | DS CARO",
  description:
    "B2B wholesale no-rinse cleansing foams and wipes for adult incontinence care. pH-balanced, fragrance-free, alcohol-free — gentle on sensitive, aged skin. OEM/private label available.",
  openGraph: {
    title: "No-Rinse Cleansing Foams for Incontinence Care | DS CARO",
    description:
      "No-rinse, pH-balanced cleansing foam for nursing homes, assisted living and home care. Fragrance-free and alcohol-free.",
  },
}

export default function CategoryPage() {
  const category = productCategories.find((c) => c.slug === "cleansing")
  if (!category) return null
  const products = allProducts.filter((product) => product.category === "Cleansing")
  return <ProductCategoryView category={category} products={products} />
}
