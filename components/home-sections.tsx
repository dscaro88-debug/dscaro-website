"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  buildProductVisualPath,
  featuredProducts,
  formatProductPriceWithUnit,
  productCategories,
} from "@/lib/products"
import { procurementKits } from "@/lib/procurement-kits"
import { homeTranslations } from "@/lib/i18n"
import { useLocale } from "@/components/locale-provider"
import {
  ArrowRight,
  Factory,
  Truck,
  Award,
  FileCheck,
  Shield,
  Globe,
  CheckCircle,
  ChevronRight,
  Star,
  Quote,
  Package,
  Wrench,
  Users,
  Zap,
  Clock,
  BadgeCheck,
} from "lucide-react"
import { blogPosts } from "@/lib/blog"

const localSceneImages = {
  hero: "/images/A_warm__bright_elderly_care_ho_2026-06-10T14-20-16.png",
  trust1: buildProductVisualPath("no-rinse-cleansing-foam-200-cln-200"),
  trust2: buildProductVisualPath("adult-barrier-cream-crm-100"),
  trust3: buildProductVisualPath("no-sting-skin-protectant-spray-100-spr-100"),
  trust4: buildProductVisualPath("incontinence-skin-care-kit-kit-001"),
  importer: buildProductVisualPath("adult-barrier-cream-intensive-repair-crm-101"),
  distributor: buildProductVisualPath("no-rinse-cleansing-foam-500-cln-500"),
}

