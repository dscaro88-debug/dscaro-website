export const siteConfig = {
  brandName: "DS CARO",
  legalName: "HUBEI DESHANG INDUSTRY & TRADE CO,.LTD",
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
    "DS CARO is a specialized supplier of Long-Term Care products, serving nursing homes, assisted living facilities, and care home distributors worldwide. We provide OEM/ODM solutions for dining care, resident management, and daily care supplies.",
}

export const whatsappHref = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
