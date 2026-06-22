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
    name: "Dining Care Kit",
    slug: "dining-care-kit",
    category: "Dining Solutions",
    description:
      "A meal-time protection bundle for nursing home dining rooms, assisted living communities, and care distributors.",
    buyerUse:
      "Build one dining protection SKU range covering reusable, disposable, bedside, and dignity-focused clothing protection.",
    products: [
      {
        sku: "DS-DIN-001",
        name: "Reusable Adult Bib with Crumb Catcher",
        href: "/products/reusable-adult-bib-with-crumb-catcher-din-001",
        note: "Reusable daily dining protection",
      },
      {
        sku: "DS-DIN-006",
        name: "Disposable Tie-on Adult Bib",
        href: "/products/disposable-tie-on-adult-bib-din-006",
        note: "Single-use meal service option",
      },
      {
        sku: "DS-DIN-008",
        name: "Elderly Bedside Feeding Bib",
        href: "/products/elderly-bedside-feeding-bib-din-008",
        note: "Bedside and high-dependency care",
      },
      {
        sku: "DS-DIN-012",
        name: "Scarf-Style Adult Clothing Protector",
        href: "/products/scarf-style-adult-clothing-protector-din-012",
        note: "More discreet resident-facing option",
      },
    ],
    pricingConcept:
      "Bundle MOQ can be quoted by mixed SKU cartons, with tiered FOB pricing for 60 / 500 / 1000+ unit planning.",
    bundlePricing:
      "Mixed dining-care bundle quote by 60 / 500 / 1000+ pcs. Best pricing is reviewed when colors and packaging are confirmed together.",
    oemSupport:
      "Logo label, care instruction insert, private carton, color assortment, and retail-ready packaging support.",
    recommendedFor: ["Nursing home dining rooms", "Care distributors", "Assisted living meal service"],
    recommendedBadge: "Recommended for nursing homes",
  },
  {
    name: "Mobility Support Kit",
    slug: "mobility-support-kit",
    category: "Mobility & Transfer",
    description:
      "A planned transfer and positioning bundle for safer caregiver workflows in long-term care settings.",
    buyerUse:
      "Prepare a mobility support purchasing plan before the first transfer-support SKUs are released.",
    products: [
      {
        sku: "DS-MOB-P1",
        name: "Transfer Support Belt",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
      {
        sku: "DS-MOB-P2",
        name: "Patient Positioning Support",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
      {
        sku: "DS-MOB-P3",
        name: "Walking Support Accessory",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
    ],
    pricingConcept:
      "Early buyer requests can define target MOQ, material, safety labeling, and sample sequence before SKU release.",
    bundlePricing:
      "Quoted as a planned mixed transfer-support kit after buyer confirms target facility workflow, MOQ, and material requirements.",
    oemSupport:
      "Private label discussion, carton labeling, instruction sheets, and target-market document checklist support.",
    recommendedFor: ["Care staff workflow", "Rehabilitation facilities", "Assisted living transfer routines"],
    recommendedBadge: "Recommended for nursing homes",
  },
  {
    name: "Daily Care Kit",
    slug: "daily-care-kit",
    category: "Daily Care Supplies",
    description:
      "A bedding and incontinence-care bundle for daily replenishment in nursing homes and long-term care rooms.",
    buyerUse:
      "Combine disposable underpads and mattress protection into one replenishment quote for care rooms and distributors.",
    products: [
      {
        sku: "DS-DCR-001",
        name: "Disposable Adult Underpad",
        href: "/products/disposable-adult-underpad-dcr-001",
        note: "3 sizes, 20pcs per bag",
      },
      {
        sku: "DS-DCR-002",
        name: "Disposable Adult Underpad (11 Pack Options)",
        href: "/products/waterproof-mattress-protector-dcr-002",
        note: "11 size and pack options for bedding protection",
      },
      {
        sku: "DS-DCR-ADD",
        name: "Incontinence Bedding Care Add-ons",
        href: "/products/daily-care",
        note: "Expansion items by buyer request",
      },
    ],
    pricingConcept:
      "Quote by bag, case, or mixed container plan. FOB tiers can be reviewed for 60 / 500 / 1000+ bag planning where applicable.",
    bundlePricing:
      "Underpads and mattress protection can be quoted by bag, case, or mixed container plan with 60 / 500 / 1000+ bag tiers where applicable.",
    oemSupport:
      "Private carton marks, size stickers, language labels, retail bag design, and SKU-level specification sheets.",
    recommendedFor: ["Nursing home room supply", "Care distributors", "Incontinence product sourcing"],
    recommendedBadge: "Recommended for nursing homes",
  },
]
