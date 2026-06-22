import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Long-Term Care Supplies for Nursing Homes — Dining, Transfer, Bedding | DS CARO",
  description:
    "Complete supply solutions for skilled nursing facilities. Adult bibs, clothing protectors, transfer support, disposable underpads, and washable bed pads — OEM/ODM with bulk pricing.",
  openGraph: {
    title: "Nursing Home Supplies — Dining & Care | DS CARO",
    description:
      "Bulk nursing home supplies: dining protection, transfer support, and bedding protection. OEM private label for care facility chains.",
  },
}

const recommendedProducts = [
  { name: "Reusable Adult Bib with Crumb Catcher", category: "Dining Solutions", benefit: "Reduce laundry costs with machine-washable bibs" },
  { name: "Waterproof Clothing Protector", category: "Dining Solutions", benefit: "Full coverage protection for high-dependency residents" },
  { name: "Transfer Support Aids", category: "Mobility & Transfer", benefit: "Support safer bed, chair, and wheelchair transfer routines" },
  { name: "Walking & Positioning Support", category: "Mobility & Transfer", benefit: "Help residents move and rest with better caregiver support" },
  { name: "Disposable Adult Underpads", category: "Daily Care Supplies", benefit: "Support everyday incontinence and bedding protection programs" },
  { name: "Waterproof Mattress Protector", category: "Daily Care Supplies", benefit: "Extend mattress life and improve care-room hygiene" },
]

const benefits = [
  {
    title: "Bulk Pricing",
    desc: "Volume discounts for multi-facility nursing home chains and procurement groups.",
  },
  {
    title: "OEM Private Label",
    desc: "Private-label packaging, color options, and SKU-level documents for distributor and facility programs.",
  },
  {
    title: "Consistent Supply",
    desc: "Reliable delivery schedules aligned with your facility's replenishment cycles.",
  },
  {
    title: "Documentation",
    desc: "Product specs, wash-test data, and compliance documents available by SKU.",
  },
]

export default function NursingHomesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-white">
        <div className="container-wide relative z-10">
          <Badge className="bg-white/20 text-white border-0 mb-6">For Skilled Nursing Facilities</Badge>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Nursing Home Supplies
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mb-8">
            Complete dining, mobility and transfer, and daily care supply solutions for skilled nursing facilities, long-term care homes, and rehabilitation centers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products/dining-solutions">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                View Product Lines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-center mb-4">
            Recommended for Nursing Homes
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Products selected for high-volume, high-durability nursing home environments.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((p) => (
              <Card key={p.name} className="border border-border/70 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{p.category}</Badge>
                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline">
                Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Why Nursing Home Buyers Choose DS CARO
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-white text-center">
        <div className="container-wide max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Ready to Supply Your Facility?
          </h2>
          <p className="text-white/70 mb-8">
            Get bulk pricing, request samples, or discuss private label options for your nursing home chain.
          </p>
          <Link href="/rfq">
            <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
              Request Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
