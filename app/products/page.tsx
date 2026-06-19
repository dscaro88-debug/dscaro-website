import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Long-Term Care Products — Dining Solutions, Mobility & Transfer, Daily Care | DS CARO",
  description:
    "B2B wholesale long-term care products: dining solutions, Mobility & Transfer supplies, and daily care products for nursing homes and assisted living. OEM/ODM with product-level documentation.",
  openGraph: {
    title: "Long-Term Care Products — B2B Wholesale | DS CARO",
    description:
      "Browse dining, Mobility & Transfer, and daily care products for long-term care facilities. OEM/ODM with flexible MOQ for distributors.",
  },
}
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { featuredProducts, formatProductPrice, productCategories } from "@/lib/products"
import { ArrowRight, Package } from "lucide-react"

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Product Range</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive long-term care supplies across three core product lines. Built for nursing homes, assisted living communities, and care distributors.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">Product Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category) => (
              <Link key={category.slug} href={`/products/${category.slug}`} className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[40px] mb-2">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-sm text-white/70 mt-1 line-clamp-2">{category.description}</p>
                    <div className="mt-3">
                      <Badge className="bg-white/20 text-white border-0 text-xs">{category.productCount} Products</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Our launch-priority long-term care products for B2B quotation, sampling, and distributor review.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <Card className="overflow-hidden hover-lift border-0 shadow-sm h-full">
                  <div className="relative aspect-square bg-muted">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground text-xs font-medium">{product.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs font-medium text-muted-foreground">MOQ: {product.moq} units</span>
                      <span className="text-sm font-semibold text-primary">
                        From {formatProductPrice(product)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/catalog">
              <Button size="lg" className="h-12 px-8">
                <Package className="mr-2 h-4 w-4" />
                Request Full Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#1A365D] text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Can&apos;t Find What You Need?</h2>
          <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
            We offer full OEM/ODM customization. Tell us your requirements and we&apos;ll build it for your brand.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/rfq">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Request Custom OEM
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button size="lg" variant="outline" className="h-12 px-8 border-background/30 text-background hover:bg-background/10">
                Apply for Trade Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
