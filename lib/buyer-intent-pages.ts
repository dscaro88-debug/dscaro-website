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
    title: "Nursing Home Supplies for Bulk Procurement",
    eyebrow: "For Nursing Home Buyers",
    description:
      "Dining protection, daily care supplies, bedding protection, and mobility support planning for nursing home procurement teams.",
    metaTitle: "Nursing Home Supplies for Bulk Procurement | DS CARO",
    metaDescription:
      "B2B nursing home supplies for long-term care procurement: dining protection, daily care, bedding protection, OEM support, MOQ planning, and RFQ workflow.",
    primaryCategoryHref: "/products/dining-solutions",
    primaryCategoryLabel: "Browse Dining Solutions",
    useCases: [
      "Resident dining rooms that need reusable and disposable clothing protection.",
      "Care rooms requiring disposable underpads and waterproof mattress protection.",
      "Multi-facility purchasing teams comparing MOQ, lead time, and packaging options.",
    ],
    bulkLogic: [
      "Quote by SKU, kit, or mixed category list.",
      "MOQ can be reviewed by product type, carton plan, and destination country.",
      "Tiered FOB pricing can be prepared for trial order, reorder, and container planning.",
    ],
    oemCapabilities: [
      "Private labels, carton marks, color assortments, and product inserts.",
      "SKU-level product files for internal buyer review.",
      "Packaging language and target-market checklist support.",
    ],
    recommendedLinks: [
      { label: "Dining Care Kit", href: "/rfq?kit=Dining%20Care%20Kit", note: "Meal-time protection bundle" },
      { label: "Daily Care Kit", href: "/rfq?kit=Daily%20Care%20Kit", note: "Bedding and incontinence care" },
      { label: "Nursing Home Solutions", href: "/solutions/nursing-homes", note: "Facility procurement path" },
    ],
  },
  {
    slug: "assisted-living-supplies",
    title: "Assisted Living Supplies for Resident Care Routines",
    eyebrow: "For Assisted Living Communities",
    description:
      "Dignity-focused dining protection, daily care supplies, and resident room protection for assisted living communities.",
    metaTitle: "Assisted Living Supplies for Bulk Ordering | DS CARO",
    metaDescription:
      "Assisted living supplies for B2B buyers: dining care, daily hygiene, bedding protection, bulk ordering logic, OEM packaging, and RFQ support.",
    primaryCategoryHref: "/products/dining-solutions",
    primaryCategoryLabel: "View Assisted Living Product Lines",
    useCases: [
      "Meal-time clothing protection that balances dignity, comfort, and fast cleanup.",
      "Resident room bedding protection for daily care and incontinence support.",
      "Community operators standardizing supply ranges across locations.",
    ],
    bulkLogic: [
      "Start with a small mixed SKU quote for sample review.",
      "Scale to monthly replenishment quantities after facility feedback.",
      "Combine dining and daily care items into one procurement request.",
    ],
    oemCapabilities: [
      "Discreet label and packaging options for resident-facing products.",
      "Color and pattern discussion for assisted living environments.",
      "Care instruction inserts and barcode support for distributor channels.",
    ],
    recommendedLinks: [
      { label: "Scarf-Style Clothing Protector", href: "/products/scarf-style-adult-clothing-protector-din-012", note: "Resident-facing dining care" },
      { label: "Reusable Adult Bib", href: "/products/reusable-adult-bib-with-crumb-catcher-din-001", note: "Washable meal-time protection" },
      { label: "Assisted Living Solutions", href: "/solutions/assisted-living", note: "Community buyer path" },
    ],
  },
  {
    slug: "long-term-care-distributors",
    title: "Long-Term Care Distributor Supply Program",
    eyebrow: "For Distributors and Importers",
    description:
      "A structured B2B sourcing path for distributors building private-label or wholesale long-term care supply ranges.",
    metaTitle: "Long-Term Care Distributors Supply Program | DS CARO",
    metaDescription:
      "Distributor sourcing program for long-term care supplies: product kits, OEM support, MOQ planning, packaging customization, and bulk RFQ workflow.",
    primaryCategoryHref: "/products",
    primaryCategoryLabel: "Browse Product Lines",
    useCases: [
      "Distributors building a first long-term care product range.",
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
      { label: "Recommended Bundles", href: "/#recommended-bundles", note: "Start from kits" },
      { label: "Trade Account", href: "/trade-account", note: "Distributor account path" },
      { label: "Bulk RFQ", href: "/rfq?source=distributor-page", note: "Send category quote request" },
    ],
  },
  {
    slug: "dining-care-products-for-elderly",
    title: "Dining Care Products for Elderly Residents",
    eyebrow: "Dining Protection Procurement",
    description:
      "Adult bibs, clothing protectors, crumb catchers, bedside feeding bibs, and disposable dining protection for elderly care environments.",
    metaTitle: "Dining Care Products for Elderly Residents | DS CARO",
    metaDescription:
      "B2B dining care products for elderly residents: adult bibs, clothing protectors, crumb catchers, disposable bibs, OEM support, and bulk quotation.",
    primaryCategoryHref: "/products/dining-solutions",
    primaryCategoryLabel: "Browse Dining Care Products",
    useCases: [
      "Dining rooms requiring reusable meal-time protection.",
      "Bedside feeding routines for residents needing higher staff support.",
      "Disposable bib programs for hygiene-sensitive meal service.",
    ],
    bulkLogic: [
      "Quote reusable and disposable dining products together.",
      "Review washability, closure type, pocket design, and packaging by SKU.",
      "Plan MOQ by care facility trial order or distributor replenishment schedule.",
    ],
    oemCapabilities: [
      "Logo label, color selection, retail sleeve, carton label, and care instruction insert.",
      "Private-label dining protection kit planning.",
      "SKU-level image and spec sheet preparation for buyer review.",
    ],
    recommendedLinks: [
      { label: "Reusable Adult Bib", href: "/products/reusable-adult-bib-with-crumb-catcher-din-001", note: "Core reusable item" },
      { label: "Disposable Tie-on Bib", href: "/products/disposable-tie-on-adult-bib-din-006", note: "Single-use option" },
      { label: "Dining Care Kit", href: "/rfq?kit=Dining%20Care%20Kit", note: "Request bundle pricing" },
    ],
  },
]

export const getBuyerIntentPage = (slug: string) =>
  buyerIntentPages.find((page) => page.slug === slug)
