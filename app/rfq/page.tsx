"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, Package, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site-config"
import { trackLeadSubmitted } from "@/lib/browser-analytics"

interface SubmissionState {
  leadId: string
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

function RfqPageContent() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    facilityType: "Nursing Home",
    productCategory: searchParams.get("category") || "Dining Solutions",
    product: searchParams.get("product") || searchParams.get("kit") || "",
    sku: searchParams.get("sku") || "",
    quantity: "",
    estimatedQuantity: searchParams.get("quantity") || "",
    oemRequired: searchParams.get("oem") || "No",
    targetMarket: "",
    destinationPort: "",
    packagingNeeds: "",
    certificationNeeds: "",
    sourcePage: searchParams.get("sourcePage") || "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Failed to submit RFQ")
      }

      const data = await response.json()
      setSubmissionState(data)
      trackLeadSubmitted("request-quote", data.leadId)
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit your RFQ. Please try again or contact us on WhatsApp."
      )
    } finally {
      setLoading(false)
    }
  }

  const checklist = [
    "Target SKU or category",
    "Estimated quantity / MOQ target",
    "Destination market or port",
    "Packaging / OEM requirements",
    "Requested certificate or test file status",
  ]

  return (
    <>
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <FileText className="h-4 w-4" />
              Request for Quotation
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              Request MOQ, FOB, Lead Time, and Current Document Status
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Use this bulk order entry form when you already know the facility type, product category, estimated quantity, OEM requirement, and country.
              We will reply with pricing, packaging options, lead time, and supplier-file status by SKU.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-0 shadow-sm bg-muted/40">
              <CardContent className="p-7">
                <h2 className="text-2xl font-bold text-foreground">What to include</h2>
                <ul className="mt-6 space-y-3">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4 rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>Current website visuals are internal AI-generated placeholders for launch readiness.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>{siteConfig.complianceLong}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <h2 className="text-2xl font-bold text-foreground">
                  {submitted ? "RFQ Submitted" : "Send RFQ"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {submitted
                    ? "Your RFQ is recorded. The team will review product scope, MOQ, and document status."
                    : "Typical reply time: within 1 business day."}
                </p>

                {submitted ? (
                  <div className="mt-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Next step: keep WhatsApp and email available for follow-up on sample timing, packaging, and supplier file checks.
                    </p>
                    {submissionState ? (
                      <div className="mt-5 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Lead status</p>
                        <p className="mt-2">Lead ID: {submissionState.leadId}</p>
                        <p>Archive: {submissionState.delivery.archive}</p>
                        <p>Email notify: {submissionState.delivery.email}</p>
                        <p>Webhook sync: {submissionState.delivery.webhook}</p>
                      </div>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/products">
                        <Button>
                          Back to Products
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/trade-account">
                        <Button variant="outline">Apply for Trade Account</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Company Name</label>
                        <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Contact Name *</label>
                        <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Phone / WhatsApp</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+44 1234 567890" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Country *</label>
                        <Input name="country" value={formData.country} onChange={handleChange} required placeholder="United Kingdom, Germany, etc." />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Target Market</label>
                        <Input name="targetMarket" value={formData.targetMarket} onChange={handleChange} placeholder="UK retail, EU distributor, care-home project..." />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Facility Type *</label>
                        <select
                          name="facilityType"
                          value={formData.facilityType}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {["Nursing Home", "Distributor", "Clinic", "Assisted Living", "Other"].map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Product Category *</label>
                        <select
                          name="productCategory"
                          value={formData.productCategory}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {["Dining Solutions", "Mobility & Transfer", "Daily Care Supplies", "Mixed Long-Term Care Bundle"].map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Specific Product / Category *</label>
                        <Input name="product" value={formData.product} onChange={handleChange} required placeholder="Product name or category" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">SKU</label>
                        <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="DS-DIN-001" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Estimated Quantity *</label>
                        <Input name="estimatedQuantity" value={formData.estimatedQuantity} onChange={handleChange} required placeholder="e.g. 500 pcs / 60 bags" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">OEM Required *</label>
                        <select
                          name="oemRequired"
                          value={formData.oemRequired}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Destination Port</label>
                        <Input name="destinationPort" value={formData.destinationPort} onChange={handleChange} placeholder="FOB Ningbo / destination port" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Packaging / OEM Needs</label>
                        <Input name="packagingNeeds" value={formData.packagingNeeds} onChange={handleChange} placeholder="Logo, carton, insert, barcode..." />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Certificate / Test File Needs</label>
                        <Input name="certificationNeeds" value={formData.certificationNeeds} onChange={handleChange} placeholder="CE, ISO, test report, pending check..." />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                        placeholder="Tell us the SKUs, price target, packaging scope, document status you need checked, and timeline."
                      />
                    </div>

                    {error ? (
                      <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {error}
                      </p>
                    ) : null}

                    <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                      {loading ? "Submitting..." : "Submit RFQ"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default function RfqPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-muted/30" />}>
      <RfqPageContent />
    </Suspense>
  )
}
