export interface ProcurementDecisionPage {
  slug: string
  title: string
  eyebrow: string
  description: string
  reassurance: string[]
  process: Array<{
    title: string
    desc: string
  }>
  moq: string
  timeline: string
  cta: string
}

export const procurementDecisionPages: Record<string, ProcurementDecisionPage> = {
  "why-dscaro": {
    slug: "why-dscaro",
    title: "Why Long-Term Care Buyers Choose DS CARO",
    eyebrow: "Supplier Reassurance",
    description:
      "DS CARO is built for B2B long-term care supply: product selection, MOQ clarity, OEM packaging, and SKU-level documentation support for nursing homes, distributors, assisted living buyers, and online sellers.",
    reassurance: [
      "Focused product scope: dining care, mobility support, and daily care supplies.",
      "B2B-first RFQ flow with MOQ, bulk pricing tiers, lead time, and packaging options.",
      "OEM/private label support for distributors and care-supply brands.",
      "SKU-level document status review before buyers commit to large orders.",
    ],
    process: [
      {
        title: "Define procurement scope",
        desc: "Confirm buyer type, target product category, quantity, destination country, and OEM requirement.",
      },
      {
        title: "Shortlist SKUs or kits",
        desc: "Choose single products or care-facility bundles for dining, mobility, or daily care procurement.",
      },
      {
        title: "Review quote and file status",
        desc: "We reply with MOQ, FOB range, sample plan, packaging options, and available document status by SKU.",
      },
      {
        title: "Move to sample or production",
        desc: "Confirm sample, packaging artwork, label language, carton details, and production schedule.",
      },
    ],
    moq: "Most launch SKUs start from practical MOQ ranges such as 60 units/bags, with better pricing for 500+ and 1000+ planning where applicable.",
    timeline:
      "Typical sample preparation is 5-10 days where available. Bulk production is commonly 15-35 days after sample and packaging approval, depending on SKU and order quantity.",
    cta: "Request DS CARO Procurement Quote",
  },
  "how-to-order-bulk": {
    slug: "how-to-order-bulk",
    title: "How to Order Long-Term Care Supplies in Bulk",
    eyebrow: "Bulk Ordering Process",
    description:
      "A practical ordering path for nursing homes, care distributors, assisted living operators, clinics, and online sellers sourcing long-term care supplies.",
    reassurance: [
      "Start with a clear RFQ: buyer type, category, quantity, country, and urgency.",
      "Use procurement kits when you need a complete first-order range instead of one SKU.",
      "FOB pricing is reviewed by order tier, packing method, and customization scope.",
      "Repeat order planning can be arranged after the first shipment and buyer feedback.",
    ],
    process: [
      {
        title: "Send bulk RFQ",
        desc: "Use the RFQ form to provide product category, SKU, monthly volume, destination country, and urgency.",
      },
      {
        title: "Confirm MOQ and price tier",
        desc: "We clarify MOQ, 60 / 500 / 1000+ quote logic where applicable, and packaging cost impact.",
      },
      {
        title: "Approve sample and packaging",
        desc: "Approve product sample, size, color, logo, label, insert card, carton mark, and document requirements.",
      },
      {
        title: "Production and shipment",
        desc: "Production begins after confirmation. We prepare carton information and shipment coordination for export.",
      },
    ],
    moq: "MOQ depends on SKU and packaging. For launch products, RFQ pages show the current MOQ reference before inquiry.",
    timeline:
      "Quote reply target: within 1 business day. Sample: usually 5-10 days. Bulk order: usually 15-35 days after final approval.",
    cta: "Start Bulk RFQ",
  },
  "oem-private-label-process": {
    slug: "oem-private-label-process",
    title: "OEM & Private Label Process for Care Supply Buyers",
    eyebrow: "Private Label Supply",
    description:
      "DS CARO supports distributors, online sellers, and care-supply brands with logo labels, packaging customization, carton marks, inserts, and SKU-level product files.",
    reassurance: [
      "OEM scope can start from simple label and carton customization.",
      "Private-label packaging can be matched to distributor, care facility, or marketplace requirements.",
      "Product files and document status are reviewed by SKU before marketplace or tender use.",
      "Mixed-SKU kit quotes can reduce buyer workload when building a new product range.",
    ],
    process: [
      {
        title: "Confirm brand scope",
        desc: "Tell us logo, color, label language, packaging type, barcode, insert, and target market.",
      },
      {
        title: "Check SKU feasibility",
        desc: "We confirm whether the chosen product supports custom label, carton, retail bag, or other packaging changes.",
      },
      {
        title: "Sample and artwork approval",
        desc: "Approve sample, logo placement, label content, carton marks, and final packaging file.",
      },
      {
        title: "Bulk production",
        desc: "Once sample and artwork are approved, production timeline is confirmed and order preparation begins.",
      },
    ],
    moq: "OEM MOQ varies by SKU and packaging type. Simple label or carton changes may start lower than fully custom retail packaging.",
    timeline:
      "OEM preparation usually adds artwork confirmation time before sample or bulk production. Bulk lead time is confirmed after packaging approval.",
    cta: "Discuss OEM Project",
  },
  "quality-certifications": {
    slug: "quality-certifications",
    title: "Quality, Materials, and Certification File Review",
    eyebrow: "Quality Assurance",
    description:
      "Long-term care buyers need clear material, packaging, and document status before procurement. DS CARO reviews product-level documentation by SKU and target market.",
    reassurance: [
      "Material safety requests such as RoHS / REACH file review can be discussed by SKU.",
      "Non-medical classification is clarified where products are care supplies rather than regulated medical devices.",
      "Packaging labels, manuals, and market-entry document needs can be aligned during RFQ review.",
      "Document availability is not assumed: it is checked against the exact SKU and supplier file status.",
    ],
    process: [
      {
        title: "Share target market",
        desc: "Tell us destination country, buyer channel, and any document requirements from your customer or marketplace.",
      },
      {
        title: "Review SKU documentation",
        desc: "We check available test files, material statements, labels, manuals, and supplier documentation by SKU.",
      },
      {
        title: "Align classification",
        desc: "Care-supply items are reviewed as non-medical products unless a specific SKU requires another pathway.",
      },
      {
        title: "Confirm production file package",
        desc: "Before bulk production, confirm label language, carton information, packing list, and requested file status.",
      },
    ],
    moq: "MOQ and document preparation are reviewed together, because some tests or packaging files may depend on order quantity and target market.",
    timeline:
      "Basic file status can usually be reviewed during quotation. New testing, label translation, or packaging file preparation may extend the timeline.",
    cta: "Request File Review",
  },
}

export const procurementDecisionPageList = Object.values(procurementDecisionPages)
