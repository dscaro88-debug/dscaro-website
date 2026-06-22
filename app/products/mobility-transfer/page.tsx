import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Mobility & Transfer Supplies — Coming Soon | DS CARO",
  description:
    "B2B wholesale mobility and transfer products for care facilities: transfer support, walking aids, and positioning products. Currently building this category — check back soon.",
  openGraph: {
    title: "Mobility & Transfer Supplies | DS CARO",
    description: "Mobility and transfer supplies for nursing homes and assisted living — coming soon.",
  },
}

const plannedSubcategories = [
  {
    name: "Transfer Support",
    description: "Transfer belts, slide sheets, and repositioning aids for safe resident transfers between bed, chair, and wheelchair.",
    icon: "🔄",
  },
  {
    name: "Walking & Positioning",
    description: "Walking frames, rollators, gait trainers, and positioning cushions for resident mobility and posture support.",
    icon: "🚶",
  },
]

export default function MobilityTransferPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-gradient-to-br from-[#F7EEE4] via-background to-[#EFE2D3]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#E67E22]/10 px-3 py-1 text-sm font-medium text-[#7A3E12]">
              🚶 Mobility & Transfer
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Mobility & Transfer Supplies
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              B2B wholesale mobility and transfer products for nursing homes, assisted living, and home care.
              Launch SKUs are being prepared for safer movement, transfer support, walking, and positioning routines.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/products/dining-solutions">
                  Browse Dining Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us for OEM/ODM</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Planned Subcategories
          </h2>
          <p className="mt-3 text-muted-foreground">
            We are sourcing the following product lines. If you have a specific need, contact us for early supplier matching.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plannedSubcategories.map((sub) => (
            <Card key={sub.name} className="border-border">
              <CardContent className="p-6">
                <div className="text-3xl">{sub.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{sub.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{sub.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Need Mobility & Transfer Products Now?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us your target product, quantity, destination market, and packaging needs. We will prepare supplier matching, MOQ guidance, and sample options.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Request Sourcing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
