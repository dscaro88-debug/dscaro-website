export interface ProcurementKit {
  name: string
  slug: string
  category: string
  description: string
  buyerUse: string
  products: Array<{
    name: string
    href: string
    note: string
  }>
  pricingConcept: string
  oemSupport: string
  recommendedFor: string[]
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
        name: "Reusable Adult Bib with Crumb Catcher",
        href: "/products/reusable-adult-bib-with-crumb-catcher-din-001",
        note: "Reusable daily dining protection",
      },
      {
        name: "Disposable Tie-on Adult Bib",
        href: "/products/disposable-tie-on-adult-bib-din-006",
        note: "Single-use meal service option",
      },
      {
        name: "Elderly Bedside Feeding Bib",
        href: "/products/elderly-bedside-feeding-bib-din-008",
        note: "Bedside and high-dependency care",
      },
      {
        name: "Scarf-Style Adult Clothing Protector",
        href: "/products/scarf-style-adult-clothing-protector-din-012",
        note: "More discreet resident-facing option",
      },
    ],
    pricingConcept:
      "Bundle MOQ can be quoted by mixed SKU cartons, with tiered FOB pricing for 60 / 500 / 1000+ unit planning.",
    oemSupport:
      "Logo label, care instruction insert, private carton, color assortment, and retail-ready packaging support.",
    recommendedFor: ["Nursing home dining rooms", "Care distributors", "Assisted living meal service"],
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
        name: "Transfer Support Belt",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
      {
        name: "Patient Positioning Support",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
      {
        name: "Walking Support Accessory",
        href: "/products/mobility-transfer",
        note: "Planned P2 launch item",
      },
    ],
    pricingConcept:
      "Early buyer requests can define target MOQ, material, safety labeling, and sample sequence before SKU release.",
    oemSupport:
      "Private label discussion, carton labeling, instruction sheets, and target-market document checklist support.",
    recommendedFor: ["Care staff workflow", "Rehabilitation facilities", "Assisted living transfer routines"],
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
        name: "Disposable Adult Underpad",
        href: "/products/disposable-adult-underpad-dcr-001",
        note: "3 sizes, 20pcs per bag",
      },
      {
        name: "Disposable Adult Underpad",
        href: "/products/waterproof-mattress-protector-dcr-002",
        note: "11 size and pack options for bedding protection",
      },
      {
        name: "Incontinence Bedding Care Add-ons",
        href: "/products/daily-care",
        note: "Expansion items by buyer request",
      },
    ],
    pricingConcept:
      "Quote by bag, case, or mixed container plan. FOB tiers can be reviewed for 60 / 500 / 1000+ bag planning where applicable.",
    oemSupport:
      "Private carton marks, size stickers, language labels, retail bag design, and SKU-level specification sheets.",
    recommendedFor: ["Nursing home room supply", "Care distributors", "Incontinence product sourcing"],
  },
]
