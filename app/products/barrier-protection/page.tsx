import { Metadata } from "next"
import { allProducts, productCategories } from "@/lib/products"
import { ProductCategoryView } from "@/components/product-category-view"

export const metadata: Metadata = {
  title: "Adult Barrier Creams & No-Sting Skin Protectant Spray | DS CARO",
  description:
    "B2B wholesale adult barrier creams (zinc oxide / dimethicone) and no-sting film-forming skin protectant spray for IAD prevention in incontinence care. CHG-compatible. OEM/private label.",
  openGraph: {
    title: "Adult Barrier Protection for Incontinence Care | DS CARO",
    description:
      "Adult-specific barrier creams and no-sting skin protectant spray — protect skin from moisture, faeces and friction.",
  },
}

export default function CategoryPage() {
  const category = productCategories.find((c) => c.slug === "barrier-protection")
  if (!category) return null
  const products = allProducts.filter((product) => product.category === "Barrier Protection")
  return <ProductCategoryView category={category} products={products} />
}
