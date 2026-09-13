import { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  allProducts,
  formatProductPriceWithUnit,
} from "@/lib/products"
import { siteConfig } from "@/lib/site-config"
import { ProductDetailView } from "@/components/product-detail-view"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = allProducts.find((p) => p.slug === slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  const priceSummary = formatProductPriceWithUnit(product)

  return {
    title: `${product.name} — ${product.category} | DS CARO`,
    description: `${product.description} MOQ: ${product.moq} units. FOB quote: ${priceSummary}. ${siteConfig.complianceShort}.`,
    openGraph: {
      title: `${product.name} — ${product.category} | DS CARO`,
      description: `${product.description} MOQ: ${product.moq} units. FOB quote: ${priceSummary}.`,
      images: product.images.slice(0, 1),
      url: `/products/${slug}`,
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = allProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const inquiryHref = `/rfq?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.id)}&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`
  const specSheetHref = `/rfq?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.id)}&request=${encodeURIComponent("spec-sheet")}&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`
  // whatsappHref is built client-side (localized) inside ProductDetailView

  const priceRangeMatch = product.priceLabel?.match(
    /(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/
  )
  const productUrl = `${siteConfig.siteUrl}/products/${product.slug}`
  const productImages = product.images.map((img) => new URL(img, siteConfig.siteUrl).toString())

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: productUrl,
    mainEntityOfPage: productUrl,
    sku: product.id,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    manufacturer: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.siteUrl },
    category: product.category,
    audience: siteConfig.buyerTypes.map((buyerType) => ({
      "@type": "BusinessAudience",
      audienceType: buyerType,
    })),
    offers: priceRangeMatch
      ? {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          priceCurrency: product.currency,
          url: productUrl,
          eligibleQuantity: { "@type": "QuantitativeValue", value: product.moq, unitCode: "C62" },
          seller: { "@type": "Organization", name: siteConfig.brandName, url: siteConfig.siteUrl },
          lowPrice: Number(priceRangeMatch[1]),
          highPrice: Number(priceRangeMatch[2]),
          offerCount: product.priceTiers?.length || 1,
        }
      : {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: product.currency,
          url: productUrl,
          eligibleQuantity: { "@type": "QuantitativeValue", value: product.moq, unitCode: "C62" },
          seller: { "@type": "Organization", name: siteConfig.brandName, url: siteConfig.siteUrl },
          price: product.price,
        },
    additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
    image: productImages,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailView
        product={product}
        related={relatedProducts}
        inquiryHref={inquiryHref}
        specSheetHref={specSheetHref}
      />
    </>
  )
}
