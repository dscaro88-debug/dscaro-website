/**
 * DS CARO Dining Solutions full SKU list.
 *
 * 001, 002, 003 have real data sourced from `lib/products.ts` (Excel info cards).
 * 004 ~ 020 are reserved SKUs in the Dining Solutions category; their
 * product data (description, features, images, pricing) is NOT yet
 * available and is shown as "Data Pending" — placeholder content is
 * intentionally not invented for these.
 *
 * When new Excel cards are filled in for 004-020, add their real
 * Product entry to `lib/products.ts` and remove them from
 * DATA_PENDING_DIN_SKUS below.
 */
import { allProducts } from "./products"
import type { Product } from "./products"

export const DATA_PENDING_DIN_SKUS = [
  "DS-DIN-011",
  "DS-DIN-007",
  "DS-DIN-008",
  "DS-DIN-009",
  "DS-DIN-010",
  "DS-DIN-011",
  "DS-DIN-012",
  "DS-DIN-013",
  "DS-DIN-014",
  "DS-DIN-015",
  "DS-DIN-016",
  "DS-DIN-017",
  "DS-DIN-018",
  "DS-DIN-019",
  "DS-DIN-020",
]

export type DiningListingEntry =
  | { kind: "real"; product: Product }
  | { kind: "pending"; id: string }

/**
 * Returns the full ordered list of Dining Solutions SKUs to show on
 * /products/dining-solutions:
 *   1. Real-data products from `lib/products.ts` (001, 002, 003), in their
 *      natural catalog order.
 *   2. Data-pending SKUs (004-020), in numeric order.
 */
export function getDiningListing(): DiningListingEntry[] {
  const realDining: Product[] = allProducts
    .filter((p) => p.id.startsWith("DS-DIN-"))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

  const realIds = new Set(realDining.map((p) => p.id))
  const pending = DATA_PENDING_DIN_SKUS
    .filter((id) => !realIds.has(id))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return [
    ...realDining.map<DiningListingEntry>((product) => ({
      kind: "real",
      product,
    })),
    ...pending.map<DiningListingEntry>((id) => ({ kind: "pending", id })),
  ]
}
