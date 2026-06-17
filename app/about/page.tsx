import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { buildProductVisualPath } from "@/lib/products"
import { siteConfig } from "@/lib/site-config"
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

export const metadata: Metadata = {
  title: "About DS CARO — Senior Care & Mobility Manufacturer",
  description:
    "DS CARO is the senior care and mobility solutions brand of HUBEI DESHANG INDUSTRY & TRADE CO,.LTD, founded in 2012 and serving global B2B buyers from Jinhua, Zhejiang, China.",
  openGraph: {
    title: "About DS CARO — Senior Care & Mobility Manufacturer",
    description:
      "OEM/ODM sourcing and product development support for senior care products, with model-level document review and launch-ready product planning.",
  },
}

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const timeline: TimelineItem[] = [
  {
    year: "2012",
    title: "DS CARO Founded",
    description:
      "HUBEI DESHANG INDUSTRY & TRADE CO,.LTD was established. DS CARO became the company's senior care and mobility solutions brand for global B2B buyers.",
    icon: Building2,
  },
  {
    year: "2014",
    title: "Product Specialization Begins",
    description:
      "Identified senior care and mobility aids as a core focus area. Began transitioning from general trading to specialized product sourcing and quality control for overseas B2B buyers.",
    icon: Target,
  },
  {
    year: "2016",
    title: "First Long-Term Distribution Program",
    description:
      "Expanded into repeat-order distributor programs and built a stronger range-planning process around mobility, bathroom safety, and home-care categories.",
    icon: Globe,
  },
  {
    year: "2018",
    title: "Deeper Supplier Coordination",
    description:
      "Expanded supplier coordination, product planning, and OEM project handling across senior care and mobility categories for repeat B2B programs.",
    icon: Factory,
  },
  {
    year: "2020",
    title: "Quality Workflow Upgrade",
    description:
      "Strengthened product inspection, packaging, export-document handling, and model-level supplier file review workflows.",
    icon: ShieldCheck,
  },
  {
    year: "2020",
    title: "Supply Chain Stabilization",
    description:
      "Improved supplier communication, packaging coordination, and export workflow management for more stable repeat-order handling.",
    icon: Truck,
  },
  {
    year: "2022",
    title: "Documentation-by-Model Process",
    description:
      "Standardized model-level document collection for buyer review, including product specifications, inspection notes, and applicable certificate files when available.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Digital Platform & Curated B2B Catalog",
    description:
      "Built the DS CARO digital catalog, inquiry flows, and curated category structure to support faster quotation and buyer communication.",
    icon: Package,
  },
  {
    year: "2026",
    title: "Building the Future of Senior Care",
    description:
      "Building distributor-ready senior care product systems across mobility, bathroom safety, daily living, home care, smart care, and care bundles.",
    icon: Users,
  },
]

const stats = [
  { value: "54", label: "Curated Product SKUs", icon: Package },
  { value: "6", label: "Product Categories", icon: Globe },
  { value: "24h", label: "B2B Response Time", icon: Users },
  { value: "2012", label: "Company Founded", icon: Clock },
]

const certifications = [
  {
    name: "Supplier File Check",
    standard: "Document Status",
    description: "Certificate claims remain pending until supplier files are verified for the exact model/SKU.",
  },
  {
    name: "Model-Level Documents",
    standard: "Product Documentation",
    description: "Product-level certificates and technical files are provided upon request where applicable and verified by model/SKU.",
  },
  {
    name: "Inspection Records",
    standard: "Quality Control",
    description: "Pre-shipment inspection records and packaging details can be prepared for B2B buyers.",
  },
  {
    name: "OEM/ODM Files",
    standard: "Private Label Support",
    description: "Logo, packaging, insert, barcode, and marketplace content files can be prepared for approved orders.",
  },
]

