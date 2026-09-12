import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Home, Heart, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Adult Incontinence Skin Care Solutions — Nursing Homes, Assisted Living, Home Care | DS CARO",
  description:
    "Facility-grade supply programs for adult incontinence skin care: nursing homes, assisted living, and home-care channels. Cleansing, barrier protection, and complete care kits with OEM/ODM support.",
  openGraph: {
    title: "Adult Incontinence Skin Care Solutions | DS CARO",
    description:
      "Cleansing, barrier protection, and complete care kits for nursing homes, assisted living, and home-care facilities. Private label and OEM available.",
  },
}

const facilityTypes = [
  {
    icon: Building2,
    title: "Nursing Homes",
    desc: "High-volume daily incontinence care: no-rinse cleansing foam, barrier cream, and skin protectant spray for resident rooms and care routines.",
    href: "/products/cleansing",
    products: ["No-Rinse Cleansing Foam (500ml)", "Adult Barrier Cream (100g)", "No-Sting Skin Protectant Spray (100ml)"],
    color: "from-[#6F4936] to-[#1A365D]",
  },
  {
    icon: Home,
    title: "Assisted Living",
    desc: "Dignified, gentle skin care that supports resident independence and everyday caregiver workflows in assisted living communities.",
    href: "/products/barrier-protection",
    products: ["No-Rinse Cleansing Foam (200ml)", "Adult Barrier Cream — Intensive Repair", "No-Sting Skin Protectant Spray (30ml)"],
    color: "from-[#7A5C3C] to-[#2F5D50]",
  },
  {
    icon: Heart,
    title: "Home Care",
    desc: "Complete routine in one box for home-care channels and family caregivers — trial kits and portable protectant spray.",
    href: "/products/complete-care-kits",
    products: ["Incontinence Skin Care Kit", "No-Sting Skin Protectant Spray (30ml)", "No-Rinse Cleansing Foam (200ml)"],
    color: "from-[#8B5E3C] to-[#3A2A22]",
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#3A2418] via-[#6F4936] to-[#1A365D] text-white">
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <Badge className="bg-white/20 text-white border-0 mb-6">Solution-Focused Supply</Badge>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Adult Incontinence Skin Care Solutions
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            We help nursing homes, assisted living communities, and home-care channels build practical supply programs across cleansing, barrier protection, and complete care kits.
          </p>
          <Link href="/rfq">
            <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
              Request Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Facility Type Cards */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {facilityTypes.map(({ icon: Icon, title, desc, href, products, color }) => (
              <Link key={title} href={href} className="group">
                <Card className="overflow-hidden border border-border/70 shadow-sm hover:shadow-md transition-all h-full">
                  <div className={`h-28 bg-gradient-to-br ${color} flex items-end p-6`}>
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                    <div className="space-y-1.5 mb-4">
                      {products.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {p}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-primary flex items-center gap-1">
                      View Supplies <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three product lines strip */}
      <section className="bg-muted/20 py-16">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
            Three Focused Product Lines
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/products/cleansing" className="block p-6 rounded-xl border border-border/70 bg-white hover:shadow-md transition-all">
              <div className="text-3xl mb-3">🧴</div>
              <h3 className="text-lg font-semibold mb-2">Cleansing</h3>
              <p className="text-sm text-muted-foreground">No-rinse cleansing foams and wipes — pH-balanced, fragrance-free, alcohol-free.</p>
            </Link>
            <Link href="/products/barrier-protection" className="block p-6 rounded-xl border border-border/70 bg-white hover:shadow-md transition-all">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">Barrier Protection</h3>
              <p className="text-sm text-muted-foreground">Zinc oxide barrier creams and no-sting film-forming skin protectant spray.</p>
            </Link>
            <Link href="/products/complete-care-kits" className="block p-6 rounded-xl border border-border/70 bg-white hover:shadow-md transition-all">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="text-lg font-semibold mb-2">Complete Care Kits</h3>
              <p className="text-sm text-muted-foreground">Cleanse–protect–moisturize bundles for facility trials and home care.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Not Sure Which Solution Fits?
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us your facility type, target quantity, destination market, and packaging needs. We will recommend launch-ready SKUs and quote by product line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Get a Recommendation
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