// =============================================================================
// HERO SECTION — Full-width warm hero with Incontinence Care imagery
// =============================================================================
export function HeroSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="relative min-h-[78vh] flex items-start overflow-hidden">
      {/* Background Image — warm Incontinence Care setting */}
      <div className="absolute inset-0">
        <Image
          src={localSceneImages.hero}
          alt="DS CARO launch visual for adult incontinence skin care sourcing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#352018]/95 via-[#6F4936]/72 to-[#1A365D]/32" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-14 md:pt-20 md:pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {ht.heroBadge}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {ht.heroTitleLead}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C27A] to-[#E67E22]">
              {ht.heroTitleAccent}
            </span>{" "}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
            {ht.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/rfq?source=home-hero-primary">
              <Button size="lg" className="h-12 px-8 text-sm font-semibold bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                {ht.heroCta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-semibold border-white/25 text-white hover:bg-white/10 hover:border-white/40">
                {ht.heroCta2}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
            {ht.heroTrust.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronRight className="h-6 w-6 rotate-90" />
      </div>
    </section>
  )
}

// =============================================================================
// FEATURES BAR — Trust indicators below hero
// =============================================================================
export function FeaturesBar() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  const features = ht.features
  const featureIcons = [Package, Clock, FileCheck, Users]

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {features.map((feature, idx) => {
            const Icon = featureIcons[idx] ?? Package
            return (
            <div key={feature.title} className="py-6 px-4 lg:px-8 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <Icon className="h-6 w-6 text-foreground/70" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// TRUST SECTION — Social proof with images and stats
// =============================================================================
export function TrustSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            {ht.trustEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            {ht.trustTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {ht.trustDesc}
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <Image
              src={localSceneImages.trust1}
              alt="No-rinse cleansing launch SKU visual"
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <Image
              src={localSceneImages.trust2}
              alt="Barrier protection launch category visual"
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <Image
              src={localSceneImages.trust3}
              alt="No-sting skin protectant spray launch SKU visual"
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <Image
              src={localSceneImages.trust4}
              alt="Incontinence skin care kit launch SKU visual"
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t border-border">
          {ht.trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/trade-account">
            <Button size="lg" className="h-12 px-8">
              {ht.trustButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CATEGORIES SECTION — Incontinence Care product categories
// =============================================================================
export function CategoriesSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {ht.categoriesTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {ht.categoriesDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category) => (
            <Link key={category.name} href={`/products/${category.slug}`} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{category.description}</p>
                  <p className="text-xs text-white/80 mt-3">{category.productCount} B2B SKUs</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// FEATURED PRODUCTS — Product showcase with ratings and MOQ
// =============================================================================
export function FeaturedProducts() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  const displayProducts = featuredProducts.slice(0, 4)

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {ht.featuredTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {ht.featuredDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <Card className="overflow-hidden hover-lift border-0 shadow-sm">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {product.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-foreground">{ht.featuredPremium}</span>
                    <span className="text-sm text-muted-foreground">{ht.featuredQuality}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span>{ht.featuredMoq}: {product.moq} units</span>
                  </p>
                  <p className="text-sm font-semibold text-primary mt-1">
                    FOB {formatProductPriceWithUnit(product)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products">
            <Button size="lg" className="h-12 px-8">
              {ht.featuredViewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// RECOMMENDED BUNDLES — Procurement kits for buyer-intent conversion
// =============================================================================
export function RecommendedBundlesSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section id="recommended-bundles" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 text-center sm:items-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {ht.bundlesEyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {ht.bundlesTitle}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {ht.bundlesDesc}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {procurementKits.map((kit) => (
            <Card key={kit.slug} className="h-full border-0 shadow-sm">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {kit.category}
                  </span>
                  <span className="rounded-full bg-[#E67E22]/10 px-3 py-1 text-xs font-semibold text-[#B85613]">
                    {kit.recommendedBadge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {kit.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {kit.description}
                </p>
                <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {ht.bundlesIncluded}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {kit.products.map((product) => (
                      <li key={product.name} className="text-sm">
                        <Link href={product.href} className="font-medium text-foreground hover:text-primary">
                          {product.sku ? `${product.sku} — ` : ""}{product.name}
                        </Link>
                        <span className="block text-xs text-muted-foreground">{product.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{kit.bundlePricing}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Factory className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{kit.oemSupport}</span>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <Link href={`/rfq?kit=${encodeURIComponent(kit.name)}&category=${encodeURIComponent(kit.category)}&oem=Yes`}>
                    <Button className="h-11 w-full bg-[#E67E22] text-white hover:bg-[#D35400]">
                      {ht.bundlesRequest}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// PROCUREMENT SECTION — B2B sourcing clarity without changing the visual system
// =============================================================================
export function ProcurementSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {ht.procurementEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              {ht.procurementTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              {ht.procurementDesc}
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {ht.procurementSteps.map((step, idx) => (
                <Card key={step.title} className="border-0 shadow-sm bg-card">
                  <CardContent className="p-6">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      {idx === 0 && <Package className="h-5 w-5 text-primary" />}
                      {idx === 1 && <FileCheck className="h-5 w-5 text-primary" />}
                      {idx === 2 && <Factory className="h-5 w-5 text-primary" />}
                      {idx === 3 && <Truck className="h-5 w-5 text-primary" />}
                    </div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-0 shadow-sm bg-muted/40">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold text-foreground">{ht.procurementDocTitle}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {ht.procurementDocDesc}
              </p>
              <ul className="space-y-3 mt-6">
                {ht.procurementDocs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3">
                <Link href="/rfq?source=home-procurement-catalog">
                  <Button className="w-full h-11 font-semibold">
                    {ht.procurementCatalogBtn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button variant="outline" className="w-full h-11 font-semibold">
                    {ht.procurementQuoteBtn}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CHOOSE PATH SECTION — B2B customer segmentation (Importers vs Distributors)
// =============================================================================
export function ChoosePathSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {ht.chooseTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {ht.chooseDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* OEM/ODM Path — For Importers */}
          <div className="relative rounded-3xl overflow-hidden bg-muted group">
            <div className="aspect-[16/10] relative">
              <Image
                src={localSceneImages.importer}
                alt="Importer program launch visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#1A365D]/60" />
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-2">
                {ht.importerBadge}
              </span>
              <h3 className="text-2xl font-bold mb-3">{ht.importerTitle}</h3>
              <p className="text-white/80 text-sm mb-4 max-w-md">
                {ht.importerDesc}
              </p>
              <ul className="space-y-2 mb-6">
                {ht.importerItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/for-business">
                <Button className="w-fit bg-white text-foreground hover:bg-white/90">
                  {ht.importerCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Wholesale Path — For Distributors */}
          <div className="relative rounded-3xl overflow-hidden bg-secondary">
            <div className="aspect-[16/10] relative">
              <Image
                src={localSceneImages.distributor}
                alt="Distributor program launch visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#1A365D]/60" />
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                  {ht.distributorBadge}
                </span>
                <span className="px-2 py-0.5 bg-amber-500 text-foreground text-xs font-medium rounded">
                  {ht.distributorPopular}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{ht.distributorTitle}</h3>
              <p className="text-white/80 text-sm mb-4 max-w-md">
                {ht.distributorDesc}
              </p>
              <ul className="space-y-2 mb-6">
                {ht.distributorItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/trade-account">
                  <Button className="bg-white text-foreground hover:bg-white/90">
                    {ht.distributorCta1}
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    {ht.distributorCta2}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SERVICES SECTION — Expert support cards for Incontinence Care
// =============================================================================
export function ServicesSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  const services = ht.services
  const serviceHrefs = ["/for-business", "/for-business", "/for-business", "/contact"]

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {ht.servicesTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {ht.servicesDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Link key={service.title} href={serviceHrefs[idx]} className="group">
              <Card className="h-full hover-lift border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-[#1A365D]/5 flex items-center justify-center mb-4 group-hover:bg-[#1A365D]/10 transition-colors">
                    {idx === 0 && <Factory className="h-6 w-6 text-foreground" />}
                    {idx === 1 && <BadgeCheck className="h-6 w-6 text-foreground" />}
                    {idx === 2 && <Globe className="h-6 w-6 text-foreground" />}
                    {idx === 3 && <Wrench className="h-6 w-6 text-foreground" />}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-foreground group-hover:underline">
                    {service.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// BUYER SCENARIOS SECTION — grounded B2B use cases instead of unverified testimonials
// =============================================================================
export function TestimonialsSection() {
  const { locale } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {ht.testimonialsTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {ht.testimonialsDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ht.testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                <p className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// BLOG PREVIEW SECTION — Latest industry insights
// =============================================================================
export function BlogPreviewSection() {
  const { locale, t } = useLocale()
  const ht = homeTranslations[locale]
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t.blog.title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t.blog.subtitle}
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline">
              {ht.blogViewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article>
                <div className="aspect-[3/2] rounded-xl overflow-hidden bg-muted mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CTA SECTION — Final call to action
// =============================================================================
export function CTASection() {
  const { locale, t } = useLocale()
  const ht = homeTranslations[locale]
  return (
    <section className="section-padding bg-[#1A365D] text-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance">
          {t.cta.title}
        </h2>
        <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
          {t.cta.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/trade-account">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              {t.cta.button1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/rfq">
            <Button size="lg" variant="outline" className="h-12 px-8 border-background/30 text-background hover:bg-background/10">
              {t.cta.button2}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
