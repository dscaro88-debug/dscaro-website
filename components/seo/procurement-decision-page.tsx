import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Factory, PackageCheck, ShieldCheck } from "lucide-react"

import type { ProcurementDecisionPage } from "@/lib/procurement-decision-pages"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ProcurementDecisionPageTemplate({
  page,
}: {
  page: ProcurementDecisionPage
}) {
  return (
    <>
      <section className="bg-[#F8F1E8] py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-[#E67E22] text-white">{page.eyebrow}</Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {page.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/rfq?source=${page.slug}`}>
                <Button className="h-12 bg-[#1A365D] px-6 text-white hover:bg-[#132844]">
                  {page.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="h-12 px-6">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="secondary" className="mb-3">
                Procurement Reassurance
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Reduce Sourcing Risk Before You Order
              </h2>
              <p className="mt-3 text-muted-foreground">
                These pages are designed for decision-stage buyers who need confidence on MOQ, timeline, packaging, and product-file readiness.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {page.reassurance.map((item) => (
                <Card key={item} className="border-border/60">
                  <CardContent className="p-5">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-[#E67E22]" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/25">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3">
              Process
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Practical Procurement Flow
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, index) => (
              <Card key={step.title} className="h-full border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A365D] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="border-0 bg-[#1A365D] text-white shadow-sm">
              <CardContent className="p-7">
                <PackageCheck className="mb-5 h-7 w-7 text-[#F4C27A]" />
                <h2 className="text-2xl font-bold">MOQ Clarity</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{page.moq}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <Clock className="mb-5 h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Production Timeline</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{page.timeline}</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-[#F8F1E8] shadow-sm">
              <CardContent className="p-7">
                <Factory className="mb-5 h-7 w-7 text-[#B85613]" />
                <h2 className="text-2xl font-bold text-foreground">OEM Readiness</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Logo label, private carton, insert card, barcode, language labels, and SKU-level product files can be reviewed during RFQ.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-muted/25 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Document status is reviewed by SKU.</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Material safety, RoHS / REACH discussion, non-medical classification, labels, manuals, and packaging files are confirmed by target market and exact SKU.
                  </p>
                </div>
              </div>
              <Link href={`/rfq?source=${page.slug}-bottom-cta`}>
                <Button className="h-11 bg-[#E67E22] text-white hover:bg-[#D35400]">
                  Send RFQ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
