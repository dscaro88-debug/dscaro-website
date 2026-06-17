import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Dining Solutions for Long-Term Care — Adult Bibs, Clothing Protectors | DS CARO",
  description:
    "B2B wholesale dining care products: reusable adult bibs, waterproof clothing protectors, crumb catcher bibs, and wheelchair dining aprons for nursing homes and assisted living. OEM/ODM available.",
  openGraph: {
    title: "Dining Solutions for Nursing Homes & Long-Term Care | DS CARO",
    description:
      "Adult bibs, clothing protectors, and dining aprons for skilled nursing facilities and assisted living. OEM/ODM with flexible MOQ.",
  },
}

const products = [
  {
    id: "DS-DIN-001",
    name: "Reusable Adult Bib with Crumb Catcher",
    description: "Waterproof, machine-washable adult bib with built-in crumb catcher pocket. Designed for dignity-preserving meal times in care settings.",
    features: ["Waterproof fabric", "Machine washable 100+ cycles", "Built-in crumb catcher", "Soft neck closure", "30+ color/pattern options"],
    image: "/products/dining-solutions/DS-DIN-001/01-main.jpg",
    hasRealPhotos: true,
    priceTiers: [
      { quantity: "500+ units", unitPrice: "USD 9.20", markup: "+8%" },
      { quantity: "200-499 units", unitPrice: "USD 9.50", markup: "+12%" },
      { quantity: "50-199 units (MOQ)", unitPrice: "USD 9.80", markup: "+15%" },
    ],
    slug: "reusable-adult-bib-with-crumb-catcher-din-001",
    moq: "50 units",
  },
  {
    id: "DS-DIN-002",
    name: "Waterproof Clothing Protector",
    description: "Full-coverage clothing protector for residents who need extra protection during meals. Ideal for memory care and assisted living.",
    features: ["Full front coverage", "Waterproof lining", "Soft terry back", "Adjustable snap closure", "OEM label available"],
    image: "/images/category-dining.jpg",
    hasRealPhotos: false,
    price: "From USD 12.00",
    moq: "100 units",
    slug: "waterproof-clothing-protector-din-002",
  },
  {
    id: "DS-DIN-003",
    name: "Wheelchair Dining Apron",
    description: "Specially designed dining apron for wheelchair users. Provides lap and chest coverage with easy-to-reach ties.",
    features: ["Wheelchair-friendly design", "Lap + chest coverage", "Quick-release ties", "Anti-stain fabric", "Bulk pricing available"],
    image: "/images/category-dining.jpg",
    hasRealPhotos: false,
    price: "From USD 10.50",
    moq: "100 units",
    slug: "wheelchair-dining-apron-din-003",
  },
  {
    id: "DS-DIN-004",
    name: "Disposable Adult Bib (3-Ply)",
    description: "Cost-effective 3-ply disposable bibs for short-term care, hospital use, and high-turnover environments.",
    features: ["3-ply absorbent", "Disposable", "Bulk 500-pack", "Latex-free", "Cost-effective"],
    image: "/images/category-dining.jpg",
    hasRealPhotos: false,
    price: "From USD 0.15/unit",
    moq: "500 units",
    slug: "disposable-adult-bib-3ply-din-004",
  },
]

export default function DiningSolutionsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <span className="text-5xl mb-4 block">🍽️</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Dining Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Specialized dining protection products for nursing homes, assisted living, and memory care facilities — preserving dignity at every meal.
          </p>
          <Badge className="text-sm">
            {products.length} Products — OEM/ODM Available
          </Badge>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                {/* Product Image */}
                {product.hasRealPhotos && (
                  <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-white overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={product.id === "DS-DIN-001"}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-600 text-white text-xs">
                        Real Photos
                      </Badge>
                    </div>
                  </Link>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {product.moq}
                      </Badge>
                      <h2 className="text-xl font-semibold">
                        <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>

                  {/* Price Display */}
                  {product.priceTiers ? (
                    <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground mb-3">FOB Tiered Pricing (Supplier Cost + Markup)</p>
                      <div className="space-y-2">
                        {product.priceTiers.map((tier) => (
                          <div key={tier.quantity} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{tier.quantity}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-primary">{tier.unitPrice}</span>
                              <Badge variant="secondary" className="text-xs h-5">{tier.markup}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-lg font-semibold text-primary">
                        {product.price}
                      </span>
                    </div>
                  )}

                  <ul className="space-y-2 mb-6">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Link href={`/products/${product.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href="/rfq" className="flex-1">
                      <Button className="w-full">
                        Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Need Custom Dining Solutions?
          </h2>
          <p className="text-muted-foreground mb-8">
            We offer OEM private labeling, custom colors, branded packaging, and bulk pricing for nursing home chains and care distributors.
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
