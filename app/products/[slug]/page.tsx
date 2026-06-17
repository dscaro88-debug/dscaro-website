import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  allProducts,
  formatProductPrice,
  formatProductPriceWithUnit,
  productCategories,
} from "@/lib/products"
import { siteConfig, whatsappHref as buildWhatsappHref } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductGallery } from "@/components/product-gallery"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft,
  Package,
  Check,
  Mail,
  Shield,
  Truck,
  Clock,
  Award,
  ChevronRight,
  FileText,
  MessageCircle,
} from "lucide-react"

const featureIcons = [Shield, Truck, Clock, Award, Package, Check]

const formatUnits = (value: number) => `${value} ${value === 1 ? "unit" : "units"}`

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

  const categorySlug = productCategories.find(
    (c) => c.name === product.category
  )?.slug
  const priceSummary = formatProductPriceWithUnit(product)

  return {
    title: `${product.name} — ${product.category} | DS CARO`,
    description: `${product.description} MOQ: ${formatUnits(product.moq)}. FOB quote: ${priceSummary}. ${siteConfig.complianceShort}.`,
    openGraph: {
      title: `${product.name} — ${product.category} | DS CARO`,
      description: `${product.description} MOQ: ${formatUnits(product.moq)}. FOB quote: ${priceSummary}.`,
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

  const categorySlug = productCategories.find(
    (c) => c.name === product.category
  )?.slug
  const priceRangeMatch = product.priceLabel?.match(
    /(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/
  )
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const displayPrice = formatProductPrice(product)
  const displayPriceWithUnit = formatProductPriceWithUnit(product)

  const inquiryHref = `/rfq?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.id)}&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`
  const specSheetHref = `/rfq?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.id)}&request=${encodeURIComponent("spec-sheet")}&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`
  const whatsappHref = buildWhatsappHref(
    `Hi DS CARO, I want B2B pricing for ${product.name} (${product.id}). Please send MOQ, lead time, available model-level documentation, and OEM/private label options.`
  )

  // JSON-LD structured data for Product
  const buyingSteps = [
    {
      title: "1. Request Quote",
      desc: "Send SKU, target country, quantity, and packaging needs. We reply with MOQ, FOB price, lead time, and document status.",
    },
    {
      title: "2. Confirm Sample",
      desc: "Approve sample, product color, logo, packaging, instruction sheet, and compliance document requirements.",
    },
    {
      title: "3. Bulk Production",
      desc: "We prepare production updates, carton details, inspection photos, and export documents for your shipment.",
    },
    {
      title: "4. Reorder & Upgrade",
      desc: "After first shipment, we review market feedback and recommend add-on SKUs or bundle upgrades for repeat orders.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    category: product.category,
    offers: {
      "@type": priceRangeMatch ? "AggregateOffer" : "Demand",
      availability: "https://schema.org/InStock",
      ...(priceRangeMatch
        ? {
            lowPrice: Number(priceRangeMatch[1]),
            highPrice: Number(priceRangeMatch[2]),
          }
        : { price: product.price }),
      priceCurrency: product.currency,
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: product.moq,
        unitCode: "C62",
      },
    },
    image: product.images,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="container-wide pt-6 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {categorySlug ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/products/${categorySlug}`}>
                      {product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.category}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Back Link */}
      <div className="container-wide pb-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Hero Section */}
      <section className="pb-12 md:pb-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Product Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Right: Product Info */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">
                  {product.category}
                </Badge>
                {product.launchBatch === "P1" ? (
                  <Badge className="bg-primary text-primary-foreground">
                    P1 Launch SKU
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    P2 Expansion SKU
                  </Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                {product.images.length > 1
                  ? "Real product photography from supplier — multiple angles and color variants available."
                  : "Current gallery is prepared for export-market launch presentation with DS CARO product visuals."}
              </div>

              {/* Price & MOQ */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">
                    FOB Price:
                  </span>
                  <span className="text-2xl font-bold text-primary font-serif ml-1">
                    {displayPrice}
                    <span className="text-sm font-normal text-muted-foreground">
                      / unit
                    </span>
                  </span>
                  {product.priceNote ? (
                    <p className="mt-2 text-xs text-muted-foreground max-w-md">
                      {product.priceNote}
                    </p>
                  ) : null}
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-medium h-7 px-3"
                >
                  <Package className="h-3 w-3 mr-1" />
                  MOQ: {formatUnits(product.moq)}
                </Badge>
              </div>

              {/* Tiered Pricing Table */}
              {product.priceTiers && product.priceTiers.length > 0 && (
                <div className="mb-8 rounded-xl border border-border overflow-hidden">
                  <div className="bg-primary/5 px-4 py-2 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">Tiered Pricing — Supplier Cost + Markup</p>
                  </div>
                  <div className="divide-y divide-border">
                    {product.priceTiers.map((tier) => (
                      <div key={tier.quantity} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <span className="text-sm font-medium text-foreground">{tier.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">{tier.markup}</Badge>
                          <span className="text-lg font-bold text-primary">{tier.unitPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <ul className="space-y-2.5 mb-8">
                {product.features.slice(0, 6).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href={inquiryHref}>
                  <Button size="lg" className="h-12 w-full px-6 sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                </Link>
                <Link href={specSheetHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full px-6 sm:w-auto"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Request Spec Sheet
                  </Button>
                </Link>
                <Link href={whatsappHref} target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full px-6 sm:w-auto"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Sales
                  </Button>
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Documentation and launch notes</p>
                <p className="mt-2">{siteConfig.complianceLong}</p>
                <p className="mt-2">{siteConfig.imagePolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            Technical Specifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {Object.entries(product.specs).map(([key, value]) => (
              <Card key={key} className="border-border/50">
                <CardContent className="p-5 flex justify-between items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {value}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Buying Path */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">
              B2B Buying Path
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              From Product Shortlist to Repeat Orders
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Each product page is connected to a practical sourcing flow for distributors, importers, care facilities, and private-label buyers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buyingSteps.map((step) => (
              <Card key={step.title} className="border-border/50 h-full">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length]
              return (
                <Card
                  key={i}
                  className="border-border/50 hover:border-primary/20 transition-colors"
                >
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium pt-2">
                      {feature}
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                You May Also Like
              </Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Related Products
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Explore more products from the {product.category} category.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover-lift border-0 shadow-sm h-full">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={related.images[0]}
                        alt={related.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                          {related.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {related.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs font-medium text-muted-foreground">
                          MOQ: {formatUnits(related.moq)}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {formatProductPrice(related)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-[#1A365D] text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E67E22]/80 via-[#1A365D] to-[#1A365D]" />
        <div className="relative container-wide text-center max-w-2xl mx-auto">
          <Mail className="h-12 w-12 text-primary/40 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Interested in Bulk Ordering?
          </h2>
          <p className="text-background/70 text-lg mb-8">
            Get a custom quote for the {product.name}. We offer competitive B2B
            pricing with flexible MOQ and OEM/ODM customization options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={inquiryHref}>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 w-full px-8 sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                Request a Quote
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={whatsappHref} target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full px-8 border-background/30 text-background hover:bg-background/10 sm:w-auto"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp This SKU
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full px-8 border-background/30 text-background hover:bg-background/10 sm:w-auto"
              >
                Apply for Trade Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
