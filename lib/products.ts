// DS CARO Product Catalog — v3 Adult Incontinence Skin Care (2026-09-12) | 7 SKUs, 3 categories
import { siteConfig } from "@/lib/site-config"

export interface PriceTier {
  quantity: string
  unitPrice: string
  markup: string
}

export interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  moq: number
  price: number
  currency: string
  priceLabel?: string
  priceNote?: string
  priceTiers?: PriceTier[]
  images: string[]
  features: string[]
  specs: Record<string, string>
  slug: string
  featured?: boolean
  launchBatch: "P1" | "P2"
  launchNote: string
}

export interface ProductCategory {
  name: string
  slug: string
  description: string
  icon: string
  image: string
  productCount: number
}

type ProductSeed = Omit<Product, "currency" | "images" | "specs" | "launchBatch" | "launchNote"> & {
  material: string
  targetBuyers: string
  marketPosition: string
  currency?: string
  certifications?: string
  packaging?: string
  leadTime?: string
  specs?: Record<string, string>
  customImages?: string[]
}

export const buildProductVisualPath = (slug: string) => `/product-visuals/${slug}`

export const isLaunchPhotoReady = (_slug: string) => false

const encodePublicAssetPath = (path: string) => encodeURI(path)

const formatNumericPrice = (price: number) => {
  if (Number.isInteger(price)) {
    return price.toString()
  }

  return price.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")
}

export const formatProductPrice = (product: Pick<Product, "currency" | "price" | "priceLabel">) =>
  product.priceLabel || `${product.currency} ${formatNumericPrice(product.price)}`

export const formatProductPriceWithUnit = (
  product: Pick<Product, "currency" | "price" | "priceLabel">
) =>
  product.priceLabel && /\/| per /i.test(product.priceLabel)
    ? product.priceLabel
    : `${formatProductPrice(product)} / unit`

const categoryDefinitions: Omit<ProductCategory, "productCount">[] = [
  {
    name: "Cleansing",
    slug: "cleansing",
    description:
      "No-rinse cleansing foams and wipes for gentle daily incontinence care — pH-balanced, fragrance-free, no alcohol.",
    icon: "🧴",
    image: buildProductVisualPath("no-rinse-cleansing-foam-200-cln-200"),
  },
  {
    name: "Barrier Protection",
    slug: "barrier-protection",
    description:
      "Zinc oxide and dimethicone barrier creams plus a no-sting film-forming skin protectant spray for moisture, friction, and IAD prevention.",
    icon: "🛡️",
    image: buildProductVisualPath("adult-barrier-cream-crm-100"),
  },
  {
    name: "Complete Care Kits",
    slug: "complete-care-kits",
    description:
      "Cleanse–protect–moisturize bundles for nursing homes, assisted living, and home-care buyers — trial kits and institutional packs.",
    icon: "📦",
    image: buildProductVisualPath("incontinence-skin-care-kit-kit-001"),
  },
]

const defaultCertifications =
  "Certificate and test-file status pending supplier file confirmation for the exact SKU."
const defaultPackaging = "Neutral tube, DS CARO carton, private label, language label, or bulk carton"
const defaultLeadTime = "20-35 days after sample approval"

export const firstBatchProductIds = [
  "DS-CLN-200",
  "DS-CLN-500",
  "DS-CRM-100",
  "DS-CRM-101",
  "DS-SPR-030",
  "DS-SPR-100",
  "DS-KIT-001",
] as const

const makeProduct = (seed: ProductSeed): Product => {
  const {
    material,
    targetBuyers,
    marketPosition,
    certifications = defaultCertifications,
    packaging = defaultPackaging,
    leadTime = defaultLeadTime,
    specs = {},
    ...product
  } = seed
  const isFirstBatch = firstBatchProductIds.includes(product.id as (typeof firstBatchProductIds)[number])
  const launchNote = isFirstBatch
    ? "P1 launch SKU for immediate B2B inquiry, quotation, sampling, and private-label discussion"
    : "P2 expansion SKU for follow-up range building after the first launch batch"

  return {
    ...product,
    currency: seed.currency || "USD",
    images: (seed.customImages && seed.customImages.length > 0
      ? seed.customImages
      : [buildProductVisualPath(product.slug)]).map(encodePublicAssetPath),
    launchBatch: isFirstBatch ? "P1" : "P2",
    launchNote,
    specs: {
      "Launch Batch": launchNote,
      "FOB Price": formatProductPriceWithUnit({
        currency: seed.currency || "USD",
        price: product.price,
        priceLabel: product.priceLabel,
      }),
      MOQ: `${product.moq} units`,
      Material: material,
      "Lead Time": leadTime,
      "Certificate Status": certifications,
      Packaging: packaging,
      "Target Buyers": targetBuyers,
      "Market Position": marketPosition,
      "OEM/ODM": "Logo, color, packaging, insert, language label, barcode and marketplace content support available",
      "Image Source": seed.customImages && seed.customImages.length > 0
        ? "Supplier-authorized product photography — real product images"
        : "DS CARO AI-generated placeholder visual for website launch; replace with supplier-authorized or self-shot images before marketplace upload.",
      Payment: "T/T, L/C, PayPal for samples",
      ...specs,
    },
  }
}

