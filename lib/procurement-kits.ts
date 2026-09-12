export interface ProcurementKit {
  name: string
  slug: string
  category: string
  description: string
  buyerUse: string
  products: Array<{
    sku?: string
    name: string
    href: string
    note: string
  }>
  pricingConcept: string
  bundlePricing: string
  oemSupport: string
  recommendedFor: string[]
  recommendedBadge: string
}

export const procurementKits: ProcurementKit[] = [
  {
    name: "Incontinence Skin Care Kit",
    slug: "incontinence-skin-care-kit",
    category: "Complete Care Kits",
    description:
      "A complete cleanse–protect–moisturize bundle for nursing homes, assisted living communities, and incontinence care distributors.",
    buyerUse:
      "Build one incontinence skin care SKU range covering no-rinse cleansing, daily barrier protection, and a portable skin protectant spray.",
    products: [
      {
        sku: "DS-CLN-200",
        name: "No-Rinse Cleansing Foam (200ml)",
        href: "/products/no-rinse-cleansing-foam-200-cln-200",
        note: "No-rinse, pH-balanced daily cleansing",
      },
      {
        sku: "DS-CRM-100",
        name: "Adult Barrier Cream (100g)",
        href: "/products/adult-barrier-cream-crm-100",
        note: "Zinc oxide / dimethicone daily barrier — protect + moisturize",
      },
      {
        sku: "DS-SPR-100",
        name: "No-Sting Skin Protectant Spray (100ml)",
        href: "/products/no-sting-skin-protectant-spray-100-spr-100",
        note: "CHG-compatible film-forming barrier, up to 72h protection",
      },
    ],
    pricingConcept:
      "Bundle MOQ can be quoted by mixed-SKU cartons, with tiered pricing for trial packs and institutional volumes.",
    bundlePricing:
      "Mixed incontinence skin care bundle quote by trial kit / 500 / 1000+ units. Best pricing is reviewed when packaging and language labels are confirmed together.",
    oemSupport:
      "Logo label, usage instruction card, private carton, language labels, and retail-ready packaging support.",
    recommendedFor: ["Nursing home incontinence care", "Incontinence care distributors", "Assisted living skin care"],
    recommendedBadge: "Recommended for nursing homes",
  },
]
