export const siteConfig = {
  brandName: "DS CARO",
  legalName: "HUBEI DESHANG INDUSTRY & TRADE CO,.LTD",
  siteUrl: "https://www.dscaro.com",
  rootDomain: "dscaro.com",
  foundedYear: "2012",
  email: "dscaro88@gmail.com",
  phoneDisplay: "+86 133 6749 4665",
  phoneHref: "+8613367494665",
  whatsappNumber: "8613367494665",
  address: {
    display: "Jinhua, Zhejiang, China",
    locality: "Jinhua",
    region: "Zhejiang",
    country: "CN",
  },
  complianceShort:
    "Documentation and labeling requirements can be aligned by SKU and target market",
  complianceLong:
    "Manuals, labels, and market-entry document requirements can be aligned by SKU, target market, and packaging scope.",
  imagePolicy:
    "Product pages should use supplier-authorized photography, self-shot visuals, or clearly marked AI-generated launch placeholders that must be replaced before marketplace upload when authorization is missing.",
  companyIntro:
    "DS CARO is a specialized B2B supplier of adult incontinence skin care, serving nursing homes, assisted living facilities, incontinence care distributors, and home-care channels worldwide. We supply cleansing, barrier protection, and complete care kits, with private-label and OEM/ODM support.",
  productLines: ["Cleansing", "Barrier Protection", "Complete Care Kits"],
  buyerTypes: [
    "nursing homes",
    "assisted living facilities",
    "incontinence care distributors",
    "home-care channels",
    "private-label buyers",
  ],
  serviceMarkets: ["Europe", "United Kingdom", "Germany", "France", "Poland", "North America"],
}

export const whatsappHref = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
