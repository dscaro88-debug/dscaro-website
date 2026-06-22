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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductB2BProcurementProps {
  product: Product
  inquiryHref: string
}

const getSpec = (product: Product, key: string, fallback: string) =>
  product.specs[key] || fallback

const buyerProfiles = [
  {
    icon: Building2,
    title: "Nursing Homes",
    desc: "Dining rooms, resident care routines, bedding replenishment, and recurring facility purchasing.",
  },
  {
    icon: Truck,
    title: "Distributors",
    desc: "Wholesale range building, mixed SKU cartons, regional inventory programs, and private-label resale.",
  },
  {
    icon: Users,
    title: "Assisted Living Facilities",
    desc: "Dignified daily-care products for residents, care staff workflows, and room-level replenishment.",
  },
  {
    icon: Store,
    title: "Online Sellers",
    desc: "SKU-level photos, packaging options, barcode discussion, and marketplace-ready product files.",
  },
]

function pricingRows(product: Product) {
  if (product.priceTiers && product.priceTiers.length > 0) {
    return product.priceTiers.map((tier) => ({
      quantity: tier.quantity,
      price: tier.unitPrice,
      note: tier.markup,
    }))
  }

  return [
    {
      quantity: `${product.moq} units MOQ`,
      price: product.priceLabel || `${product.currency} ${product.price}`,
      note: "MOQ reference",
    },
    { quantity: "500+ units", price: "Request Quote", note: "volume pricing" },
    { quantity: "1000+ units", price: "Request Quote", note: "best bulk quote" },
  ]
}

export function ProductStickyQuoteCta({
  product,
  inquiryHref,
}: ProductB2BProcurementProps) {
  return (
    <Link
      href={inquiryHref}
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1A365D] text-sm font-semibold text-white shadow-xl transition hover:bg-[#132844] sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3"
      aria-label={`Request quote for ${product.id}`}
    >
      <PackageCheck className="h-4 w-4" />
      <span className="hidden sm:inline">Quote {product.id}</span>
    </Link>
  )
}

export function BulkProcurementSection({
  product,
  inquiryHref,
}: ProductB2BProcurementProps) {
  const leadTime = getSpec(product, "Lead Time", "20-35 days after sample approval")
  const packaging = getSpec(
    product,
    "Packaging",
    "Neutral carton, DS CARO carton, private label packaging, retail sleeve, or bulk carton"
  )

  return (
    <section className="section-padding bg-muted/25">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              Bulk Procurement
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Procurement Details for {product.id}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Built for RFQ review: MOQ, bulk price tiers, production timing, and packaging options are summarized before you contact sales.
            </p>
          </div>
          <Link href={inquiryHref}>
            <Button className="h-11 bg-[#E67E22] text-white hover:bg-[#D35400]">
              Request Quote for This Product
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Package className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">Minimum Order Quantity</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{product.moq} units</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Clock className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">Lead Time</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{leadTime}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <Tags className="mb-4 h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">Packaging Options</p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-foreground">
                {packaging}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="grid border-b border-border bg-[#1A365D] px-5 py-3 text-sm font-semibold text-white md:grid-cols-[1fr_1fr_1.2fr]">
              <span>Order Volume</span>
              <span className="hidden md:block">FOB / Quote Basis</span>
              <span className="hidden md:block">Procurement Note</span>
            </div>
            <div className="divide-y divide-border">
              {pricingRows(product).map((row) => (
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

export function WhoBuysThisProductSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-3">
            Buyer Fit
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Who Buys This Product
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            DS CARO product pages are structured around real long-term care purchasing use cases, not consumer browsing.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {buyerProfiles.map((buyer) => {
            const Icon = buyer.icon
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
  const oemScope = getSpec(
    product,
    "OEM/ODM",
    "Logo, color, packaging, insert, barcode and marketplace content support available"
  )

  return (
    <section className="section-padding bg-[#F8F1E8]">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="mb-4 bg-[#E67E22] text-white">OEM / Private Label</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Private-Label Ready for B2B Buyers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Use this SKU for your own care-supply brand, distributor catalog, nursing-home supply program, or marketplace listing. We confirm MOQ, sample timing, packaging structure, and file requirements by target market.
            </p>
            <Link href={`${inquiryHref}&oem=Yes`}>
              <Button className="mt-6 h-11 bg-[#1A365D] text-white hover:bg-[#132844]">
                Discuss OEM for {product.id}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Logo & label", "Logo label, wash label, size sticker, barcode, and language label discussion."],
              ["Packaging", "Neutral, DS CARO, private carton, retail bag, insert card, or bulk carton."],
              ["MOQ clarity", `${product.moq} units MOQ reference. Mixed-SKU cartons can be reviewed by kit.`],
              ["File support", "Product photos, specifications, carton info, and document status reviewed by SKU."],
            ].map(([title, desc]) => (
              <Card key={title} className="border-0 bg-white/80 shadow-sm">
                <CardContent className="p-5">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#E67E22]" />
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
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

export function ProductProcurementKitsSection({
  product,
}: {
  product: Product
}) {
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
              Recommended Kits
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Add This SKU to a Procurement Bundle
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Increase order value and simplify purchasing by quoting this product as part of a care-facility kit.
            </p>
          </div>
          <Link href="/#recommended-bundles">
            <Button variant="outline" className="h-11">
              View All Kits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {orderedKits.map((kit) => (
            <Card key={kit.slug} className="h-full border-0 shadow-sm">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className="bg-[#1A365D] text-white">{kit.name}</Badge>
                  <Badge className="bg-[#E67E22]/10 text-[#B85613]">
                    Recommended for nursing homes
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground">{kit.category}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {kit.buyerUse}
                </p>
                <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    3-6 SKU bundle
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
                    <span>{kit.bundlePricing}</span>
                  </div>
                  <div className="flex gap-3">
                    <Factory className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{kit.oemSupport}</span>
                  </div>
                </div>
                <Link
                  href={`/rfq?kit=${encodeURIComponent(kit.name)}&category=${encodeURIComponent(kit.category)}&oem=Yes&sourcePage=${encodeURIComponent(`/products/${product.slug}`)}`}
                  className="mt-auto pt-6"
                >
                  <Button className="h-11 w-full bg-[#E67E22] text-white hover:bg-[#D35400]">
                    Request Bundle Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
