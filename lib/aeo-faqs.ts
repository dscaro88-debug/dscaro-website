// DS CARO — AEO FAQ source of truth (2026-09-22)
// Shared by the visible <FaqSection /> block AND the FAQPage JSON-LD, so structured
// data always matches on-page content (required by Google; also what AI answer
// engines extract as a Q&A pair).
//
// COMPLIANCE RULE: never claim a confirmed certification, never present a product as
// a regulated medical device, never quote a price that is not already on the site.
// Document status is always described as "reviewed per SKU".

export interface AeoFaq {
  question: string
  answer: string
}

// ─── Site-wide B2B buyer questions ──────────────────────────────────────────
export const globalFaqs: AeoFaq[] = [
  {
    question: "What is the minimum order quantity (MOQ) for DS CARO incontinence skin care?",
    answer:
      "Most DS CARO launch SKUs start at 500 units per SKU. The Incontinence Skin Care Kit DS-KIT-001 starts at 50 kits, so care facilities and distributors can trial the full cleanse–protect–moisturise routine before scaling. The exact MOQ is confirmed per SKU and packaging type in your quotation.",
  },
  {
    question: "Does DS CARO offer OEM and private label incontinence skin care?",
    answer:
      "Yes. OEM and private label can start from a simple logo label or carton mark change and extend to fully custom retail packaging, including label language, barcode, insert card and carton marks. OEM feasibility and its MOQ are confirmed per SKU before artwork is approved.",
  },
  {
    question: "What documents and certifications does DS CARO provide?",
    answer:
      "Documentation is reviewed per SKU, not assumed. When you tell us your target country and sales channel, we confirm which test files, material statements, labels and supplier documents are available for that exact SKU, and we flag anything that needs new testing, translation or preparation before you commit to bulk.",
  },
  {
    question: "Can I order a sample before placing a bulk order?",
    answer:
      "Yes. Sample preparation usually takes 5–10 days once the SKU, pack size and label language are confirmed. We recommend approving a physical sample before finalising packaging artwork, because label layout, carton marks and kit configuration are easier to change at sample stage than after production starts.",
  },
  {
    question: "What is the lead time for DS CARO bulk orders?",
    answer:
      "Bulk production is commonly 15–35 days after sample and packaging approval, depending on SKU and order quantity. Quotation replies are targeted within one business day. The exact production schedule is confirmed in writing once the SKU scope, packaging and label content are locked.",
  },
  {
    question: "How is FOB pricing structured for DS CARO products?",
    answer:
      "DS CARO quotes FOB pricing by volume tier, typically an MOQ tier, a 500+ tier and a 1000+ planning tier, with the loading port confirmed in the quotation. Packaging type, label scope and kit configuration change unit cost, so pricing is issued per SKU and per order scope.",
  },
  {
    question: "Are DS CARO incontinence skin care products classified as medical devices?",
    answer:
      "DS CARO supplies these items as non-medical care supplies unless a specific SKU is reviewed under another pathway. We do not present a product as a regulated medical device. Any classification question is confirmed against the exact SKU and destination market during quotation review.",
  },
  {
    question: "Which countries and buyer types does DS CARO serve?",
    answer:
      "DS CARO serves B2B buyers in Europe, including the United Kingdom, Germany, France and Poland, as well as North America. Buyer types include nursing homes, assisted living groups, incontinence care distributors, home-care channels and private-label brands building their own care range.",
  },
  {
    question: "What information should I include to get an accurate quote?",
    answer:
      "Include your destination country, buyer type, product line or SKU, estimated annual quantity, packaging and OEM requirements, document expectations and sample timeline. With those six points DS CARO can reply with MOQ, FOB range, lead time and the available document status for the SKUs you selected.",
  },
]

// ─── Page-level FAQ sets ────────────────────────────────────────────────────
export const whyDscaroFaqs: AeoFaq[] = [
  {
    question: "What makes DS CARO different from a general senior-care supplier?",
    answer:
      "DS CARO stays inside one category: adult incontinence skin care. Instead of a broad elderly-care catalogue, the range is built around three lines — Cleansing, Barrier Protection and Complete Care Kits — so facility procurement teams and distributors can compare, specify and reorder quickly.",
  },
  {
    question: "Which product lines does DS CARO focus on?",
    answer:
      "Three lines: no-rinse cleansing foams, barrier protection (zinc oxide and dimethicone creams plus a no-sting film-forming protectant spray), and the Incontinence Skin Care Kit that bundles cleansing, barrier and protectant into one routine. All are adult-specific and built for facility and distributor channels.",
  },
  ...globalFaqs.slice(0, 6),
]

