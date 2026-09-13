"use client"

import Link from "next/link"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Factory,
  Package,
  PackageCheck,
  Store,
  Tags,
  Truck,
  Users,
} from "lucide-react"

import type { Product } from "@/lib/products"
import { procurementKits } from "@/lib/procurement-kits"
import { useLocale } from "@/components/locale-provider"
import {
  getLocalizedProduct,
  getLocalizedKit,
  productDetailSections,
  specLabels,
} from "@/lib/product-i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductB2BProcurementProps {
  product: Product
  inquiryHref: string
}

export function ProductStickyQuoteCta({
  product,
  inquiryHref,
}: ProductB2BProcurementProps) {
  const { locale } = useLocale()
  const s = productDetailSections[locale] ?? productDetailSections.en
  return (
    <Link
      href={inquiryHref}
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1A365D] text-sm font-semibold text-white shadow-xl transition hover:bg-[#132844] sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3"
      aria-label={s.stickyQuote.replace("{id}", product.id)}
    >
      <PackageCheck className="h-4 w-4" />
      <span className="hidden sm:inline">{s.stickyQuote.replace("{id}", product.id)}</span>
    </Link>
  )
}

export function BulkProcurementSection({
  product,
  inquiryHref,
}: ProductB2BProcurementProps) {
  const { locale } = useLocale()
  const s = productDetailSections[locale] ?? productDetailSections.en
  const lp = getLocalizedProduct(product, locale)
  const leadKey = specLabels["Lead Time"][locale]
  const packagingKey = specLabels["Packaging"][locale]
  const leadTime = lp.specs[leadKey] || product.specs["Lead Time"] || ""
  const packaging = lp.specs[packagingKey] || product.specs["Packaging"] || ""

  const noteFor = (markup: string) => {
    const m = markup.toLowerCase()
    if (m.includes("fob")) return s.bulkNoteMoj
    if (m.includes("volume")) return s.bulkNoteVolume
    if (m.includes("best")) return s.bulkNoteBest
    return markup
  }

  const pricingRows = product.priceTiers?.length
    ? product.priceTiers.map((tier) => ({
        quantity: tier.quantity,
        price: tier.unitPrice,
        note: noteFor(tier.markup),
      }))
    : [
        { quantity: `${product.moq} units MOQ`, price: product.priceLabel || `${product.currency} ${product.price}`, note: s.bulkNoteMoj },
        { quantity: "500+ units", price: "Request Quote", note: s.bulkNoteVolume },
        { quantity: "1000+ units", price: "Request Quote", note: s.bulkNoteBest },
      ]

  return (
    <section className="section-padding bg-muted/25">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              {s.bulkBadge}
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              {s.bulkTitle.replace("{id}", product.id)}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{s.bulkDesc}</p>
          </div>
          <Link href={inquiryHref}>
            <Button className="h-11 bg-[#E67E22] text-white hover:bg-[#D35400]">
              {s.bulkCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Package className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">{s.bulkMoqLabel}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{product.moq} units</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Clock className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">{s.bulkLeadTimeLabel}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{leadTime}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <Tags className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">{s.bulkPackagingLabel}</p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-foreground">
                {packaging}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="grid border-b border-border bg-[#1A365D] px-5 py-3 text-sm font-semibold text-white md:grid-cols-[1fr_1fr_1.2fr]">
              <span>{s.bulkTableVolume}</span>
              <span className="hidden md:block">{s.bulkTableFob}</span>
              <span className="hidden md:block">{s.bulkTableNote}</span>
            </div>
            <div className="divide-y divide-border">
              {pricingRows.map((row) => (
                <div
                  key={`${row.quantity}-${row.price}`}
                  className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[1fr_1fr_1.2fr] md:items-center"
                >
                  <span className="font-semibold text-foreground">{row.quantity}</span>
                  <span className="font-semibold text-primary">{row.price}</span>
                  <span className="text-muted-foreground">{row.note}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

const buyerIconMap = [Building2, Truck, Users, Store]

export function WhoBuysThisProductSection() {
  const { locale } = useLocale()
  const s = productDetailSections[locale] ?? productDetailSections.en
  const buyers = [
    { title: s.buyerNursingTitle, desc: s.buyerNursingDesc },
    { title: s.buyerDistTitle, desc: s.buyerDistDesc },
    { title: s.buyerAssistedTitle, desc: s.buyerAssistedDesc },
    { title: s.buyerOnlineTitle, desc: s.buyerOnlineDesc },
  ]
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-3">
            {s.whoBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {s.whoTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{s.whoDesc}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {buyers.map((buyer, i) => {
            const Icon = buyerIconMap[i % buyerIconMap.length]
            return (
              <Card key={buyer.title} className="h-full border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{buyer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {buyer.desc}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function OemPrivateLabelProductBlock({
  product,
  inquiryHref,
}: ProductB2BProcurementProps) {
  const { locale } = useLocale()
  const s = productDetailSections[locale] ?? productDetailSections.en
  const lp = getLocalizedProduct(product, locale)
  const oemKey = specLabels["OEM/ODM"][locale]
  const oemScope = lp.specs[oemKey] || product.specs["OEM/ODM"] || ""

  const cards = [
    { title: s.oemCard1Title, desc: s.oemCard1Desc },
    { title: s.oemCard2Title, desc: s.oemCard2Desc },
    { title: s.oemCard3Title, desc: s.oemCard3Desc.replace("{n}", String(product.moq)) },
    { title: s.oemCard4Title, desc: s.oemCard4Desc },
  ]

  return (
    <section className="section-padding bg-[#F8F1E8]">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="mb-4 bg-[#E67E22] text-white">{s.oemBadge}</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              {s.oemTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{s.oemDesc}</p>
            <Link href={`${inquiryHref}&oem=Yes`}>
              <Button className="mt-6 h-11 bg-[#1A365D] text-white hover:bg-[#132844]">
                {s.oemCta.replace("{id}", product.id)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.title} className="border-0 bg-white/80 shadow-sm">
                <CardContent className="p-5">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#E67E22]" />
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{oemScope}</p>
      </div>
    </section>
  )
}

const kitCategorySlugMap: Record<string, string> = {
  Cleansing: "cleansing",
  "Barrier Protection": "barrier-protection",
  "Complete Care Kits": "complete-care-kits",
}

export function ProductProcurementKitsSection({
  product,
}: {
  product: Product
}) {
  const { locale } = useLocale()
  const s = productDetailSections[locale] ?? productDetailSections.en
  const relevantKit =
    procurementKits.find((kit) => kit.category === product.category) || procurementKits[0]
  const orderedKits = [
    relevantKit,
    ...procurementKits.filter((kit) => kit.slug !== relevantKit.slug),
  ]

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              {s.kitsBadge}
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              {s.kitsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{s.kitsDesc}</p>
          </div>
          <Link href="/#recommended-bundles">
            <Button variant="outline" className="h-11">
              {s.kitsViewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {orderedKits.map((kit) => {
            const lk = getLocalizedKit(kit, locale)
            const categoryName = lk.category
            return (
              <Card key={kit.slug} className="h-full border-0 shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge className="bg-[#1A365D] text-white">{lk.name}</Badge>
                    <Badge className="bg-[#E67E22]/10 text-[#B85613]">
                      {s.kitsRecommended}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{categoryName}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {lk.buyerUse}
                  </p>
                  <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {s.kitsBundleLabel}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {kit.products.slice(0, 6).map((item) => (
                        <li key={item.name} className="text-sm">
                          <Link href={item.href} className="font-medium text-foreground hover:text-primary">
                            {item.name}
                          </Link>
                          <span className="block text-xs text-muted-foreground">{item.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{lk.bundlePricing}</span>
                    </div>
                    <div className="flex gap-3">
                      <Factory className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{lk.oemSupport}</span>
                    </div>
                  </div>
                  <Link
                    href={`/rfq?kit=${encodeURIComponent(kit.name)}&category=${encodeURIComponent(kit.category)}&oem=Yes&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`}
                    className="mt-auto pt-6"
                  >
                    <Button className="h-11 w-full bg-[#E67E22] text-white hover:bg-[#D35400]">
                      {s.kitsRequestBundle}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