const values = [
  {
    title: "Quality Without Compromise",
    description: "We discuss quality expectations, inspection scope, packaging, and applicable product files before order confirmation instead of making blanket claims.",
    icon: ShieldCheck,
  },
  {
    title: "B2B Partnership First",
    description: "We're not a dropshipper. We're your manufacturing partner. Flexible MOQ, private labeling, custom packaging, and dedicated account management.",
    icon: HeartHandshake,
  },
  {
    title: "Regulatory Excellence",
    description: "We prepare product documentation by model and avoid blanket certificate claims until documents are verified for the exact SKU.",
    icon: Award,
  },
  {
    title: "Continuous Innovation",
    description: "We adjust product selection and OEM direction based on distributor demand, care-use scenarios, and feedback from active buyer conversations.",
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-[#1A365D]">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("fall-prevention-starter-kit-gft-101")}
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
              Our Story
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Caring for Life,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
                Every Step of the Way
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl">
              {siteConfig.companyIntro}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trade-account">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-primary/60 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white font-serif">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
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
                    <p className="text-sm text-muted-foreground">Company and Supplier Evidence Block</p>
                    <p className="text-xs text-muted-foreground/60">Replace with factory, team, packaging, or inspection photos</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/5 rounded-2xl -z-10" />
            </div>

            {/* Story Text */}
            <div>
              <Badge variant="secondary" className="mb-4">Brand Story</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                From Jinhua to the World —
                <br />
                <span className="text-primary">Built on Trust & Quality</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  DS CARO is being positioned as a focused B2B supplier brand for senior care, mobility, bathroom safety,
                  daily living, home care, and selected smart-care products.
                </p>
                <p>
                  The practical value for buyers is not broad marketing language. It is whether a supplier can present a usable SKU range,
                  explain MOQ and OEM scope clearly, and confirm what documents are or are not available for the exact model.
                </p>
                <p>
                  That is the standard this website now needs to meet. Where evidence is still missing, the right move is to replace
                  inflated claims with concrete status and then fill the gap with real factory, packaging, product, and inspection material.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Document Status by SKU
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Product Documents by Model
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  OEM/ODM Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Journey Timeline ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Building Momentum, Year by Year
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small operation in Jinhua to a broader B2B sourcing workflow, each milestone marks tighter product curation, clearer communication, and stronger delivery discipline.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div key={item.year} className={`relative md:flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
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
                              <item.icon className="h-5 w-5 text-primary" />
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
              <Badge variant="secondary" className="mb-4">Manufacturing Excellence</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Modern Factory,
                <br />
                <span className="text-primary">Precision Manufacturing</span>
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Factory className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">2,000+ sqm Production Facility</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dedicated production lines for each product category — mobility aids, bathroom safety,
                      daily living, and home care equipment. Climate-controlled assembly areas for medical-grade products.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Multi-Stage Quality Control</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Raw material inspection → In-process checks → Finished product testing → Pre-shipment inspection.
                      Every batch is documented with traceable QC records for your compliance filing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Flexible OEM / ODM Service</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Private labeling, custom color specifications, adapted packaging, and product modifications to
                      meet your market's specific requirements. MOQ as low as 100 units for customized orders.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Reliable Global Logistics</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      FOB Ningbo/Shanghai. Sea freight to major EU ports (Hamburg, Rotterdam, Antwerp) in 25-35 days.
                      Air freight and DDP options available for urgent orders. Full customs documentation support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Factory Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-4">
                  <Factory className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Assembly Line</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-4">
                  <ShieldCheck className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">QC Testing Lab</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/5 to-accent/10 border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-4">
                  <Package className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Warehouse & Packing</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-4">
                  <Users className="h-10 w-10 text-primary/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">R&D Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Quality Assurance</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quality and Documentation Support
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide model-level product documents for buyer review, and certificate claims stay pending until confirmed by SKU before publication or quotation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-7 w-7 text-primary" />
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
            <Badge variant="secondary" className="mb-4">What We Stand For</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values Define Our Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four principles guide every decision — from product design to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-[#1A365D]">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("height-adjustable-overbed-table-hcb-101")}
            alt="DS CARO partnership launch visual"
            fill
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1F3C]/92 via-[#1A365D]/82 to-[#E67E22]/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner with DS CARO?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
            Whether you're a distributor, importer, healthcare provider, or e-commerce seller, we can help with product range planning, document-status review, and OEM/ODM execution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trade-account">
              <Button size="lg" variant="secondary" className="gap-2">
                Apply for Trade Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/rfq">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
