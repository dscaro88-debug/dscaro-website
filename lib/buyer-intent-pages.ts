export interface BuyerIntentPage {
  slug: string
  title: string
  eyebrow: string
  description: string
  metaTitle: string
  metaDescription: string
  primaryCategoryHref: string
  primaryCategoryLabel: string
  useCases: string[]
  bulkLogic: string[]
  oemCapabilities: string[]
  recommendedLinks: Array<{
    label: string
    href: string
    note: string
  }>
}

export const buyerIntentPages: BuyerIntentPage[] = [
  {
    slug: "nursing-home-supplies",
    title: "Nursing Home Incontinence Skin Care Supplies for Bulk Procurement",
    eyebrow: "For Nursing Home Buyers",
    description:
      "Cleansing, barrier protection, and complete care kits for high-volume nursing home incontinence care routines.",
    metaTitle: "Nursing Home Incontinence Skin Care Supplies | DS CARO",
    metaDescription:
      "B2B nursing home incontinence skin care: no-rinse cleansing foam, barrier cream, skin protectant spray, OEM support, MOQ planning, and RFQ workflow.",
    primaryCategoryHref: "/products/cleansing",
    primaryCategoryLabel: "Browse Cleansing",
    useCases: [
      "Resident rooms needing daily perineal and body cleansing with no-rinse foam.",
      "Skin protection against moisture, friction, and incontinence-associated dermatitis (IAD).",
      "Multi-facility purchasing teams comparing MOQ, lead time, and packaging options.",
    ],
    bulkLogic: [
      "Quote by SKU, kit, or mixed category list.",
      "MOQ reviewed by product type, carton plan, and destination country.",
      "Tiered FOB pricing prepared for trial order, reorder, and container planning.",
    ],
    oemCapabilities: [
      "Private labels, carton marks, color assortments, and product inserts.",
      "SKU-level product files for internal buyer review.",
      "Packaging language and target-market checklist support.",
    ],
    recommendedLinks: [
      { label: "No-Rinse Cleansing Foam (500ml)", href: "/products/no-rinse-cleansing-foam-500-cln-500", note: "Institutional size" },
      { label: "Adult Barrier Cream (100g)", href: "/products/adult-barrier-cream-crm-100", note: "Daily protection" },
      { label: "Incontinence Skin Care Kit", href: "/products/incontinence-skin-care-kit-kit-001", note: "Trial bundle" },
    ],
  },
  {
    slug: "assisted-living-supplies",
    title: "Assisted Living Incontinence Skin Care Supplies",
    eyebrow: "For Assisted Living Communities",
    description:
      "Dignity-focused cleansing and barrier protection for assisted living communities supporting resident independence.",
    metaTitle: "Assisted Living Incontinence Skin Care Supplies | DS CARO",
    metaDescription:
      "Assisted living incontinence skin care: gentle no-rinse cleansing, barrier cream, skin protectant spray, bulk ordering logic, OEM packaging, and RFQ support.",
    primaryCategoryHref: "/products/barrier-protection",
    primaryCategoryLabel: "Browse Barrier Protection",
    useCases: [
      "Gentle daily cleansing that supports resident dignity and comfort.",
      "Barrier protection for intact or compromised skin during care routines.",
      "Community operators standardizing supply ranges across locations.",
    ],
    bulkLogic: [
      "Start with a small mixed SKU quote for sample review.",
      "Scale to monthly replenishment quantities after facility feedback.",
      "Combine cleansing and barrier items into one procurement request.",
    ],
    oemCapabilities: [
      "Discreet label and packaging options for resident-facing products.",
      "Color and format discussion for assisted living environments.",
      "Care instruction inserts and barcode support for distributor channels.",
    ],
    recommendedLinks: [
      { label: "No-Rinse Cleansing Foam (200ml)", href: "/products/no-rinse-cleansing-foam-200-cln-200", note: "Resident-facing size" },
      { label: "Adult Barrier Cream — Intensive Repair", href: "/products/adult-barrier-cream-intensive-repair-crm-101", note: "Compromised skin" },
      { label: "No-Sting Skin Protectant Spray (30ml)", href: "/products/no-sting-skin-protectant-spray-30-spr-030", note: "Portable trial" },
    ],
  },
  {
    slug: "long-term-care-distributors",
    title: "Incontinence Care Distributor Supply Program",
    eyebrow: "For Distributors and Importers",
    description:
      "A structured B2B sourcing path for distributors building private-label or wholesale adult incontinence skin care ranges.",
    metaTitle: "Incontinence Care Distributors Supply Program | DS CARO",
    metaDescription:
      "Distributor sourcing program for adult incontinence skin care: product kits, OEM support, MOQ planning, packaging customization, and bulk RFQ workflow.",
    primaryCategoryHref: "/products",
    primaryCategoryLabel: "Browse Product Lines",
    useCases: [
      "Distributors building a first incontinence care product range.",
      "Importers comparing SKU-level pricing, packaging, and document availability.",
      "Private-label teams preparing marketplace or care-channel launches.",
    ],
    bulkLogic: [
      "Build a distributor quote by category kit or SKU shortlist.",
      "Compare trial order quantity, reorder quantity, and container-level pricing.",
      "Request files by target country and channel before committing to packaging.",
    ],
    oemCapabilities: [
      "Private-label packaging, carton marks, insert cards, and SKU naming.",
      "Product content support for catalog and marketplace preparation.",
      "Sample planning before bulk order confirmation.",
    ],
    recommendedLinks: [
      { label: "Incontinence Skin Care Kit", href: "/products/incontinence-skin-care-kit-kit-001", note: "Start from kits" },
      { label: "Trade Account", href: "/trade-account", note: "Distributor account path" },
      { label: "Bulk RFQ", href: "/rfq?source=distributor-page", note: "Send category quote request" },
    ],
  },
  {
    slug: "dining-care-products-for-elderly",
    title: "No-Rinse Cleansing Foam for Care Facilities",
    eyebrow: "Cleansing Procurement",
    description:
      "pH-balanced, fragrance-free no-rinse cleansing foam and wipes for gentle daily incontinence care in elderly care environments.",
    metaTitle: "No-Rinse Cleansing Foam for Care Facilities | DS CARO",
    metaDescription:
      "B2B no-rinse cleansing foam for care facilities: 200ml and 500ml sizes, fragrance-free, alcohol-free, OEM support, and bulk quotation.",
    primaryCategoryHref: "/products/cleansing",
    primaryCategoryLabel: "Browse Cleansing",
    useCases: [
      "Perineal and body cleansing during incontinence changes.",
      "Fragile, aged skin needing low-friction, moisturizing care.",
      "Facilities standardizing a no-rinse routine to save caregiver time.",
    ],
    bulkLogic: [
      "Quote 200ml and 500ml sizes together.",
      "Review pack size, carton plan, and per-use unit cost by volume.",
      "Plan MOQ by facility trial order or distributor replenishment schedule.",
    ],
    oemCapabilities: [
      "Logo label, color selection, retail sleeve, carton label, and care instruction insert.",
      "Private-label cleansing kit planning.",
      "SKU-level image and spec sheet preparation for buyer review.",
    ],
    recommendedLinks: [
      { label: "No-Rinse Cleansing Foam (200ml)", href: "/products/no-rinse-cleansing-foam-200-cln-200", note: "Resident-facing size" },
      { label: "No-Rinse Cleansing Foam (500ml)", href: "/products/no-rinse-cleansing-foam-500-cln-500", note: "Institutional size" },
      { label: "Incontinence Skin Care Kit", href: "/products/incontinence-skin-care-kit-kit-001", note: "Request bundle pricing" },
    ],
  },
]

export const getBuyerIntentPage = (slug: string) =>
  buyerIntentPages.find((page) => page.slug === slug)