const productSeeds: ProductSeed[] = [
  {
    id: "DS-CLN-200",
    name: "No-Rinse Cleansing Foam (200ml)",
    category: "Cleansing",
    subcategory: "No-Rinse Cleansers",
    description:
      "A gentle, pH-balanced no-rinse cleansing foam for daily perineal and body care in incontinence routines. Fragrance-free and alcohol-free, it cleans and moisturizes in one step — reducing friction on fragile, aged skin.",
    moq: 500,
    price: 0.45,
    currency: "USD",
    priceLabel: "USD 0.45 – 1.10 / bottle",
    priceNote:
      "FOB reference tiered pricing by pack size and order volume. Payment: T/T, L/C, PayPal for samples. Sample lead time 7 days, bulk 20-35 days after approval.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 1.10", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 0.70", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 0.45", markup: "Best price" },
    ],
    slug: "no-rinse-cleansing-foam-200-cln-200",
    material: "Mild surfactants + humectants (glycerin / panthenol); fragrance-free, alcohol-free, pH-balanced",
    targetBuyers: "Nursing home procurement, assisted living supply chains, incontinence care distributors, home-care channels",
    marketPosition: "Adult-specific gentle cleanser — clean and moisturize in one step, less friction on fragile skin",
    featured: true,
    features: [
      "No-rinse formula — saves caregiver time and reduces friction",
      "pH-balanced, fragrance-free, alcohol-free",
      "Cleans and moisturizes in one step",
      "Suitable for sensitive, aged skin",
      "OEM label, language label and private carton available",
    ],
    specs: {
      Format: "No-rinse cleanser foam",
      Size: "200 ml pump bottle",
      "Skin Type": "Sensitive, fragile, aged skin",
      "Use Scenario": "Perineal and body cleansing during incontinence changes",
      "Certification Path": "Cosmetic / hygiene positioning",
    },
  },
  {
    id: "DS-CLN-500",
    name: "No-Rinse Cleansing Foam (500ml Institutional)",
    category: "Cleansing",
    subcategory: "No-Rinse Cleansers",
    description:
      "The institutional volume of the no-rinse cleansing foam, sized for nursing home daily consumption. Same gentle, pH-balanced, fragrance-free formula at a lower unit cost.",
    moq: 500,
    price: 0.9,
    currency: "USD",
    priceLabel: "USD 0.90 – 2.00 / bottle",
    priceNote:
      "FOB reference pricing; institutional volume discounts available. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 2.00", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 1.30", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 0.90", markup: "Best price" },
    ],
    slug: "no-rinse-cleansing-foam-500-cln-500",
    material: "Mild surfactants + humectants; fragrance-free, alcohol-free, pH-balanced",
    targetBuyers: "Nursing homes, assisted living facilities, incontinence care distributors",
    marketPosition: "Institutional size for daily facility consumption — lower unit cost per use",
    features: [
      "Institutional size for daily consumption",
      "Lower unit cost per use",
      "Same gentle formula as DS-CLN-200",
      "Refill / bulk options available",
      "Private label and language label support",
    ],
    specs: {
      Format: "No-rinse cleanser foam",
      Size: "500 ml pump bottle (or 1L refill)",
      "Use Scenario": "Facility daily incontinence cleansing",
      "Certification Path": "Cosmetic / hygiene positioning",
    },
  },
  {
    id: "DS-CRM-100",
    name: "Adult Barrier Cream (100g)",
    category: "Barrier Protection",
    subcategory: "Barrier Creams",
    description:
      "A zinc oxide / dimethicone barrier cream formulated for adult incontinence — protecting skin from urine, faeces, moisture and friction. Easy to remove and fragrance-free: an adult-specific product, not a rebranded baby nappy cream.",
    moq: 500,
    price: 0.35,
    currency: "USD",
    priceLabel: "USD 0.35 – 1.00 / tube",
    priceNote:
      "FOB reference pricing by zinc concentration and order volume. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 1.00", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 0.60", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 0.35", markup: "Best price" },
    ],
    slug: "adult-barrier-cream-crm-100",
    material: "Zinc oxide 10–20% (or dimethicone 5%) + petrolatum / panthenol",
    targetBuyers: "Nursing home procurement, assisted living supply chains, incontinence care distributors, pharmacy buyers",
    marketPosition: "Adult-specific barrier cream — easy to remove, fragrance-free, hypoallergenic",
    featured: true,
    features: [
      "Adult-specific formulation — not a rebranded baby cream",
      "Easy to remove — less friction and discomfort",
      "Fragrance-free and hypoallergenic",
      "Protect + moisturize in one step",
      "Daily prevention for mild-to-moderate skin",
    ],
    specs: {
      Format: "Barrier cream",
      Size: "100 g tube",
      "Active Direction": "Zinc oxide 10–20% (or dimethicone 5%)",
      "Use Scenario": "Daily incontinence skin protection",
      "Certification Path": "Cosmetic (daily) / hygiene positioning",
    },
  },
  {
    id: "DS-CRM-101",
    name: "Adult Barrier Cream — Intensive Repair (100g)",
    category: "Barrier Protection",
    subcategory: "Barrier Creams",
    description:
      "A higher-zinc intensive repair barrier cream for compromised or broken skin, enriched with panthenol (B5), calendula and oat. Positioned as a cosmetic intensive-care product — the compliance-safe alternative to a pharmacy antifungal claim.",
    moq: 500,
    price: 0.5,
    currency: "USD",
    priceLabel: "USD 0.50 – 1.30 / tube",
    priceNote:
      "FOB reference pricing; intensive formulations cost slightly more. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 1.30", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 0.80", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 0.50", markup: "Best price" },
    ],
    slug: "adult-barrier-cream-intensive-repair-crm-101",
    material: "High-concentration zinc oxide + panthenol (B5) / calendula / oat extract",
    targetBuyers: "Nursing homes, assisted living, home-care channels for high-dependency residents",
    marketPosition: "Intensive repair for compromised skin — cosmetic positioning, no pharmacy claim",
    features: [
      "Higher zinc load for compromised / reddened skin",
      "Panthenol (B5), calendula and oat for soothing",
      "Cosmetic positioning — avoids pharmacy antifungal classification",
      "Fragrance-free and hypoallergenic",
      "Complements DS-CRM-100 as the intensive tier",
    ],
    specs: {
      Format: "Intensive repair barrier cream",
      Size: "100 g tube",
      "Active Direction": "High-concentration zinc oxide + panthenol / calendula / oat",
      "Use Scenario": "Intensive repair for compromised / broken skin",
      "Certification Path": "Cosmetic / hygiene positioning",
    },
  },
  {
    id: "DS-SPR-030",
    name: "No-Sting Skin Protectant Spray (30ml Travel)",
    category: "Barrier Protection",
    subcategory: "Film-Forming Protectants",
    description:
      "A no-sting, alcohol-free film-forming skin protectant spray that dries in ~30 seconds to a breathable, transparent barrier lasting up to 72 hours. CHG-compatible. The 30ml travel / trial size lowers the barrier to trial for facilities and home-care buyers.",
    moq: 500,
    price: 1.1,
    currency: "USD",
    priceLabel: "USD 1.10 – 2.20 / bottle",
    priceNote:
      "FOB reference pricing by size and volume. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 2.20", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 1.50", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 1.10", markup: "Best price" },
    ],
    slug: "no-sting-skin-protectant-spray-30-spr-030",
    material: "Acrylate terpolymer film-forming / silicone; alcohol-free",
    targetBuyers: "Nursing homes, assisted living, home-care channels, trial and sample buyers",
    marketPosition: "Portable trial size of the professional film-forming skin protectant",
    features: [
      "CHG compatible — protects under antiseptic cleansing",
      "Alcohol-free, does not sting on damaged skin",
      "Dries in ~30 seconds; up to 72h protection",
      "Travel / trial size to lower the barrier to trial",
      "Complements DS-SPR-100 as the portable tier",
    ],
    specs: {
      Format: "Film-forming skin protectant spray",
      Size: "30 ml spray bottle",
      "Key Feature": "No-sting, alcohol-free, CHG-compatible, up to 72h",
      "Use Scenario": "IAD prevention, portable and trial use",
      "Certification Path": "Medical device (EU Class I) where classified",
    },
  },
  {
    id: "DS-SPR-100",
    name: "No-Sting Skin Protectant Spray (100ml)",
    category: "Barrier Protection",
    subcategory: "Film-Forming Protectants",
    description:
      "The full-size film-forming skin protectant spray for daily facility use — no-sting, alcohol-free, CHG-compatible, forming a breathable transparent barrier that lasts up to 72 hours. Protects intact or compromised skin from moisture, faeces and friction.",
    moq: 500,
    price: 2.0,
    currency: "USD",
    priceLabel: "USD 2.00 – 3.20 / bottle",
    priceNote:
      "FOB reference pricing by volume. Wipe / applicator options quoted separately. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "500 pcs (MOQ)", unitPrice: "USD 3.20", markup: "FOB reference" },
      { quantity: "5000+ pcs", unitPrice: "USD 2.50", markup: "Volume discount" },
      { quantity: "20000+ pcs", unitPrice: "USD 2.00", markup: "Best price" },
    ],
    slug: "no-sting-skin-protectant-spray-100-spr-100",
    material: "Acrylate terpolymer film-forming / silicone; alcohol-free",
    targetBuyers: "Nursing homes, assisted living facilities, incontinence care distributors",
    marketPosition: "Full-size professional film-forming skin protectant for daily facility use",
    featured: true,
    features: [
      "CHG compatible for antiseptic perineal cleansing",
      "Alcohol-free, no sting on damaged skin",
      "Up to 72h barrier against moisture and bodily fluids",
      "Full-size for daily facility use",
      "Wipe / applicator options available",
    ],
    specs: {
      Format: "Film-forming skin protectant spray",
      Size: "100 ml spray bottle",
      "Key Feature": "No-sting, alcohol-free, CHG-compatible, up to 72h",
      "Use Scenario": "Daily IAD prevention, facility use",
      "Certification Path": "Medical device (EU Class I) where classified",
    },
  },
  {
    id: "DS-KIT-001",
    name: "Incontinence Skin Care Kit (Cleanse · Protect · Moisturize)",
    category: "Complete Care Kits",
    subcategory: "Incontinence Kits",
    description:
      "A complete cleanse–protect–moisturize bundle: no-rinse cleansing foam, adult barrier cream, and no-sting skin protectant spray. One kit covers the full incontinence skin care routine — ideal for facility trials, distributor sampling, and home-care buyers who want a complete solution.",
    moq: 50,
    price: 4.0,
    currency: "USD",
    priceLabel: "Quote per kit (trial / institutional)",
    priceNote:
      "Kits are quoted by configuration (trial vs institutional pack). No extra supply-chain cost — same products in a combined pack. Payment: T/T, L/C, PayPal for samples.",
    priceTiers: [
      { quantity: "50 kits (trial MOQ)", unitPrice: "Request Quote", markup: "Trial pack" },
      { quantity: "500+ kits", unitPrice: "Request Quote", markup: "Distributor volume" },
      { quantity: "2000+ kits", unitPrice: "Request Quote", markup: "Best pricing" },
    ],
    slug: "incontinence-skin-care-kit-kit-001",
    material: "Bundle of DS-CLN + DS-CRM + DS-SPR products",
    targetBuyers: "Nursing homes, assisted living, incontinence care distributors, home-care buyers",
    marketPosition: "One kit = full routine; higher basket value, lower selection friction",
    featured: true,
    features: [
      "Covers the full cleanse–protect–moisturize routine",
      "Ideal for facility trials and distributor sampling",
      "Higher basket value than single items",
      "No extra supply-chain cost — same products in a combined pack",
      "Usage instruction card and language labels included",
    ],
    specs: {
      Format: "Incontinence skin care kit",
      Configuration: "Trial pack / institutional pack",
      Contents: "Cleansing foam + barrier cream + skin protectant spray",
      "Use Scenario": "Facility trial, distributor sampling, home-care complete solution",
      "Certification Path": "Follows the individual SKUs",
    },
  },
]

