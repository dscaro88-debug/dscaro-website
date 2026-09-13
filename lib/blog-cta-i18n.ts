import type { Locale } from "@/lib/i18n"

// DS CARO — Blog "Related Products" CTA wrapper copy (de/es/fr/pt/pl + en/ja fallback)
export const blogCtaContent: Record<
  Locale,
  { heading: string; desc: string; requestQuote: string; viewProducts: string }
> = {
  en: {
    heading: "Related Products",
    desc: "Explore our three product lines for incontinence skin care.",
    requestQuote: "Request a Quote",
    viewProducts: "View products",
  },
  ja: {
    heading: "関連製品",
    desc: "失禁スキンケアの3つの製品ラインをご覧ください。",
    requestQuote: "見積りを依頼する",
    viewProducts: "製品を見る",
  },
  de: {
    heading: "Verwandte Produkte",
    desc: "Entdecken Sie unsere drei Produktlinien für die Inkontinenz-Hautpflege.",
    requestQuote: "Angebot anfordern",
    viewProducts: "Produkte ansehen",
  },
  es: {
    heading: "Productos relacionados",
    desc: "Explore nuestras tres líneas de productos para el cuidado de la piel por incontinencia.",
    requestQuote: "Solicitar cotización",
    viewProducts: "Ver productos",
  },
  fr: {
    heading: "Produits associés",
    desc: "Découvrez nos trois gammes de produits pour les soins de la peau liés à l'incontinence.",
    requestQuote: "Demander un devis",
    viewProducts: "Voir les produits",
  },
  pt: {
    heading: "Produtos relacionados",
    desc: "Explore as nossas três linhas de produtos para o cuidado da pele na incontinência.",
    requestQuote: "Solicitar orçamento",
    viewProducts: "Ver produtos",
  },
  pl: {
    heading: "Powiązane produkty",
    desc: "Poznaj nasze trzy linie produktów do pielęgnacji skóry przy inkontynencji.",
    requestQuote: "Poproś o wycenę",
    viewProducts: "Zobacz produkty",
  },
}
