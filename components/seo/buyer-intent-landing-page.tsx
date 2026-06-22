import Link from "next/link"
import { ArrowRight, CheckCircle2, Factory, PackageCheck } from "lucide-react"

import { BuyerIntentPage } from "@/lib/buyer-intent-pages"
import { procurementKits } from "@/lib/procurement-kits"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ComplianceSection,
  IndustryUseScenarios,
  OemCapabilityProofBlock,
} from "@/components/trust/industry-trust-sections"

interface BuyerIntentLandingPageProps {
  page: BuyerIntentPage
}

export function BuyerIntentLandingPage({ page }: BuyerIntentLandingPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] py-16 text-white md:py-24">
        <div className="container-wide relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/65">
            {page.eyebrow}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78">
            {page.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/rfq?source=${page.slug}`}>
              <Button size="lg" className="bg-[#E67E22] text-white hover:bg-[#D35400]">
                Send Bulk RFQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={page.primaryCategoryHref}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                {page.primaryCategoryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <PackageCheck className="mb-5 h-7 w-7 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Procurement Use Cases</h2>
                <ul className="mt-5 space-y-3">
                  {page.useCases.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <PackageCheck className="mb-5 h-7 w-7 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Bulk Ordering Logic</h2>
                <ul className="mt-5 space-y-3">
                  {page.bulkLogic.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <Factory className="mb-5 h-7 w-7 text-primary" />
                <h2 className="text-xl font-bold text-foreground">OEM Capability</h2>
                <ul className="mt-5 space-y-3">
                  {page.oemCapabilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/20">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Recommended Products and Bundles
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Move from product research to a practical RFQ path: product line, solution page, then quotation.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {page.recommendedLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group">
                <Card className="h-full border-0 shadow-sm transition group-hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">{item.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                      Open path
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            {procurementKits.map((kit) => (
              <Card key={kit.slug} className="border-border/70">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{kit.category}</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">{kit.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{kit.buyerUse}</p>
                  <Link href={`/rfq?kit=${encodeURIComponent(kit.name)}&source=${page.slug}`} className="mt-5 inline-flex">
                    <Button variant="outline" size="sm">
                      Request Bundle Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <IndustryUseScenarios />
      <ComplianceSection />
      <OemCapabilityProofBlock />

      <section className="section-padding bg-[#1A365D] text-background">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ready to Prepare a Bulk Quote?
          </h2>
          <p className="mt-4 text-background/75">
            Send facility type, product category, estimated quantity, OEM requirement, and country. We will return MOQ, FOB, lead time, and packaging support notes.
          </p>
          <Link href={`/rfq?source=${page.slug}-final-cta`} className="mt-8 inline-flex">
            <Button size="lg" variant="secondary">
              Start RFQ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
