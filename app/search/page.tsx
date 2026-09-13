"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search, Package, ArrowRight } from "lucide-react"
import { allProducts, formatProductPrice, productCategories } from "@/lib/products"
import { useLocale } from "@/components/locale-provider"
import { searchContent } from "@/lib/pages-i18n"
import { productTranslations } from "@/lib/product-i18n"

function SearchContent() {
  const { locale } = useLocale()
  const c = searchContent[locale] ?? searchContent.en

  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || ""

  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const q = searchParams.get("q") || ""
    const cat = searchParams.get("category") || ""
    setQuery(q)
    setCategory(cat)
  }, [searchParams])

  const catLabels: Record<string, string> = {
    Cleansing: c.catCleansing,
    "Barrier Protection": c.catBarrier,
    "Complete Care Kits": c.catKits,
  }
  const categoryName = (name: string) => catLabels[name] ?? name

  const results = useMemo(() => {
    let filtered = allProducts

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
    }

    if (category) {
      const catMap: Record<string, string> = {
        cleansing: "Cleansing",
        "barrier-protection": "Barrier Protection",
        "complete-care-kits": "Complete Care Kits",
      }
      const mapped = catMap[category]
      if (mapped) filtered = filtered.filter((p) => p.category === mapped)
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice))
    }

    return filtered
  }, [query, category, minPrice, maxPrice])

  const resultsText =
    results.length === 1
      ? c.foundOne
      : c.foundMany.replace("{n}", String(results.length))

  return (
    <>
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#F7EEE4] via-background to-[#EFE2D3]">
        <div className="container-wide text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{c.heroTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {c.heroDesc}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={c.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={c.allCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{c.allCategories}</SelectItem>
                {productCategories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {categoryName(cat.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder={c.minPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-[140px]"
            />
            <Input
              type="number"
              placeholder={c.maxPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-[140px]"
            />

            {(query || category || minPrice || maxPrice) && (
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("")
                  setCategory("")
                  setMinPrice("")
                  setMaxPrice("")
                }}
              >
                {c.clearFilters}
              </Button>
            )}
          </div>

          {/* Results Count */}
          <p className="text-center text-muted-foreground mb-8">{resultsText}</p>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => {
                const pt = productTranslations[product.slug]?.[locale]
                const name = pt?.name ?? product.name
                const desc = pt?.description ?? product.description
                return (
                  <Link key={product.id} href={`/products/${product.slug}`} className="group">
                    <Card className="overflow-hidden hover-lift border-0 shadow-sm h-full">
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={product.images[0]}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                            {categoryName(product.category)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {desc}
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                          <span className="text-xs font-medium text-muted-foreground">MOQ: {product.moq}</span>
                          <span className="text-sm font-semibold text-primary">
                            {formatProductPrice(product)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{c.noResultsTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {c.noResultsDesc}
              </p>
              <Link href="/products">
                <Button>
                  {c.browseAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{c.ctaTitle}</h2>
          <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
            {c.ctaDesc}
          </p>
          <div className="mt-8">
            <Link href="/rfq">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                {c.ctaBtn}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function SearchPage() {
  const { locale } = useLocale()
  const c = searchContent[locale] ?? searchContent.en
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">{c.loading}</div>}>
      <SearchContent />
    </Suspense>
  )
}
