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
      "Waterproof, machine-washable adult bib with built-in crumb catcher pocket. Designed for dignity-preserving meal times in nursing homes and assisted living.",
    moq: 50,
    price: 9.2,
    currency: "USD",
    priceLabel: "USD 9.20-9.80",
    priceNote:
      "Tiered FOB pricing based on order quantity. Supplier cost + 8-15% markup. Final quote depends on fabric choice, color, and branding.",
    priceTiers: [
      { quantity: "500+ units", unitPrice: "USD 9.20", markup: "Cost + 8%" },
      { quantity: "200-499 units", unitPrice: "USD 9.50", markup: "Cost + 12%" },
      { quantity: "50-199 units (MOQ)", unitPrice: "USD 9.80", markup: "Cost + 15%" },
    ],
    slug: "reusable-adult-bib-with-crumb-catcher-din-001",
    imageSet: "dining",
    customImages: [
      "/products/dining-solutions/DS-DIN-001/01-main.jpg",
      "/products/dining-solutions/DS-DIN-001/02-main.jpg",
      "/products/dining-solutions/DS-DIN-001/03-main.jpg",
      "/products/dining-solutions/DS-DIN-001/04-main.jpg",
      "/products/dining-solutions/DS-DIN-001/05-main.jpg",
      "/products/dining-solutions/DS-DIN-001/06-size-chart.png",
      "/products/dining-solutions/DS-DIN-001/07-color-navy.jpg",
      "/products/dining-solutions/DS-DIN-001/08-color-grey.jpg",
      "/products/dining-solutions/DS-DIN-001/09-color-royal-blue.jpg",
      "/products/dining-solutions/DS-DIN-001/10-color-burgundy.jpg",
      "/products/dining-solutions/DS-DIN-001/11-color-white.jpg",
    ],
    material: "Waterproof polyester front, soft cotton back, adjustable snap closure",
    targetBuyers: "Nursing home procurement, assisted living supply chains, care home distributors, healthcare wholesalers",
    marketPosition: "High-durability reusable bib for institutional dining — 100+ wash cycle rating",
    featured: true,
    features: [
      "Waterproof polyester front prevents soak-through",
      "Built-in crumb catcher pocket reduces floor cleanup",
      "Machine washable, rated 100+ industrial laundry cycles",
      "Soft neck closure with adjustable snap — no ties to tangle",
      "30+ color and pattern options for facility branding",
      "OEM label and packaging available for private label programs"
    ],
    specs: {
      "Fabric": "Waterproof polyester front, cotton back",
      "Closure": "Hook & loop (velcro) adjustable closure",
      "Wash Rating": "100+ industrial cycles",
      "Absorbency": "Super absorbent",
      "Crumb Catcher": "Built-in crumb catcher pocket",
      "Sizes": "75cm x 45cm (30\" x 18\") — Adult standard",
      "Color Options": "Navy, grey, royal blue, burgundy, white + 25 more",
      "Use Scenario": "Nursing home dining, assisted living meals, hospital feeding"
    },
  },
  {
    id: "DS-DIN-002",
    name: "Waterproof Clothing Protector",
    category: "Dining Solutions",
    subcategory: "Clothing Protectors",
    description:
      "Full-coverage waterproof clothing protector for residents who need extra protection during meals. Ideal for memory care and high-dependency assisted living units.",
    moq: 100,
    price: 12.0,
    currency: "USD",
    priceLabel: "USD 12.00-16.00",
    priceNote:
      "FOB reference range. Premium fabric options available at higher price point.",
    slug: "waterproof-clothing-protector-din-002",
    imageSet: "dining",
    material: "Waterproof PU lining, soft terry cotton back, adjustable snap closure",
    targetBuyers: "Memory care units, skilled nursing facilities, hospital catering, long-term care distributors",
    marketPosition: "Full-coverage protector for high-dependency dining — maximum protection, dignified design",
    featured: true,
    features: [
      "Full front and lap coverage for maximum protection",
      "Waterproof PU lining prevents liquid penetration",
      "Soft terry back for resident comfort",
      "Adjustable snap closure — easy on/off for care staff",
      "OEM label and custom packaging available",
      "Suitable for memory care and high-dependency units"
    ],
    specs: {
      "Fabric": "PU waterproof lining, cotton terry back",
      "Closure": "Adjustable snap",
      "Coverage": "Full front and lap",
      "Sizes": "Adult standard",
      "Wash Rating": "80+ industrial cycles",
      "Use Scenario": "Memory care dining, high-dependency feeding, hospital meal service"
    },
  },
  {
    id: "DS-DIN-003",
    name: "Wheelchair Dining Apron",
    category: "Dining Solutions",
    subcategory: "Dining Aprons",
    description:
      "Specially designed dining apron for wheelchair users. Provides lap and chest coverage with easy-to-reach side ties. Ideal for independent diners in assisted living.",
    moq: 100,
    price: 10.5,
    currency: "USD",
    priceLabel: "USD 10.50-14.00",
    priceNote:
      "FOB reference range. Bulk pricing available for multi-facility orders.",
    slug: "wheelchair-dining-apron-din-003",
    imageSet: "dining",
    material: "Anti-stain polyester-cotton blend, quick-release side ties",
    targetBuyers: "Assisted living communities, day care centers, rehabilitation facilities, care equipment distributors",
    marketPosition: "Wheelchair-optimized dining apron — resident-safe design that supports independent eating",
    featured: false,
    features: [
      "Wheelchair-friendly cut with lap and chest coverage",
      "Quick-release side ties for easy self-dressing",
      "Anti-stain fabric reduces laundry frequency",
      "Lightweight design for all-day comfort",
      "Bulk pricing for multi-facility procurement",
      "Multiple solid color options available"
    ],
    specs: {
      "Fabric": "Polyester-cotton blend with anti-stain treatment",
      "Closure": "Quick-release side ties",
      "Coverage": "Lap and chest",
      "Sizes": "Adult standard",
      "Wash Rating": "80+ cycles",
      "Use Scenario": "Wheelchair dining, independent resident meals, day care centers"
    },
  },
  {
    id: "DS-DIN-004",
    name: "Disposable Adult Bib (3-Ply)",
    category: "Dining Solutions",
    subcategory: "Disposable Bibs",
    description:
      "Cost-effective 3-ply disposable adult bib for short-term care, hospital use, and high-turnover dining environments. Bulk-packed for institutional supply.",
    moq: 500,
    price: 0.15,
    currency: "USD",
    priceLabel: "USD 0.15/unit (bulk 500+)",
    priceNote:
      "Per-unit price at 500-unit MOQ. Significant volume discounts at 2,000+ units.",
    slug: "disposable-adult-bib-3ply-din-004",
    imageSet: "dining",
    material: "3-ply tissue with waterproof PE backing, latex-free",
    targetBuyers: "Hospital supply chains, short-term care facilities, high-volume nursing homes, healthcare distributors",
    marketPosition: "Budget disposable option for high-turnover environments — cost-effective without sacrificing protection",
    featured: false,
    features: [
      "3-ply absorbent construction with waterproof backing",
      "Disposable — no laundry, no cross-contamination risk",
      "Bulk 500-pack for institutional supply efficiency",
      "Latex-free and hypoallergenic",
      "Significant volume discounts at 2,000+ units",
      "Compact storage — flat-packed for efficient shelving"
    ],
    specs: {
      "Material": "3-ply tissue + PE waterproof backing",
      "Type": "Disposable, single-use",
      "Pack Size": "500 units per case",
      "Latex": "Latex-free",
      "Dimensions": "Adult standard (45 x 65 cm approx.)",
      "Use Scenario": "Hospital wards, short-term care, high-turnover dining, emergency stock"
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

