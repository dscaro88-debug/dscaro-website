import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Daily Care Supplies for Long-Term Care — Bed Pads, Protectors, Towels | DS CARO",
  description:
    "B2B wholesale Daily Care Supplies: disposable underpads, washable bed pads, waterproof mattress protectors, care towels, and hygiene supplies for nursing homes and assisted living. OEM/ODM available.",
  openGraph: {
    title: "Daily Care Supplies for Nursing Homes | DS CARO",
    description:
      "Washable bed pads, waterproof protectors, and daily care supplies for long-term care facilities. OEM/ODM with flexible order quantities.",
  },
}

const products = [
  {
    id: "DS-DCR-001",
    name: "Disposable Adult Underpad (3 Sizes, 20pcs/bag)",
    description: "Thickened disposable adult underpad for elderly incontinence care. Three sizes: 60x90cm, 80x90cm, 80x120cm. 20 pcs per bag, multi-layer leak-proof.",
    features: ["3 size variants", "20pcs/bag bulk pack", "Multi-layer absorbent", "Leak-proof PE backing", "Soft non-woven top", "Single-use"],
    image: "/products/daily-care/DS-DCR-001/DS-DCR-001_01_main_english.jpg",
    price: "USD 2.04 – 3.11 / bag",
    moq: "60 bags",
  },
  {
    id: "DS-DCR-002",
    name: "Waterproof Mattress Protector",
    description: "Full-fit waterproof mattress protector with breathable membrane. Essential for care home bed management and infection control.",
    features: ["Breathable membrane", "Full mattress fit", "Zippered closure", "Hospital-grade", "Single/King sizes"],
    image: "/product-visuals/waterproof-mattress-protector-dcr-002",
    price: "From £15.00",
    moq: "50 units",
  },
]

export default function DailyCarePage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-10 md:py-14 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <span className="text-4xl mb-3 block">🛏️</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Daily Care Supplies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Bedding protection and daily hygiene supplies for long-term care facilities — supporting care routines with practical, durable products.
          </p>
          <Badge className="text-sm">
            {products.length} Products — OEM/ODM Available
          </Badge>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] bg-muted">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {product.moq}
                      </Badge>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                    </div>
                    <span className="text-lg font-semibold text-primary whitespace-nowrap ml-4">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/rfq">
                    <Button className="w-full">
                      Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Bulk Bedding Protection for Care Facilities
          </h2>
          <p className="text-muted-foreground mb-8">
            We supply nursing home chains, assisted living communities, and care distributors with Daily Care Supplies for hygiene, incontinence, and bedding protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Request Quote
              </Button>
            </Link>
            <Link href="/trade-account">
              <Button variant="outline" size="lg">
                Apply for Trade Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
