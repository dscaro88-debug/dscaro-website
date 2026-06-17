// DS CARO Product Catalog — v2 LTC (2026-06-10) | 9 products, 3 categories
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

type ProductImageSet =
  | "dining"
  | "resident"
  | "daily-care"

type ProductSeed = Omit<Product, "currency" | "images" | "specs" | "launchBatch" | "launchNote"> & {
  imageSet: ProductImageSet
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

export const isLaunchPhotoReady = (slug: string) =>
  slug === "reusable-adult-bib-with-crumb-catcher-din-001"

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
) => `${formatProductPrice(product)} / unit`

const categoryDefinitions: Omit<ProductCategory, "productCount">[] = [
  {
    name: "Dining Solutions",
    slug: "dining-solutions",
    description: "Adult bibs, clothing protectors, dining aprons, and crumb catchers for nursing homes and assisted living.",
    icon: "🍽️",
    image: "/images/category-dining.jpg",
  },
  {
    name: "Resident Management",
    slug: "resident-management",
    description: "Clothing labels, laundry labels, iron-on name tags, and resident belongings bags for care facilities.",
    icon: "🏷️",
    image: "/images/category-resident.jpg",
  },
  {
    name: "Daily Care",
    slug: "daily-care",
    description: "Washable bed pads, waterproof mattress protectors, care towels, and daily hygiene supplies.",
    icon: "🛏️",
    image: "/images/category-daily.jpg",
  },
]
const defaultCertifications =
  "Certificate and test-file status pending supplier file confirmation for the exact SKU."
const defaultPackaging = "Neutral box, DS CARO box, private label box, retail sleeve, or bulk carton"
const defaultLeadTime = "20-35 days after sample approval"

export const firstBatchProductIds = [
  "DS-DIN-001",
  "DS-DIN-002",
  "DS-DIN-003",
  "DS-DIN-004",
  "DS-DIN-005",
  "DS-RSM-001",
  "DS-RSM-002",
  "DS-RSM-003",
  "DS-DCR-001",
  "DS-DCR-002",
] as const

