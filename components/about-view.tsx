"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Globe,
  ShieldCheck,
  Users,
  Award,
  Truck,
  HeartHandshake,
  Building2,
  Package,
  Clock,
  Target,
} from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { aboutContent } from "@/lib/pages-i18n"
import { buildProductVisualPath } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const statIcons = [Package, Globe, Users, Clock]

const timelineIcons = [Building2, Target, Globe, Factory, ShieldCheck, Truck, Award, Package, Users]

const factoryIcons = [Factory, ShieldCheck, Package, Truck]

const certIcon = Award

const valueIcons = [ShieldCheck, HeartHandshake, Award, Target]

const factoryGrid = [
  { icon: Factory, labelKey: "imgAssemblyLine" as const },
  { icon: ShieldCheck, labelKey: "imgQcLab" as const },
  { icon: Package, labelKey: "imgWarehouse" as const },
  { icon: Users, labelKey: "imgRndTeam" as const },
]

export function AboutView() {
  const { locale } = useLocale()
  const c = aboutContent[locale] ?? aboutContent.en

  const stats = [
    { value: "9", label: c.statSkus },
    { value: "3", label: c.statLines },
    { value: "24h", label: c.statResponse },
    { value: "2012", label: c.statFounded },
  ]

  const brandChecks = [c.brandCheck1, c.brandCheck2, c.brandCheck3]

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-[#1A365D]">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("no-rinse-cleansing-foam-200-cln-200")}
            alt="DS CARO about page launch visual"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F3C]/90 via-[#1A365D]/76 to-[#E67E22]/46" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(255,221,181,0.24),transparent_36%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              {c.heroBadge}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {c.heroTitle1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
                {c.heroTitle2}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl">
              {c.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  {c.exploreProducts} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trade-account">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {c.becomePartner}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = statIcons[i] ?? Package
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="h-5 w-5 text-primary/60 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white font-serif">{stat.value}</div>
                    <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Brand Story ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Evidence Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border border-border/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Factory className="h-16 w-16 text-primary/20 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">{c.evidenceTitle}</p>
                    <p className="text-xs text-muted-foreground/60">{c.evidenceDesc}</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/5 rounded-2xl -z-10" />
            </div>

            {/* Story Text */}
            <div>
              <Badge variant="secondary" className="mb-4">{c.brandBadge}</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                {c.brandTitle1}
                <br />
                <span className="text-primary">{c.brandTitle2}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{c.brandP1}</p>
                <p>{c.brandP2}</p>
                <p>{c.brandP3}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {brandChecks.map((check) => (
                  <div key={check} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {check}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Journey Timeline ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">{c.journeyBadge}</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.journeyTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {c.journeyDesc}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {c.timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                const Icon = timelineIcons[index] ?? Building2
                return (
                  <div key={index} className={`relative md:flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background bg-primary flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>

                    {/* Content Card */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-16" : "md:pl-16"}`}>
                      <Card className="border-border/50 hover:border-primary/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-2xl font-bold text-primary font-serif">{item.year}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Factory Excellence ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">{c.factoryBadge}</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                {c.factoryTitle1}
                <br />
                <span className="text-primary">{c.factoryTitle2}</span>
              </h2>
              <div className="space-y-5">
                {c.factoryItems.map((item, i) => {
                  const Icon = factoryIcons[i] ?? Factory
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Factory Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {factoryGrid.map(({ icon: Icon, labelKey }) => (
                <div key={labelKey} className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-4">
                    <Icon className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">{c[labelKey]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">{c.certBadge}</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.certTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {c.certDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.certifications.map((cert) => (
              <Card key={cert.name} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <certIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{cert.standard}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Values ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">{c.valuesBadge}</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {c.valuesTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {c.valuesDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {c.values.map((value, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck
              return (
                <Card key={value.title} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-[#1A365D]">
        <div className="absolute inset-0">
          <Image
            src="/product-visuals/adult-barrier-cream-crm-100"
            alt="DS CARO partnership launch visual"
            fill
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1F3C]/92 via-[#1A365D]/82 to-[#E67E22]/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {c.ctaTitle}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
            {c.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trade-account">
              <Button size="lg" variant="secondary" className="gap-2">
                {c.ctaApply} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/rfq">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {c.ctaContact}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
