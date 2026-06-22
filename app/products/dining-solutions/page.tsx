import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getDiningListing } from "@/lib/din-catalog"
import { formatProductPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "Dining Solutions for Long-Term Care — Adult Bibs, Clothing Protectors | DS CARO",
  description:
    "B2B wholesale dining care products: reusable adult bibs, waterproof clothing protectors, crumb catcher bibs, and wheelchair dining aprons for nursing homes and assisted living. OEM/ODM available.",
  openGraph: {
    title: "Dining Solutions for Nursing Homes & Long-Term Care | DS CARO",
    description:
      "Adult bibs, clothing protectors, and dining aprons for skilled nursing facilities and assisted living. OEM/ODM with flexible MOQ.",
  },
}

export default function DiningSolutionsPage() {
  const listing = getDiningListing()
  const realCount = listing.filter((e) => e.kind === "real").length

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-10 md:py-14 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <span className="text-4xl mb-3 block">🍽️</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Dining Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Specialized dining protection products for nursing homes, assisted living, and memory care facilities — preserving dignity at every meal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge className="text-sm">
              {listing.length} SKUs in catalog
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {realCount} with verified data
            </Badge>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listing.map((entry) => {
              if (entry.kind === "pending") {
                return (
                  <Card key={entry.id} className="overflow-hidden border-0 shadow-sm">
                    <div className="aspect-[4/3] bg-muted/40 flex flex-col items-center justify-center text-center px-6">
                      <Badge variant="outline" className="mb-3">
                        {entry.id}
                      </Badge>
                      <p className="text-muted-foreground text-sm">
                        Product specifications, images, and pricing are pending supplier confirmation.
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2">Data Pending</Badge>
                          <h2 className="text-xl font-semibold text-muted-foreground">
                            {entry.id}
                          </h2>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Reserved SKU in the Dining Solutions category. Real product content will be published when the Excel info card is finalized with the supplier.
                      </p>
                      <div className="flex gap-3">
                        <Link href="/rfq" className="flex-1">
                          <Button className="w-full">
                            Inquire <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )
              }

              const product = entry.product
              const hasMultipleImages = product.images.length > 1
              const heroImage = product.images[0]
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
                        priority={product.id === "DS-DIN-001"}
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
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          MOQ {product.moq} units
                        </Badge>
                          <h2 className="text-lg font-semibold">
                          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Price Display */}
                    {product.priceTiers && product.priceTiers.length > 0 ? (
                      <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground mb-3">FOB Tiered Pricing</p>
                        <div className="space-y-2">
                          {product.priceTiers.map((tier) => (
                            <div key={tier.quantity} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{tier.quantity}</span>
                              <span className="font-semibold text-primary">{tier.unitPrice}</span>
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

      {/* CTA Section */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Need Custom Dining Solutions?
          </h2>
          <p className="text-muted-foreground mb-8">
            We offer OEM private labeling, custom colors, branded packaging, and bulk pricing for nursing home chains and care distributors.
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
