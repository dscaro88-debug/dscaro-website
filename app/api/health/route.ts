import { allProducts } from "@/lib/products"

export const dynamic = "force-dynamic"

export async function GET() {
  return Response.json({
    build: "2026-06-10-v4",
    productCount: allProducts.length,
    productIds: allProducts.map((p) => p.id),
    categories: allProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {}),
  })
}
