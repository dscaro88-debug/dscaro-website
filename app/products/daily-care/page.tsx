import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { allProducts, formatProductPrice } from "@/lib/products"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Daily Care Supplies for Long-Term Care — Bed Pads, Protectors, Towels | DS CARO",
  description:
    "B2B wholesale Daily Care Supplies: disposable underpads, washable bed pads, waterproof mattress protectors, care towels, and hygiene supplies for nursing homes and assisted living. OEM/ODM available.",
  openGraph: {
    title: "Daily Care Supplies for Nursing Homes | DS CARO",
    description:
      "Washable bed pads, waterproof protectors, and daily care supplies for long-term care facilities. OEM/ODM with flexible order quantities.",
  },
}

export const dynamic = "force-dynamic"

const products = allProducts.filter((product) => product.category === "Daily Care Supplies")

const formatMoq = (product: (typeof products)[number]) =>
  product.priceLabel?.toLowerCase().includes("bag")
    ? `MOQ ${product.moq} bags`
    : `MOQ ${product.moq} units`

export default function DailyCarePage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-10 md:py-14 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <span className="text-4xl mb-3 block">🛏️</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Daily Care Supplies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Bedding protection and daily hygiene supplies for long-term care facilities — supporting care routines with practical, durable products.
          </p>
          <Badge className="text-sm">
            {products.length} Products — OEM/ODM Available
          </Badge>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {products.map((product) => {
              const heroImage = product.images[0]
              const hasMultipleImages = product.images.length > 1

              return (
                <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-white overflow-hidden">
                    {heroImage ? (
                      <Image
                        src={heroImage}
                        alt={product.name}
                        fill
                        className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={product.id === "DS-DCR-001"}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Image pending
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        SKU: {product.id}
                      </Badge>
                      {hasMultipleImages && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Real Photos
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2">
                        {formatMoq(product)}
                      </Badge>
                      <h2 className="text-lg font-semibold">
                        <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {product.priceTiers && product.priceTiers.length > 0 ? (
                      <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground mb-3">FOB Tiered Pricing</p>
                        <div className="space-y-2">
                          {product.priceTiers.map((tier) => (
                            <div key={tier.quantity} className="flex items-center justify-between gap-4 text-sm">
                              <span className="text-muted-foreground">{tier.quantity}</span>
                              <span className="font-semibold text-primary text-right">{tier.unitPrice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg font-semibold text-primary">
                          {formatProductPrice(product)}
                        </span>
                      </div>
                    )}

                    {product.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 5).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex gap-3">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Link href="/rfq" className="flex-1">
                        <Button className="w-full">
                          Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Bulk Bedding Protection for Care Facilities
          </h2>
          <p className="text-muted-foreground mb-8">
            We supply nursing home chains, assisted living communities, and care distributors with Daily Care Supplies for hygiene, incontinence, and bedding protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Request Quote
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button variant="outline" size="lg">
                Apply for Trade Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
