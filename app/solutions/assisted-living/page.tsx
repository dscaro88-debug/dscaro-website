import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Package, Palette, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Assisted Living Supplies — Dining, Transfer & Daily Care | DS CARO",
  description:
    "Dignified care products for assisted living communities: reusable bibs, dining aprons, mobility and transfer support, and daily care supplies. OEM/ODM with flexible MOQ.",
  openGraph: {
    title: "Assisted Living Community Supplies | DS CARO",
    description:
      "Dining, mobility and transfer, and Daily Care Supplies for assisted living communities. Dignified designs with private label options.",
  },
}

const recommendedProducts = [
  { name: "Wheelchair Dining Apron", category: "Dining Solutions", benefit: "Resident-safe design for independent diners" },
  { name: "Reusable Adult Bib", category: "Dining Solutions", benefit: "Dignity-preserving mealtime protection" },
  { name: "Transfer Support Aids", category: "Mobility & Transfer", benefit: "Support safer movement between bed, chair, and wheelchair" },
  { name: "Walking & Positioning Support", category: "Mobility & Transfer", benefit: "Support daily movement and comfortable positioning routines" },
  { name: "Waterproof Mattress Protector", category: "Daily Care Supplies", benefit: "Discreet bedding protection" },
]

const keyValues = [
  { icon: Shield, title: "Resident-Safe Design", desc: "Products designed to preserve dignity and independence — no institutional look." },
  { icon: Package, title: "Flexible MOQ", desc: "Order from 50 units — suitable for single-site communities and multi-facility groups." },
  { icon: Palette, title: "Private Label Ready", desc: "Your community name and logo on products. Build your own care brand." },
  { icon: Clock, title: "Sample in 7 Days", desc: "Fast sample dispatch. Test products with your residents before bulk ordering." },
]

export default function AssistedLivingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#F7EEE4] via-background to-[#EFE2D3]">
        <div className="container-wide relative z-10">
          <Badge className="mb-6">For Assisted Living Communities</Badge>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Assisted Living Supplies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Products designed for assisted living environments, supporting independence and dignity while simplifying care staff workflows across dining, mobility, transfer, and daily care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products/dining-solutions">
              <Button variant="outline" size="lg">
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
            Recommended for Assisted Living
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Products that support resident independence and maintain a homelike environment.
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
        </div>
      </section>

      {/* Key Values */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Built for Assisted Living Communities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyValues.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-background text-center">
        <div className="container-wide max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Supply Your Assisted Living Community
          </h2>
          <p className="text-background/70 mb-8">
            Get pricing, request samples, or discuss private label for your assisted living community.
          </p>
          <Link href="/rfq">
            <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