const makeProduct = (seed: ProductSeed): Product => {
  const {
    imageSet: _imageSet,
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
    images: seed.customImages && seed.customImages.length > 0
      ? seed.customImages
      : [buildProductVisualPath(product.slug)],
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
      "OEM/ODM": "Logo, color, packaging, insert, barcode and marketplace content support available",
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
    id: "DS-DIN-001",
    name: "Reusable Adult Bib with Crumb Catcher",
    category: "Dining Solutions",
    subcategory: "Adult Bibs",
    description:
      "Waterproof polyester adult bib with built-in crumb catcher, hook & loop closure, machine washable 100+ cycles. Designed for dignity-preserving meal times in care settings.",
    moq: 60,
    price: 1.35,
    currency: "USD",
    priceLabel: "USD 0.85 – 1.35 / piece",
    priceNote:
      "FOB reference tiered pricing. FOB range USD 0.88 – 1.35 per piece. B2B cost: contact supplier. B2C reference (UK market): from £8.50. Payment: T/T, L/C, Western Union, PayPal. Sample lead time 7 days, bulk 15-25 days.",
    priceTiers: [
      { quantity: "60 pcs (MOQ)", unitPrice: "USD 1.35", markup: "FOB reference" },
      { quantity: "500+ pcs", unitPrice: "USD 1.00", markup: "Volume discount" },
      { quantity: "1000+ pcs", unitPrice: "USD 0.85", markup: "Best price" },
    ],
    slug: "reusable-adult-bib-with-crumb-catcher-din-001",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-001/主图_01.jpg",
      "/products/dining-solutions/DS-DIN-001/主图_02.jpg",
      "/products/dining-solutions/DS-DIN-001/主图_03.jpg",
      "/products/dining-solutions/DS-DIN-001/主图_04.jpg",
      "/products/dining-solutions/DS-DIN-001/主图_05.jpg",
      "/products/dining-solutions/DS-DIN-001/SKU_02_藏蓝色.jpg",
      "/products/dining-solutions/DS-DIN-001/SKU_03_灰色.jpg",
      "/products/dining-solutions/DS-DIN-001/SKU_04_宝蓝色.jpg",
      "/products/dining-solutions/DS-DIN-001/SKU_05_酒红色.jpg",
      "/products/dining-solutions/DS-DIN-001/SKU_06_白色.jpg",
    ],
    material: "Waterproof polyester front with PU coating + terry cloth back",
    targetBuyers: "Nursing home procurement, assisted living supply chains, care home distributors, healthcare wholesalers",
    marketPosition: "High-durability reusable bib for institutional dining — 100+ wash cycle rating",
    featured: true,
    features: [
      "Waterproof fabric — prevents soak-through",
      "Machine washable, 100+ industrial laundry cycles",
      "Built-in crumb catcher pocket reduces floor cleanup",
      "Soft neck closure (hook & loop) — no ties to tangle",
      "30+ color and pattern options for facility branding",
      "OEM label and packaging available for private label programs"
    ],
    specs: {
      "Fabric": "Waterproof polyester + PU coating, terry cloth back",
      "Closure": "Hook & loop (velcro) adjustable closure",
      "Wash Rating": "100+ industrial cycles (≤60°C)",
      "Absorbency": "Super absorbent",
      "Crumb Catcher": "Built-in crumb catcher pocket",
      "Size": "75cm × 45cm (30\" × 18\")",
      "Net Weight": "~120g per unit",
      "Color Options": "Grey (default), Navy, Royal Blue, Burgundy, White + 25 more",
      "Use Scenario": "Nursing home dining, assisted living meals, hospital feeding"
    },
  },
  {
    id: "DS-DIN-002",
    name: "Premium Jewelry Decoration Waterproof Clothing Protector",
    category: "Dining Solutions",
    subcategory: "Clothing Protectors",
    description:
      "PU waterproof fabric with built-in crumb catcher, fashionable jewelry and embroidery decoration, hook & loop closure, machine washable 100+ cycles. Ideal for nursing home and home dining care. Premium decorative option, 15-20% markup potential — suitable for gifting scenarios.",
    moq: 60,
    price: 2.25,
    currency: "USD",
    priceLabel: "From USD 2.25 / piece",
    priceNote:
      "60-piece MOQ tier: USD 2.25. Higher tiers (500+ / 1000+) — request quote. Payment: T/T, L/C, Western Union, PayPal. Sample lead time 7 days, bulk 15-25 days.",
    priceTiers: [
      { quantity: "60 pcs (MOQ)", unitPrice: "USD 2.25", markup: "FOB reference" },
      { quantity: "500+ pcs", unitPrice: "Request Quote", markup: "Volume pricing" },
      { quantity: "1000+ pcs", unitPrice: "Request Quote", markup: "Best pricing" },
    ],
    slug: "premium-jewelry-clothing-protector-din-002",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-002/主图_01.jpg",
      "/products/dining-solutions/DS-DIN-002/主图_02.jpg",
      "/products/dining-solutions/DS-DIN-002/主图_03.jpg",
      "/products/dining-solutions/DS-DIN-002/主图_04.jpg",
      "/products/dining-solutions/DS-DIN-002/主图_05.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_01_2023-1.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_02_2023-2.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_03_2023-3.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_04_2023-4.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_05_2023-5.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_06_2023-6.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_07_2023-7.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_08_2023-8.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_09_2023-9.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_10_2023-10.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_11_2023-11.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_12_2023-18.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_13_2023-17.jpg",
      "/products/dining-solutions/DS-DIN-002/SKU_15_2023-13.jpg",
      "/products/dining-solutions/DS-DIN-002/详情_02.jpg",
      "/products/dining-solutions/DS-DIN-002/详情_03.jpg",
      "/products/dining-solutions/DS-DIN-002/详情_04.jpg",
      "/products/dining-solutions/DS-DIN-002/详情_05.jpg",
    ],
    material: "PU waterproof front + polyester backing",
    targetBuyers: "Care home gifting, premium nursing home procurement, specialty distributors, lifestyle elderly care brands",
    marketPosition: "Premium decorative dining protector — jewelry & embroidery styles for dignity-preserving care; 15-20% markup potential",
    featured: true,
    features: [
      "14 decorative variants — pearl / gemstone / crystal necklaces + 11 embroidery patterns (phoenix, peony, bamboo, lotus, hummingbird, snowdrop, etc.)",
      "PU waterproof fabric — full liquid protection",
      "Built-in crumb catcher pocket",
      "Hook & loop soft neck closure — no ties",
      "Machine washable, 100+ cycles",
      "Premium positioning for gift and specialty-care markets"
    ],
    specs: {
      "Fabric": "PU waterproof front + polyester backing",
      "Closure": "Hook & loop (velcro) adjustable closure",
      "Wash Rating": "100+ industrial cycles (≤60°C)",
      "Absorbency": "Waterproof & stain-resistant",
      "Crumb Catcher": "Built-in crumb catcher pocket",
      "Size": "85cm × 45cm (33.4\" × 18\")",
      "Net Weight": "~130g per unit",
      "Style Variants": "14 (1 pearl, 1 gemstone, 1 crystal, 11 embroidery patterns)",
      "Use Scenario": "Premium nursing home dining, gift / specialty care, home care"
    },
  },
  {
    id: "DS-DIN-003",
    name: "Humorous Message Waterproof Adult Bib ('I Haven't Eaten Yet' Series)",
    category: "Dining Solutions",
    subcategory: "Clothing Protectors",
    description:
      "PU waterproof adult bib with humorous 'IF YOU CAN read this I haven't eaten yet' print, designed to help dementia residents communicate meal needs. Hook & loop closure, machine washable, ideal for dementia care units. Differentiated positioning for memory-care-only markets.",
    moq: 60,
    price: 1.45,
    currency: "USD",
    priceLabel: "USD 0.95 – 1.45 / piece",
    priceNote:
      "FOB range USD 0.95 – 1.45. Tiered: 100 pcs USD 1.45 / 500 pcs USD 1.15 / 1000 pcs USD 0.95. Payment: T/T, L/C, Western Union, PayPal. Sample lead time 7 days, bulk 15-25 days.",
    priceTiers: [
      { quantity: "100 pcs (MOQ tier)", unitPrice: "USD 1.45", markup: "FOB reference" },
      { quantity: "500 pcs", unitPrice: "USD 1.15", markup: "Volume discount" },
      { quantity: "1000 pcs", unitPrice: "USD 0.95", markup: "Best price" },
    ],
    slug: "humorous-message-adult-bib-din-003",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-003/主图_01.jpg",
      "/products/dining-solutions/DS-DIN-003/主图_02.jpg",
      "/products/dining-solutions/DS-DIN-003/主图_03.jpg",
      "/products/dining-solutions/DS-DIN-003/主图_04.jpg",
      "/products/dining-solutions/DS-DIN-003/主图_05.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_04.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_05.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_06.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_07.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_08.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_09.jpg",
      "/products/dining-solutions/DS-DIN-003/详情_10.jpg",
    ],
    material: "PU waterproof front + polyester backing",
    targetBuyers: "Dementia care units, memory care facilities, specialist elderly care distributors, NHS supplier chains",
    marketPosition: "Dementia-specific functional bib — 'I haven't eaten yet' print helps residents communicate meal needs; differentiated for memory-care-only markets",
    featured: true,
    features: [
      "Humorous 'IF YOU CAN read this I haven't eaten yet' print — designed to help dementia residents self-report meal needs",
      "PU waterproof fabric — full liquid protection",
      "Built-in crumb catcher pocket",
      "Hook & loop soft neck closure — no ties to tangle",
      "Machine washable, 100+ cycles (≤60°C)",
      "Two color variants: black/white print, and black with yellow/green/blue text + tableware graphic",
      "Purpose-built for dementia / memory care units"
    ],
    specs: {
      "Fabric": "PU waterproof front + polyester backing",
      "Closure": "Hook & loop (velcro) adjustable closure",
      "Wash Rating": "100+ industrial cycles (≤60°C)",
      "Absorbency": "Waterproof & stain-resistant",
      "Crumb Catcher": "Built-in crumb catcher pocket",
      "Size": "58cm × 46cm",
      "Style Variants": "2 (B/W text print, multicolor text + tableware print)",
      "Use Scenario": "Dementia care dining, memory care units, NHS / public healthcare procurement"
    },
  },
  {
    id: "DS-DIN-004",
    name: "Adult Silicone Waterproof Bib",
    category: "Dining Solutions",
    subcategory: "Clothing Protectors",
    description:
      "Food-grade silicone waterproof bib with 3D leak-proof crumb catcher, adjustable snap closure, 200°C heat resistant, machine washable 100+ cycles. Ideal for nursing homes, care facilities, and dining care.",
    moq: 60,
    price: 2.18,
    currency: "USD",
    priceLabel: "USD 1.58 – 2.18 / piece",
    priceNote:
      "FOB range USD 1.58-2.18. Tiered pricing: 60 pcs USD 2.18 / 500 pcs USD 1.88 / 1000 pcs USD 1.58. Payment: T/T, L/C, Western Union, PayPal. Sample lead time 7 days, bulk 15-25 days. Source: 兰溪市其利工贸有限公司, 1688 offer 623824143166.",
    priceTiers: [
      { quantity: "60 pcs (MOQ)", unitPrice: "USD 2.18", markup: "FOB reference" },
      { quantity: "500+ pcs", unitPrice: "USD 1.88", markup: "Volume discount" },
      { quantity: "1000+ pcs", unitPrice: "USD 1.58", markup: "Best price" },
    ],
    slug: "adult-silicone-waterproof-bib-din-004",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-004/主图_01.jpg",
      "/products/dining-solutions/DS-DIN-004/主图_02.jpg",
      "/products/dining-solutions/DS-DIN-004/主图_03.jpg",
      "/products/dining-solutions/DS-DIN-004/主图_05.jpg",
      "/products/dining-solutions/DS-DIN-004/SKU_01_静谧蓝.jpg",
      "/products/dining-solutions/DS-DIN-004/SKU_02_香槟粉.jpg",
      "/products/dining-solutions/DS-DIN-004/SKU_03_迷洁灰.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_23.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_24.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_25.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_26.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_27.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_28.jpg",
      "/products/dining-solutions/DS-DIN-004/详情_29.jpg",
    ],
    material: "Food-grade silicone + PU waterproof coating",
    targetBuyers: "Nursing homes, assisted living, memory care units, care home distributors",
    marketPosition: "Premium silicone waterproof bib for institutional dining care — 3D leak-proof, dishwasher safe, designed for dignity-preserving long-term use",
    featured: true,
    features: [
      "Food-grade silicone, BPA-free, safety-tested",
      "3D leak-proof crumb catcher pocket",
      "4-hole adjustable snap closure — no ties to tangle",
      "Heat-resistant to 200°C — boil-safe / steam-sterilizable",
      "Machine washable 100+ cycles (≤60°C)",
      "Available in 3 colors: Tranquil Blue / Champagne Pink / Misty Grey",
      "Two sizes: large (45×29cm) and extra-large (52×35.5cm)"
    ],
    specs: {
      "Fabric": "Food-grade silicone + PU waterproof coating",
      "Closure": "4-hole adjustable snap",
      "Wash Rating": "100+ industrial cycles (≤60°C)",
      "Heat Resistance": "≤200°C (boil-safe / steam-sterilizable)",
      "Crumb Catcher": "3D leak-proof pocket, 7.5cm deep (large) / 9cm deep (XL)",
      "Size": "Large 45×29cm (~117g) / Extra-Large 52×35.5cm (~181g)",
      "Color Options": "Tranquil Blue / Champagne Pink / Misty Grey",
      "Use Scenario": "Nursing home dining, memory care, assisted living, hospital meal service"
    },
  },
  {
    id: "DS-DIN-005",
    name: "Reversible Waterproof Dining Bib",
    category: "Dining Solutions",
    subcategory: "Clothing Protectors",
    description:
      "Two-sided adult dining bib: cotton-absorbent front and TPU waterproof back in a single garment. Detachable 3D crumb catcher snaps on/off, full-path hook & loop neck closure, fluorescent-free tested. Three sizes M/L/XL for nursing home, elder care, and dementia dining use.",
    moq: 60,
    price: 2.65,
    currency: "USD",
    priceLabel: "USD 1.98 – 2.65 / piece",
    priceNote:
      "FOB range USD 1.98-2.65. Tiered pricing: 60 pcs USD 2.65 / 500 pcs USD 2.15 / 1000 pcs USD 1.98. Payment: T/T, L/C, Western Union, PayPal. Sample lead time 7 days, bulk 15-25 days. Source: 兰溪市其利工贸有限公司, 1688 offer 626979962122.",
    priceTiers: [
      { quantity: "60 pcs (MOQ)", unitPrice: "USD 2.65", markup: "FOB reference" },
      { quantity: "500+ pcs", unitPrice: "USD 2.15", markup: "Volume discount" },
      { quantity: "1000+ pcs", unitPrice: "USD 1.98", markup: "Best price" },
    ],
    slug: "reversible-waterproof-dining-bib-din-005",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-005/主图_01.png",
      "/products/dining-solutions/DS-DIN-005/主图_02.png",
      "/products/dining-solutions/DS-DIN-005/主图_03.png",
      "/products/dining-solutions/DS-DIN-005/主图_04.png",
      "/products/dining-solutions/DS-DIN-005/主图_05.png",
      "/products/dining-solutions/DS-DIN-005/SKU_01_双排扣米底大格L.png",
      "/products/dining-solutions/DS-DIN-005/SKU_02_双排扣米底小格L.png",
      "/products/dining-solutions/DS-DIN-005/SKU_03_双排扣米底小格XL.png",
      "/products/dining-solutions/DS-DIN-005/详情_03.png",
      "/products/dining-solutions/DS-DIN-005/详情_04.png",
      "/products/dining-solutions/DS-DIN-005/详情_05.png",
      "/products/dining-solutions/DS-DIN-005/详情_06.png",
      "/products/dining-solutions/DS-DIN-005/详情_08.png",
      "/products/dining-solutions/DS-DIN-005/详情_09.png",
      "/products/dining-solutions/DS-DIN-005/详情_10.png",
      "/products/dining-solutions/DS-DIN-005/详情_12.png",
      "/products/dining-solutions/DS-DIN-005/详情_13.png",
      "/products/dining-solutions/DS-DIN-005/详情_14.png",
    ],
    material: "Cotton absorbent front + TPU waterproof back, full-path hook & loop neck closure, detachable 3D crumb catcher pocket",
    targetBuyers: "Nursing homes, elder care facilities, dementia care units, hospital meal service, assisted living distributors",
    marketPosition: "Reversible two-sided dining bib — cotton absorbency + TPU waterproof in one garment, 3D detachable crumb catcher, fluorescent-free tested for safe long-term institutional use",
    featured: true,
    features: [
      "Two-sided design: cotton-absorbent front + TPU waterproof back in one garment",
      "Detachable 3D crumb catcher — snap-on/off, catches rice, soup & debris",
      "Full-path hook & loop neck closure — one-piece rounded, skin-friendly, fine stitching",
      "TPU film blocks water-based stains, oil, dry stains & dust — rinse & wipe clean",
      "Premium eco-friendly cotton — instant absorption, multi-layer leak-proof",
      "Fluorescent-free tested (0 mg/L) — safe for elderly and sensitive skin",
      "Three sizes M (56cm) / L (64cm) / XL (72cm) — fits all neck sizes",
      "Two colorways available — blue plaid, beige plaid"
    ],
    specs: {
      "Fabric": "Cotton absorbent front + TPU waterproof back",
      "Closure": "Full-path hook & loop, one-piece rounded, skin-friendly",
      "Crumb Catcher": "Detachable 3D pocket, 10cm deep, snap-on/off",
      "Pocket Length": "10cm",
      "Total Width": "36cm",
      "Neck Width": "19cm",
      "Total Length": "M 56cm / L 64cm / XL 72cm",
      "Size Variants": "M (56cm) / L (64cm) / XL (72cm)",
      "Color Options": "Blue plaid, Beige plaid",
      "Safety Test": "Fluorescent agent 0 mg/L (tested)",
      "Use Scenario": "Nursing home dining, elder care, dementia care, hospital meal service, assisted living"
    },
  },
  {
    id: "DS-RSM-001",
    name: "Resident Belongings Bag",
    category: "Resident Management",
    subcategory: "Belongings Management",
    description:
      "Durable drawstring bag for managing resident personal items during admission, transfer, or laundry cycles. Essential for care home organization and lost-property prevention.",
    moq: 100,
    price: 5.0,
    currency: "USD",
    priceLabel: "USD 5.00-8.00",
    priceNote:
      "FOB reference range. Price varies by size and fabric weight.",
    slug: "resident-belongings-bag-rsm-001",
    imageSet: "resident",
    material: "Durable cotton-polyester blend, drawstring closure, transparent name tag window",
    targetBuyers: "Nursing home administrators, assisted living facility managers, care home procurement, laundry service providers",
    marketPosition: "Essential resident property management tool — reduce lost items and laundry mix-ups",
    featured: true,
    features: [
      "Durable cotton-polyester blend withstands repeated use",
      "Secure drawstring closure with cord lock",
      "Transparent name tag window for resident identification",
      "Available in multiple sizes (small/medium/large)",
      "Machine washable and reusable",
      "OEM facility logo printing available"
    ],
    specs: {
      "Fabric": "Cotton-polyester blend",
      "Closure": "Drawstring with cord lock",
      "Identification": "Transparent name tag window",
      "Sizes": "S (30x40cm), M (40x50cm), L (50x60cm)",
      "Wash Rating": "50+ cycles",
      "Use Scenario": "Resident admission, personal item transfer, laundry collection"
    },
  },
  {
    id: "DS-RSM-002",
    name: "Clothing Name Labels (Iron-On)",
    category: "Resident Management",
    subcategory: "Clothing Labels",
    description:
      "Custom-printed iron-on clothing labels with resident name and room number. Reduce laundry mix-ups and lost clothing in care facilities. Bulk roll pricing available.",
    moq: 500,
    price: 0.1,
    currency: "USD",
    priceLabel: "USD 0.10/label (bulk 500+)",
    priceNote:
      "Per-label price at 500-label MOQ. Custom printing setup included. Significant discounts at 2,000+ labels.",
    slug: "clothing-name-labels-iron-on-rsm-002",
    imageSet: "resident",
    material: "Wash-resistant polyester fabric label, heat-activated adhesive backing",
    targetBuyers: "Care home laundry managers, nursing home administrators, assisted living procurement, uniform suppliers",
    marketPosition: "High-durability identification solution — survives 50+ industrial wash cycles",
    featured: true,
    features: [
      "Custom printed with resident name, room number, facility name",
      "Iron-on application — no sewing required",
      "Wash-resistant, rated 50+ industrial laundry cycles",
      "Multiple font sizes available for readability",
      "Bulk roll pricing with significant volume discounts",
      "Quick 5-7 day production after artwork approval"
    ],
    specs: {
      "Material": "Polyester fabric with heat-activated adhesive",
      "Application": "Iron-on (15-20 seconds at medium heat)",
      "Wash Rating": "50+ industrial cycles",
      "Sizes": "Standard (30x15mm), Large (50x20mm)",
      "Print": "Custom text, single or double line",
      "Use Scenario": "Clothing identification, laundry sorting, resident property management"
    },
  },
  {
    id: "DS-RSM-003",
    name: "Laundry Identification Tags",
    category: "Resident Management",
    subcategory: "Laundry Tags",
    description:
      "Waterproof snap-on laundry identification tags for care facility clothing management. Quick to attach and remove, long-lasting through commercial washing cycles.",
    moq: 250,
    price: 0.3,
    currency: "USD",
    priceLabel: "USD 0.30/tag (bulk 250+)",
    priceNote:
      "Per-tag price at 250-tag MOQ. Color-coded sets available at standard pricing.",
    slug: "laundry-identification-tags-rsm-003",
    imageSet: "resident",
    material: "Waterproof PVC, snap-button mechanism, write-on surface",
    targetBuyers: "Commercial laundry services, nursing home facilities, assisted living communities, care home groups",
    marketPosition: "Quick-attach laundry sorting solution — color-coded for unit/room organization",
    featured: false,
    features: [
      "Waterproof and durable PVC construction",
      "Snap-button mechanism — fast to attach and remove",
      "Write-on surface with permanent marker compatibility",
      "Color-coded options for unit, room, or resident sorting",
      "Safe for commercial washing machines and dryers",
      "Reusable across multiple laundry cycles"
    ],
    specs: {
      "Material": "Waterproof PVC",
      "Attachment": "Snap-button mechanism",
      "Marking": "Write-on surface (permanent marker)",
      "Color Options": "6 standard colors for sorting",
      "Wash Rating": "100+ commercial cycles",
      "Use Scenario": "Laundry sorting, resident clothing management, unit organization"
    },
  },
  {
    id: "DS-DCR-001",
    name: "Washable Bed Pad (Multi-Layer)",
    category: "Daily Care",
    subcategory: "Bed Protection",
    description:
      "Premium multi-layer washable bed pad for incontinence protection in care facilities. Designed for 300+ industrial wash cycles with waterproof backing and color-coded sizing.",
    moq: 50,
    price: 12.0,
    currency: "USD",
    priceLabel: "USD 12.00-18.00",
    priceNote:
      "FOB reference range. Price varies by size. Bulk pricing for multi-facility orders.",
    slug: "washable-bed-pad-multi-layer-dcr-001",
    imageSet: "daily-care",
    material: "Multi-layer absorbent core, waterproof TPU backing, soft quilted cotton surface",
    targetBuyers: "Nursing home supply chains, assisted living procurement, hospital bedding suppliers, care home distributors",
    marketPosition: "High-durability reusable bed pad — 300+ wash cycles, significant cost savings vs disposables",
    featured: true,
    features: [
      "Multi-layer absorbent core for reliable protection",
      "Waterproof TPU backing prevents mattress damage",
      "Rated 300+ industrial wash cycles",
      "Color-coded sizing for easy laundry sorting",
      "Multiple sizes: Single, Twin, Full, Queen",
      "OEM private label and custom packaging available"
    ],
    specs: {
      "Construction": "Quilted cotton surface + absorbent core + TPU backing",
      "Waterproof": "TPU membrane, breathable",
      "Wash Rating": "300+ industrial cycles",
      "Sizes": "Single (90x180cm), Twin (120x200cm), Full (150x200cm), Queen (180x200cm)",
      "Color Coding": "Size-indicated colored binding",
      "Use Scenario": "Incontinence management, bed protection, infection control"
    },
  },
  {
    id: "DS-DCR-002",
    name: "Waterproof Mattress Protector",
    category: "Daily Care",
    subcategory: "Mattress Protection",
    description:
      "Full-fit waterproof mattress protector with breathable TPU membrane and zippered closure. Essential for care home bed management, infection control, and mattress longevity.",
    moq: 50,
    price: 15.0,
    currency: "USD",
    priceLabel: "USD 15.00-22.00",
    priceNote:
      "FOB reference range. Premium hospital-grade version available at higher price point.",
    slug: "waterproof-mattress-protector-dcr-002",
    imageSet: "daily-care",
    material: "Breathable TPU membrane, soft polyester-cotton surface, full-wrap zippered closure",
    targetBuyers: "Care home facility managers, hospital procurement, nursing home chains, bedding distributors",
    marketPosition: "Hospital-grade mattress protection — extend mattress life, improve infection control protocols",
    featured: true,
    features: [
      "Breathable TPU membrane allows airflow while blocking liquids",
      "Full mattress encasement with secure zippered closure",
      "Hospital-grade infection control design",
      "Available in Single, Twin, Full, and King sizes",
      "Machine washable at high temperature for sanitization",
      "Extends mattress lifespan by preventing fluid damage"
    ],
    specs: {
      "Construction": "Polyester-cotton surface + breathable TPU membrane",
      "Closure": "Full-wrap zippered encasement",
      "Waterproof": "TPU membrane, breathable",
      "Sizes": "Single, Twin, Full, King",
      "Wash Rating": "200+ cycles at up to 75°C",
      "Use Scenario": "Mattress protection, infection control, bed bug prevention, allergen barrier"
    },
  }

]

export const allProducts: Product[] = productSeeds.map(makeProduct)

export const productCategories: ProductCategory[] = categoryDefinitions.map((category) => ({
  ...category,
  productCount: allProducts.filter((product) => product.category === category.name).length,
}))

export const categorySlugByName = productCategories.reduce<Record<string, string>>((acc, category) => {
  acc[category.name] = category.slug
  return acc
}, {})

const featuredProductSlugs = [
  "reusable-adult-bib-with-crumb-catcher-din-001",
  "waterproof-clothing-protector-din-002",
  "resident-belongings-bag-rsm-001",
  "clothing-name-labels-iron-on-rsm-002",
  "washable-bed-pad-multi-layer-dcr-001",
  "waterproof-mattress-protector-dcr-002",
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