export const howToOrderBulkFaqs: AeoFaq[] = [
  {
    question: "How do I start a bulk order with DS CARO?",
    answer:
      "Send an RFQ with buyer type, product category or SKU, monthly volume, destination country and required timing. DS CARO replies with MOQ, FOB price tier, packaging options, sample plan and available document status, then moves to sample approval and production once the specification is confirmed.",
  },
  {
    question: "Can I mix several SKUs in one bulk order?",
    answer:
      "Yes. Mixed-SKU orders and kit combinations are supported, and blended quotes can be issued when a distributor is building a new category range rather than restocking a single item. Mixing SKUs may change packaging and carton planning, so the combination is confirmed during quotation.",
  },
  {
    question: "Do you support repeat orders after the first shipment?",
    answer:
      "Yes. Repeat-order planning is arranged after the first shipment and buyer feedback, which is where pack size, replenishment cycle and private-label artwork are usually adjusted. Reorder quantities can be planned so that label and carton tooling already approved are reused without new setup.",
  },
  ...globalFaqs.slice(3, 8),
]

export const oemPrivateLabelFaqs: AeoFaq[] = [
  {
    question: "What is the difference between OEM and private label at DS CARO?",
    answer:
      "Private label usually means our existing product supplied under your brand — your logo, label, carton and language. OEM goes further and can change the product specification, pack size or closure in addition to the branding. Both are reviewed per SKU before a MOQ is quoted.",
  },
  {
    question: "What can be customised on private label packaging?",
    answer:
      "Logo placement, label artwork and language, barcode, insert card, carton marks, retail bag or shrink configuration and mixed-SKU kit contents. Simple label or carton changes usually start at a lower MOQ than fully custom retail packaging, which is confirmed during feasibility review.",
  },
  {
    question: "Can DS CARO handle label language and barcode requirements?",
    answer:
      "Yes. Tell us the destination market and the label content your importer or marketplace requires — language, warnings, ingredient and address panel, barcode format — and we align the label draft accordingly. Final regulatory wording remains the buyer's responsibility in the destination market.",
  },
  {
    question: "How long does an OEM or private label project take?",
    answer:
      "An OEM project adds artwork confirmation time before the sample is produced. After artwork and sample approval, bulk production is commonly 15–35 days depending on SKU and quantity. The artwork cycle is usually the longest variable, so early label drafts shorten the total timeline.",
  },
  ...globalFaqs.slice(0, 4),
]

export const qualityCertificationsFaqs: AeoFaq[] = [
  {
    question: "Which product documents are available for DS CARO SKUs?",
    answer:
      "Availability is checked against the exact SKU and current supplier file status. Depending on the SKU, this can include material statements, safety data, label drafts and packaging specifications. We review what exists during quotation and tell you what is missing before you place a bulk order.",
  },
  {
    question: "Can DS CARO provide RoHS or REACH statements?",
    answer:
      "Material safety requests such as RoHS or REACH file review can be discussed by SKU. Where a statement is already held it can be shared during quotation; where it is not, the requirement is treated as a project item with its own timeline and possible cost, rather than promised up front.",
  },
  {
    question: "Do you provide a certificate of analysis (COA) or safety data sheet (SDS)?",
    answer:
      "COA and SDS availability is confirmed per SKU against the supplier file status — we do not assume a document exists for every item. If a file is not held for the SKU you need, we say so during quotation so you can decide before committing to an order.",
  },
  {
    question: "Who is responsible for market-entry documents in the destination country?",
    answer:
      "The buyer or importer of record remains responsible for market-entry compliance in the destination country. DS CARO prepares the product, label, packaging and any available technical files needed to support that submission, and highlights gaps during RFQ review so they can be planned early.",
  },
  {
    question: "Are DS CARO products registered medical devices?",
    answer:
      "Unless a specific SKU is reviewed under another pathway, the range is supplied as non-medical care supplies and is not presented as a registered medical device. Buyers who require a regulated-device route should state this at RFQ stage so the classification question is handled before sampling.",
  },
  ...globalFaqs.slice(3, 5),
]

