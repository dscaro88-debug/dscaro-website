import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Shirt, PackageSearch, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Memory Care Supplies — Dining Protection & Resident Identification | DS CARO",
  description:
    "Specialized supplies for memory care units: full-coverage dining protectors, easy-identification clothing labels, and resident-safe belongings bags. OEM/ODM available.",
  openGraph: {
    title: "Memory Care Unit Supplies | DS CARO",
    description:
      "Dining protection, clothing identification, and resident management supplies for dementia and memory care facilities. Private label available.",
  },
}

const recommendedProducts = [
  { name: "Full Coverage Waterproof Protector", category: "Dining Solutions", benefit: "Maximum protection for residents who need full coverage" },
  { name: "Disposable Adult Bib (3-Ply)", category: "Dining Solutions", benefit: "Cost-effective single-use option for high-turnover dining" },
  { name: "Clothing Name Labels (Iron-On)", category: "Mobility & Transfer", benefit: "Clear resident identification to reduce wandering-related clothing loss" },
  { name: "Waterproof Laundry Tags", category: "Mobility & Transfer", benefit: "Color-coded tags for easy sorting by unit or resident" },
  { name: "Resident Belongings Bag", category: "Mobility & Transfer", benefit: "Secure personal item storage with clear name labeling" },
]

const whyMemoryCare = [
  { icon: Brain, title: "Sensory-Conscious", desc: "Soft fabrics, muted colors, non-irritating closures — designed with sensory sensitivities in mind." },
  { icon: Shirt, title: "Dressing-Friendly", desc: "Easy-on, easy-off designs that respect resident dignity and simplify care staff routines." },
  { icon: PackageSearch, title: "Wander-Proof Identification", desc: "Durable labels and tags that stay on through laundry cycles, reducing lost items." },
  { icon: Tag, title: "Unit Organization", desc: "Color-coded systems for sorting resident items by unit, room, or care level." },
]

export default function MemoryCarePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container-wide relative z-10">
          <Badge variant="secondary" className="mb-6">For Memory Care Units</Badge>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Memory Care Supplies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Thoughtfully designed dining protection and resident identification supplies for dementia and memory care facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products/dining-solutions">
              <Button variant="outline" size="lg">
                View Dining Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-center mb-4">
            Recommended for Memory Care
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Products selected for the unique needs of residents with dementia and Alzheimer's.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((p) => (
              <Card key={p.name} className="border-0 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Why Memory Care */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Designed for Memory Care Environments
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMemoryCare.map(({ icon: Icon, title, desc }) => (
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
      <section className="py-16 bg-[#1A365D] text-white text-center">
        <div className="container-wide max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Specialized Supplies for Your Memory Care Unit
          </h2>
          <p className="text-white/70 mb-8">
            We understand the unique challenges of memory care. Let us help you find the right products for your residents.
          </p>
          <Link href="/rfq">
            <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
