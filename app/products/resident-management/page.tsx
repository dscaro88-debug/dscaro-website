import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Resident Management Supplies — Clothing Labels, Laundry Tags, Belongings Bags | DS CARO",
  description:
    "B2B wholesale resident management products: clothing name labels, laundry labels, iron-on tags, and resident belongings bags for nursing homes and assisted living. OEM/ODM available.",
  openGraph: {
    title: "Resident Management Supplies for Care Facilities | DS CARO",
    description:
      "Clothing labels, laundry tags, and belongings bags for nursing homes. Reduce lost items and laundry mix-ups with our facility management solutions.",
  },
}

const products = [
  {
    id: "DS-RSM-001",
    name: "Resident Belongings Bag",
    description: "Durable drawstring bag for managing resident personal items during admission, transfer, or laundry cycles. Essential for care home organization.",
    features: ["Durable cotton/polyester", "Drawstring closure", "Name tag window", "Multiple sizes", "Washable & reusable"],
    image: "/images/category-resident.jpg",
    price: "From £5.00",
    moq: "100 units",
  },
  {
    id: "DS-RSM-002",
    name: "Clothing Name Labels (Iron-On)",
    description: "Custom-printed iron-on clothing labels with resident name and room number. Reduce laundry mix-ups and lost clothing.",
    features: ["Custom printed", "Iron-on application", "Wash-resistant 50+ cycles", "Multiple fonts/sizes", "Bulk roll pricing"],
    image: "/images/category-resident.jpg",
    price: "From £0.10/label",
    moq: "500 labels",
  },
  {
    id: "DS-RSM-003",
    name: "Laundry Identification Tags",
    description: "Waterproof snap-on laundry tags for care facility clothing management. Quick to attach, long-lasting in commercial washing.",
    features: ["Waterproof & durable", "Snap-on mechanism", "Write-on surface", "Color-coded options", "Laundry cycle safe"],
    image: "/images/category-resident.jpg",
    price: "From £0.30/tag",
    moq: "250 tags",
  },
]

export default function ResidentManagementPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="container-wide relative z-10 text-center">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Resident Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Identification and organization supplies for nursing homes — reduce lost belongings, prevent laundry mix-ups, and streamline resident property management.
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
            Custom Labels & Bags for Your Facility
          </h2>
          <p className="text-muted-foreground mb-8">
            Print your facility name, logo, and resident details. Bulk pricing available for nursing home chains and care groups.
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
