import Link from "next/link"
import { BadgeCheck, ClipboardCheck, Factory, PackageCheck, ShieldCheck, UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const scenarios = [
  {
    icon: UsersRound,
    title: "Nursing Home Dining Room",
    desc: "Reusable and disposable dining protection for resident meals, faster cleanup, and dignity-focused routines.",
  },
  {
    icon: PackageCheck,
    title: "Assisted Living Facility",
    desc: "Resident-facing supplies for daily dining, room care, and replenishment across assisted living communities.",
  },
  {
    icon: ClipboardCheck,
    title: "Care Staff Workflow",
    desc: "Products selected for repeatable care routines, clear packing, quick replenishment, and staff-friendly use.",
  },
]

const oemProof = [
  { label: "MOQ", value: "60 units / bags from selected launch SKUs" },
  { label: "Lead Time", value: "Sample review first, bulk planning typically 20-35 days after approval" },
  { label: "Packaging", value: "Private label, carton mark, retail sleeve, language label, insert, barcode" },
]

export function IndustryUseScenarios() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Industry Use Scenarios
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Built Around Real Long-Term Care Workflows
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            DS CARO product planning starts from care settings: dining rooms, resident rooms, and staff replenishment workflows.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <Card key={scenario.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <scenario.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComplianceSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-0 bg-[#1A365D] text-background shadow-sm">
            <CardContent className="p-7">
              <ShieldCheck className="mb-5 h-10 w-10 text-[#F4C27A]" />
              <h2 className="font-serif text-2xl font-bold md:text-3xl">
                Compliance and Classification Support
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-background/75">
                DS CARO supports SKU-level document review for buyer procurement, labeling, packaging, and target-market file checks.
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
                <BadgeCheck className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">Material Safety Review</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  RoHS / REACH-related material file requests can be reviewed by exact SKU and supplier file status where applicable.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardContent className="p-6">
                <ClipboardCheck className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">Non-Medical Classification Note</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Launch products are positioned as long-term care supplies and daily living aids, not medical treatment devices. Final classification depends on exact SKU, claims, labeling, and target market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export function OemCapabilityProofBlock() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              OEM Capability Proof
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Private Label Support for Care Product Buyers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Use DS CARO to prepare sample plans, packaging customization, SKU files, and bulk order logic before committing to a full product range.
            </p>
            <Link href="/rfq?source=oem-proof-block" className="mt-7 inline-flex">
              <Button className="bg-[#E67E22] text-white hover:bg-[#D35400]">
                Request OEM Quote
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {oemProof.map((item) => (
              <Card key={item.label} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <Factory className="mb-4 h-6 w-6 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
