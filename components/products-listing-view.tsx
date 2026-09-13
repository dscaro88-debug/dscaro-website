"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/components/locale-provider"
import {
  getLocalizedProduct,
  getLocalizedCategory,
  productPageTranslations,
} from "@/lib/product-i18n"
import { type Product, type ProductCategory, productCategories, formatProductPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Package } from "lucide-react"

interface ProductsListingViewProps {
  categories: ProductCategory[]
  featured: Product[]
}

export function ProductsListingView({ categories, featured }: ProductsListingViewProps) {
  const { locale } = useLocale()
  const p = productPageTranslations[locale]

  const catName = (name: string) => {
    const c = productCategories.find((x) => x.name === name)
    return c ? getLocalizedCategory(c, locale).name : name
  }

  const unitWord = (n: number) =>
    (n === 1 ? p.moqOne : p.moqMany).split("{n}")[1]?.trim() ?? ""

  const procurementPaths = [
    { href: "/products/cleansing", title: p.pathCleansingTitle, desc: p.pathCleansingDesc },
    { href: "/products/barrier-protection", title: p.pathBarrierTitle, desc: p.pathBarrierDesc },
    { href: "/long-term-care-distributors", title: p.pathDistributorTitle, desc: p.pathDistributorDesc },
    { href: "/products/complete-care-kits", title: p.pathKitsTitle, desc: p.pathKitsDesc },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-muted/30">
        <div className="container-wide text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{p.catalogTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{p.catalogSubtitle}</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">{p.productCategories}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const lc = getLocalizedCategory(category, locale)
              return (
                <Link key={category.slug} href={`/products/${category.slug}`} className="group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                    <Image src={category.image} alt={lc.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-[32px] mb-2">{category.icon}</div>
                      <h3 className="text-xl font-semibold text-white">{lc.name}</h3>
                      <p className="text-sm text-white/70 mt-1 line-clamp-2">{lc.description}</p>
                      <div className="mt-3">
                        <Badge className="bg-white/20 text-white border-0 text-xs">
                          {category.productCount} {p.productsLabel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buyer Intent Paths */}
      <section className="section-padding bg-muted/20">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{p.intentTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{p.intentDesc}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {procurementPaths.map((path) => (
              <Link key={path.href} href={path.href} className="group">
                <Card className="h-full border-0 shadow-sm transition group-hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">{path.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{path.desc}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                      {p.viewSolution}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/rfq?source=products-intent-paths">
              <Button className="bg-[#E67E22] text-white hover:bg-[#D35400]">
                {p.sendBulkRfq}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{p.featuredTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{p.featuredDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => {
              const lp = getLocalizedProduct(product, locale)
              return (
                <Link key={product.id} href={`/products/${product.slug}`} className="group">
                  <Card className="overflow-hidden hover-lift border-0 shadow-sm h-full">
                    <div className="relative aspect-square bg-muted">
                      <Image src={product.images[0]} alt={lp.name} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground text-xs font-medium">{catName(product.category)}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{lp.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{lp.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs font-medium text-muted-foreground">MOQ: {product.moq}{unitWord(product.moq)}</span>
                        <span className="text-sm font-semibold text-primary">{formatProductPrice(product)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/rfq?source=products-full-catalog">
              <Button size="lg" className="h-12 px-8">
                <Package className="mr-2 h-4 w-4" />
                {p.requestFullCatalog}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#1A365D] text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{p.cantFindTitle}</h2>
          <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">{p.cantFindDesc}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/rfq">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                {p.requestCustomOem}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button size="lg" variant="outline" className="h-12 px-8 border-background/30 text-background hover:bg-background/10">
                {p.applyTradeAccount}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
