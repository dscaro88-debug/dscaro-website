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
    name: "No-Rinse Cleansing Kit",
    slug: "no-rinse-cleansing-kit",
    category: "Cleansing",
    description:
      "A daily cleansing bundle for incontinence care routines — pH-balanced, fragrance-free, and alcohol-free for sensitive, aged skin.",
    buyerUse:
      "Build a no-rinse cleansing SKU range covering personal-size and institutional formats for nursing homes and distributors.",
    products: [
      {
        sku: "DS-CLN-200",
        name: "No-Rinse Cleansing Foam (200ml)",
        href: "/products/no-rinse-cleansing-foam-200-cln-200",
        note: "No-rinse, pH-balanced daily cleansing",
      },
      {
        sku: "DS-CLN-500",
        name: "No-Rinse Cleansing Foam (500ml Institutional)",
        href: "/products/no-rinse-cleansing-foam-500-cln-500",
        note: "Institutional size — lower unit cost per use",
      },
    ],
    pricingConcept:
      "Cleansing bundle MOQ can be quoted by mixed format cartons, with tiered pricing for personal care and facility volumes.",
    bundlePricing:
      "Mixed no-rinse cleansing bundle quote by trial pack / 500 / 2000+ units. Best pricing is reviewed when packaging and language labels are confirmed together.",
    oemSupport:
      "Logo label, usage instruction card, private carton, language labels, and retail-ready packaging support.",
    recommendedFor: ["Nursing home incontinence care", "Assisted living daily hygiene", "Home-care channels"],
    recommendedBadge: "Recommended for daily hygiene",
  },
  {
    name: "Barrier Protection Kit",
    slug: "barrier-protection-kit",
    category: "Barrier Protection",
    description:
      "A barrier-protection bundle for IAD prevention — daily barrier cream, intensive repair cream, and film-forming skin protectant spray.",
    buyerUse:
      "Build a barrier-protection SKU range covering daily prevention, compromised-skin repair, and long-lasting film-forming spray.",
    products: [
      {
        sku: "DS-CRM-100",
        name: "Adult Barrier Cream (100g)",
        href: "/products/adult-barrier-cream-crm-100",
        note: "Zinc oxide / dimethicone daily barrier — protect + moisturize",
      },
      {
        sku: "DS-CRM-101",
        name: "Adult Barrier Cream — Intensive Repair (100g)",
        href: "/products/adult-barrier-cream-intensive-repair-crm-101",
        note: "Higher-zinc repair for compromised or reddened skin",
      },
      {
        sku: "DS-SPR-030",
        name: "No-Sting Skin Protectant Spray (30ml Travel)",
        href: "/products/no-sting-skin-protectant-spray-30-spr-030",
        note: "Portable trial size — CHG-compatible, up to 72h",
      },
      {
        sku: "DS-SPR-100",
        name: "No-Sting Skin Protectant Spray (100ml)",
        href: "/products/no-sting-skin-protectant-spray-100-spr-100",
        note: "Full-size film-forming barrier for daily facility use",
      },
    ],
    pricingConcept:
      "Barrier bundle MOQ can be quoted by mixed-SKU cartons, with tiered pricing for trial kits and institutional volumes.",
    bundlePricing:
      "Mixed barrier-protection bundle quote by trial kit / 500 / 1000+ units. Best pricing is reviewed when packaging and language labels are confirmed together.",
    oemSupport:
      "Logo label, usage instruction card, private carton, language labels, and retail-ready packaging support.",
    recommendedFor: ["IAD prevention programs", "High-dependency care", "Incontinence care distributors"],
    recommendedBadge: "Recommended for IAD prevention",
  },
  {
    name: "Complete Skin Care Kit",
    slug: "complete-skin-care-kit",
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
      {
        sku: "DS-KIT-001",
        name: "Incontinence Skin Care Kit",
        href: "/products/incontinence-skin-care-kit-kit-001",
        note: "Cleanse · Protect · Moisturize trial / institutional pack",
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
