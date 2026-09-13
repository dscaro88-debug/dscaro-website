"use client"

import Link from "next/link"
import { Building2, Home, Heart, ArrowRight, CheckCircle } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { solutionsContent } from "@/lib/pages-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const facilityMeta = [
  { icon: Building2, href: "/products/cleansing", color: "from-[#6F4936] to-[#1A365D]" },
  { icon: Home, href: "/products/barrier-protection", color: "from-[#7A5C3C] to-[#2F5D50]" },
  { icon: Heart, href: "/products/complete-care-kits", color: "from-[#8B5E3C] to-[#3A2A22]" },
]

const lineMeta = [
  { href: "/products/cleansing", emoji: "🧴", key: "lineCleansing" as const },
  { href: "/products/barrier-protection", emoji: "🛡️", key: "lineBarrier" as const },
  { href: "/products/complete-care-kits", emoji: "📦", key: "lineKits" as const },
]

export function SolutionsView() {
  const { locale } = useLocale()
  const s = solutionsContent[locale] ?? solutionsContent.en

  return (
    <>
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-white">
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <Badge className="bg-white/20 text-white border-0 mb-6">{s.eyebrow}</Badge>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">{s.heroTitle}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{s.heroDesc}</p>
          <Link href="/rfq">
            <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
              {s.ctaQuote} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {s.facilityTypes.map((ft, i) => {
              const Icon = facilityMeta[i]?.icon ?? Building2
              const href = facilityMeta[i]?.href ?? "/products"
              const color = facilityMeta[i]?.color ?? "from-[#6F4936] to-[#1A365D]"
              return (
                <Link key={ft.title} href={href} className="group">
                  <Card className="overflow-hidden border border-border/70 shadow-sm hover:shadow-md transition-all h-full">
                    <div className={`h-28 bg-gradient-to-br ${color} flex items-end p-6`}>
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{ft.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4">{ft.desc}</p>
                      <div className="space-y-1.5 mb-4">
                        {ft.products.map((p) => (
                          <div key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {p}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-primary flex items-center gap-1">
                        {s.viewSupplies} <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">{s.threeLinesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lineMeta.map(({ href, emoji, key }) => {
              const line = s[key]
              return (
                <Link key={key} href={href} className="block p-6 rounded-xl border border-border/70 bg-white hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <h3 className="text-lg font-semibold mb-2">{line.title}</h3>
                  <p className="text-sm text-muted-foreground">{line.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">{s.ctaTitle}</h2>
          <p className="text-muted-foreground mb-8">{s.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">{s.getRecommendation}</Button>
            </Link>
            <Link href="/trade-account">
              <Button variant="outline" size="lg">{s.applyTrade}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