const hiddenProductIds = new Set<string>([])

export const allProducts: Product[] = productSeeds
  .map(makeProduct)
  .filter((product) => !hiddenProductIds.has(product.id))

export const productCategories: ProductCategory[] = categoryDefinitions.map((category) => ({
  ...category,
  productCount: allProducts.filter((product) => product.category === category.name).length,
}))

export const categorySlugByName = productCategories.reduce<Record<string, string>>((acc, category) => {
  acc[category.name] = category.slug
  return acc
}, {})

const featuredProductSlugs = [
  "no-rinse-cleansing-foam-200-cln-200",
  "adult-barrier-cream-crm-100",
  "no-sting-skin-protectant-spray-100-spr-100",
  "incontinence-skin-care-kit-kit-001",
]

export const featuredProducts: Product[] = featuredProductSlugs
  .map((slug) => allProducts.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product))

export const firstBatchProducts: Product[] = firstBatchProductIds
  .map((id) => allProducts.find((product) => product.id === id))
  .filter((product): product is Product => Boolean(product))

const featuredExpansionProducts = featuredProducts.filter(
  (product) => !firstBatchProductIds.includes(product.id as (typeof firstBatchProductIds)[number])
)

export const catalogProducts: Product[] = [
  ...firstBatchProducts,
  ...featuredExpansionProducts,
  ...allProducts.filter(
    (product) =>
      !firstBatchProductIds.includes(product.id as (typeof firstBatchProductIds)[number]) &&
      !featuredProductSlugs.includes(product.slug)
  ),
]