// ─── Blog post FAQ sets ─────────────────────────────────────────────────────
export const blogFaqs: Record<string, AeoFaq[]> = {
  "long-term-care-supplies-category-guide": [
    {
      question: "How many product lines does DS CARO offer?",
      answer:
        "Three: Cleansing (no-rinse foams), Barrier Protection (creams and a no-sting protectant spray) and Complete Care Kits that bundle the routine. The narrow structure is deliberate — it keeps SKU selection and reordering simple for facility procurement teams and distributors.",
    },
    {
      question: "Why is a narrow incontinence skin care range easier to buy?",
      answer:
        "A focused range means fewer specification variables and faster comparison between SKUs. Buyers can standardise one cleansing step, one barrier step and one kit configuration, which shortens quoting and makes repeat ordering and packaging decisions much more predictable.",
    },
  ],
  "barrier-cream-vs-skin-protectant-spray": [
    {
      question: "Should a care facility buy barrier cream or a skin protectant spray?",
      answer:
        "Most facilities need both. A zinc oxide or dimethicone barrier cream suits scheduled, low-friction care, while a no-sting film-forming protectant spray is faster on fragile or painful skin and easier to apply without rubbing. Many buyers standardise one of each.",
    },
    {
      question: "Is a no-sting protectant spray suitable for damaged skin?",
      answer:
        "A no-sting, film-forming protectant is generally chosen where skin is already fragile or sore, because it avoids the rubbing that thicker creams require. The right choice still depends on the care protocol and on how the product interacts with other skin products in use.",
    },
  ],
  "no-rinse-cleansing-foam-best-practices": [
    {
      question: "Why use a no-rinse cleansing foam instead of soap and water?",
      answer:
        "A pH-balanced, fragrance-free no-rinse foam cleans and moisturises in one step without the friction of washing and towelling. On aged or fragile skin that reduces mechanical irritation, and for caregivers it removes a rinse-and-dry step from every change.",
    },
    {
      question: "What pack sizes are available for no-rinse cleansing foam?",
      answer:
        "DS CARO supplies DS-CLN-200 (200 ml) for daily use and DS-CLN-500 (500 ml institutional) for facility volume. Facilities typically standardise the 500 ml format for ward use and keep the 200 ml size for home-care or trial distribution.",
    },
  ],
  "oem-private-label-files-for-care-products": [
    {
      question: "What files should an importer prepare for a private label care product?",
      answer:
        "Prepare logo files, label content and language, barcode, carton marks, insert card copy and destination market requirements. Sending these before the sample is produced avoids a second artwork round and shortens the time between quotation and bulk production.",
    },
    {
      question: "When should document status be reviewed for a private label project?",
      answer:
        "Before quotation is finalised. Reviewing document status per SKU at RFQ stage means any testing, translation or packaging file work is priced and scheduled up front instead of surfacing after artwork approval, when it can delay production.",
    },
  ],
}

// ─── Product page FAQ builder ───────────────────────────────────────────────
export interface ProductFaqInput {
  id: string
  name: string
  moq: number
  category: string
  priceLabel?: string
  currency: string
  price: number
}

export function productFaqs(product: ProductFaqInput): AeoFaq[] {
  const priceLine = product.priceLabel
    ? product.priceLabel
    : `${product.currency} ${product.price} per unit`

  return [
    {
      question: `What is the MOQ for ${product.name} (${product.id})?`,
      answer: `${product.name} (${product.id}) starts at ${product.moq} units per SKU. MOQ is confirmed against your chosen packaging type and label scope during quotation, and higher volumes are quoted at better FOB tiers.`,
    },
    {
      question: `What is the FOB price range for ${product.id}?`,
      answer: `${product.id} is quoted as ${priceLine}. Final FOB pricing depends on order volume tier, packaging configuration and loading port, which are all confirmed in the written quotation rather than fixed on this page.`,
    },
    {
      question: `Can ${product.id} be supplied with private label packaging?`,
      answer: `Yes. ${product.id} supports OEM and private label, from a logo label or carton mark change through fully custom retail packaging with your label language and barcode. Feasibility and OEM MOQ are confirmed per SKU before artwork approval.`,
    },
    {
      question: `What is the lead time for ${product.id}?`,
      answer: `Samples for ${product.id} are usually ready in 5–10 days after specification confirmation, and bulk production is commonly 15–35 days after sample and packaging approval. The confirmed schedule is issued with the quotation once scope is locked.`,
    },
    {
      question: `Which documents are available for ${product.id}?`,
      answer: `Document status for ${product.id} is reviewed per SKU and target market during quotation. We confirm which material, safety and packaging files are held for this exact item and flag anything that needs new testing or translation before a bulk order is placed.`,
    },
  ]
}

// ─── Aggregated set for llms.txt ────────────────────────────────────────────
export const llmsFaqs: AeoFaq[] = globalFaqs
