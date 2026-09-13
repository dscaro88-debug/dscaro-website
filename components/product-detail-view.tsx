"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { whatsappHref as buildWhatsappHref } from "@/lib/site-config"
import { rfqTranslations } from "@/lib/rfq-i18n"
import {
  getLocalizedProduct,
  getLocalizedCategory,
  productPageTranslations,
} from "@/lib/product-i18n"
import { type Product, productCategories, formatProductPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductGallery } from "@/components/product-gallery"
import { ProductQuotePanel } from "@/components/conversion/quote-conversion-system"
import {
  BulkProcurementSection,
  OemPrivateLabelProductBlock,
  ProductProcurementKitsSection,
  ProductStickyQuoteCta,
  WhoBuysThisProductSection,
} from "@/components/product-b2b-procurement"
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

interface ProductDetailViewProps {
  product: Product
  related: Product[]
  inquiryHref: string
  specSheetHref: string
}

export function ProductDetailView({
  product,
  related,
  inquiryHref,
  specSheetHref,
}: ProductDetailViewProps) {
  const { locale } = useLocale()
  const p = productPageTranslations[locale] ?? productPageTranslations.en
  const rfq = rfqTranslations[locale] ?? rfqTranslations.en

  const lp = getLocalizedProduct(product, locale)
  const categoryObj = productCategories.find((c) => c.name === product.category)
  const categorySlug = categoryObj?.slug
  const localizedCategoryName = categoryObj ? getLocalizedCategory(categoryObj, locale).name : product.category

  const displayPrice = formatProductPrice(product)
  const showPerUnit = !/\//.test(displayPrice)

  const whatsappHref = buildWhatsappHref(rfq.whatsappMessage)

  const unitWord = (n: number) =>
    (n === 1 ? p.moqOne : p.moqMany).split("{n}")[1]?.trim() ?? ""

  const buyingSteps = [
    { title: p.step1Title, desc: p.step1Desc },
    { title: p.step2Title, desc: p.step2Desc },
    { title: p.step3Title, desc: p.step3Desc },
    { title: p.step4Title, desc: p.step4Desc },
  ]

  const relatedLocalized = related.map((r) => getLocalizedProduct(r, locale))

  return (
    <>
      <ProductStickyQuoteCta product={product} inquiryHref={inquiryHref} />

      {/* Breadcrumb */}
      <div className="container-wide pt-6 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{p.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">{p.products}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {categorySlug ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/products/${categorySlug}`}>{localizedCategoryName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage>{localizedCategoryName}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{lp.name}</BreadcrumbPage>
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
          {p.backToProducts}
        </Link>
      </div>

      {/* Product Hero Section */}
      <section className="pb-12 md:pb-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery images={product.images} productName={lp.name} />

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{localizedCategoryName}</Badge>
                <Badge className="bg-primary text-primary-foreground">
                  SKU: {product.id}
                </Badge>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {lp.name}
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {lp.description}
              </p>

              <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                {product.images.length > 1 ? p.galleryMulti : p.gallerySingle}
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">{p.fobPrice}:</span>
                  <span className="text-2xl font-bold text-primary font-serif ml-1">
                    {displayPrice}
                    {showPerUnit ? (
                      <span className="text-sm font-normal text-muted-foreground">{p.perUnit}</span>
                    ) : null}
                  </span>
                  {product.priceNote ? (
                    <p className="mt-2 text-xs text-muted-foreground max-w-md">{product.priceNote}</p>
                  ) : null}
                </div>
                <Badge variant="outline" className="text-xs font-medium h-7 px-3">
                  <Package className="h-3 w-3 mr-1" />
                  MOQ: {product.moq}
                  {unitWord(product.moq)}
                </Badge>
              </div>

              {product.priceTiers && product.priceTiers.length > 0 && (
                <div className="mb-8 rounded-xl border border-border overflow-hidden">
                  <div className="bg-primary/5 px-4 py-2 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{p.volumePricing}</p>
                  </div>
                  <div className="divide-y divide-border">
                    {product.priceTiers.map((tier) => (
                      <div key={tier.quantity} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <span className="text-sm font-medium text-foreground">{tier.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">{tier.unitPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-2.5 mb-8">
                {lp.features.slice(0, 6).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link href={inquiryHref}>
                  <Button size="lg" className="h-12 w-full px-6 sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    {p.requestQuote}
                  </Button>
                </Link>
                <Link href={specSheetHref}>
                  <Button size="lg" variant="outline" className="h-12 w-full px-6 sm:w-auto">
                    <FileText className="mr-2 h-4 w-4" />
                    {p.requestSpecSheet}
                  </Button>
                </Link>
                <Link href={whatsappHref} target="_blank">
                  <Button size="lg" variant="outline" className="h-12 w-full px-6 sm:w-auto">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {p.whatsappSales}
                  </Button>
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{p.docNotes}</p>
                <p className="mt-2">{p.complianceLong}</p>
                <p className="mt-2">{p.imagePolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BulkProcurementSection product={product} inquiryHref={inquiryHref} />

      <WhoBuysThisProductSection />

      <OemPrivateLabelProductBlock product={product} inquiryHref={inquiryHref} />

      <ProductProcurementKitsSection product={product} />

      <ProductQuotePanel
        productName={lp.name}
        sku={product.id}
        category={localizedCategoryName}
        moq={product.moq}
        sourcePage={`/products/${product.slug}`}
      />

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{p.technicalSpecs}</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {Object.entries(lp.specs).map(([key, value]) => (
              <Card key={key} className="border-border/50">
                <CardContent className="p-5 flex justify-between items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">{key}</span>
                  <span className="text-sm font-semibold text-foreground text-right">{value}</span>
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
            <Badge variant="secondary" className="mb-3">{p.buyingPathBadge}</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{p.buyingPathTitle}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{p.buyingPathDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buyingSteps.map((step) => (
              <Card key={step.title} className="border-border/50 h-full">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{p.keyFeatures}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lp.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length]
              return (
                <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium pt-2">{feature}</span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedLocalized.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">{p.youMayAlsoLike}</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{p.relatedProducts}</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                {p.relatedDesc.replace("{category}", localizedCategoryName)}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedLocalized.map((rel) => (
                <Link key={rel.id} href={`/products/${rel.slug}`} className="group">
                  <Card className="overflow-hidden hover-lift border-0 shadow-sm h-full">
                    <div className="relative aspect-square bg-muted">
                      <Image src={rel.images[0]} alt={rel.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground text-xs font-medium">{localizedCategoryName}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{rel.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{rel.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs font-medium text-muted-foreground">MOQ: {rel.moq}{unitWord(rel.moq)}</span>
                        <span className="text-sm font-semibold text-primary">{formatProductPrice(rel)}</span>
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{p.interestedBulk}</h2>
          <p className="text-background/70 text-lg mb-8">
            {p.interestedBulkDesc.replace("{product}", lp.name)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={inquiryHref}>
              <Button size="lg" variant="secondary" className="h-12 w-full px-8 sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                {p.requestAQuote}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={whatsappHref} target="_blank">
              <Button size="lg" variant="outline" className="h-12 w-full px-8 border-background/30 text-background hover:bg-background/10 sm:w-auto">
                <MessageCircle className="mr-2 h-4 w-4" />
                {p.whatsappThisSku}
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button size="lg" variant="outline" className="h-12 w-full px-8 border-background/30 text-background hover:bg-background/10 sm:w-auto">
                {p.applyTradeAccount}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
