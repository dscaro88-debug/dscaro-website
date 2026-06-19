"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowRight, DollarSign, CreditCard, Headphones, Package,
  CheckCircle, Shield, Lock, Clock, Building2
} from "lucide-react"
import { trackLeadSubmitted } from "@/lib/browser-analytics"

interface SubmissionState {
  leadId: string
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

export default function TradeAccountPage() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    website: "",
    businessType: "",
    orderVolume: "",
    productInterests: "",
    targetMarket: "",
    timeline: "",
    oemNeeds: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/trade-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Failed to submit your application")
      }
      const data = await res.json()
      setSubmissionState(data)
      trackLeadSubmitted("trade-account-application", data.leadId)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit your application. Please try again or contact us on WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    { icon: DollarSign, title: "Wholesale Pricing", desc: "Access exclusive B2B pricing tiers with volume discounts. Better margins for your business at every scale." },
    { icon: CreditCard, title: "Flexible Payment Terms", desc: "Qualified partners enjoy net payment terms. We work with you to find the right financial arrangement." },
    { icon: Headphones, title: "Dedicated Account Manager", desc: "A single point of contact who understands your business, market, and specific requirements." },
    { icon: Package, title: "Priority Sample Access", desc: "Request product samples at reduced rates. Test quality before committing to larger orders." },
  ]

  const businessTypes = [
    "Distributor / Importer", "Care Home / Nursing Home", "NHS Trust / Hospital",
    "Home Care Agency", "Healthcare Retailer", "Government / Local Authority", "Other",
  ]

  const productInterests = [
    "Dining Solutions",
    "Mobility & Transfer",
    "Daily Care",
    "Mixed Product Range",
  ]

  const trustItems = [
    { icon: Clock, title: "1 Business Day", desc: "Response time" },
    { icon: Shield, title: "100% Secure", desc: "Your data is protected" },
    { icon: CheckCircle, title: "No Obligation", desc: "Free to apply, no commitment" },
    { icon: Headphones, title: "Dedicated Support", desc: "Personal account manager" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Building2 className="h-4 w-4" />
            B2B Partnership
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Apply for Trade Account</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock exclusive B2B pricing, flexible terms, dedicated support, and OEM/ODM capabilities.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">Trade Account Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-sm text-center hover-lift">
                <CardContent className="p-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-4">
              {submitted ? "Application Submitted!" : "Apply Now"}
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              {submitted
                ? "Thank you for your interest. Our B2B team will review your application and respond within 1 business day."
                : "Fill in the form below and our B2B team will respond within 1 business day."
              }
            </p>

            {submitted ? (
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                {submissionState ? (
                  <div className="mx-auto mb-6 max-w-xl rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Lead status</p>
                    <p className="mt-2">Lead ID: {submissionState.leadId}</p>
                    <p>Archive: {submissionState.delivery.archive}</p>
                    <p>Email notify: {submissionState.delivery.email}</p>
                    <p>Webhook sync: {submissionState.delivery.webhook}</p>
                  </div>
                ) : null}
                <Link href="/products">
                  <Button size="lg" className="h-12 px-8">
                    Browse Product Catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company Name *</label>
                    <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Contact Name *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+44 1234 567890" className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Country *</label>
                    <Input name="country" value={formData.country} onChange={handleChange} placeholder="e.g., United Kingdom, Germany" required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company Website / Channel</label>
                    <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Business Type *</label>
                    <select
                      name="businessType" value={formData.businessType} onChange={handleChange} required
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select business type...</option>
                      {businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Product Interest *</label>
                    <select
                      name="productInterests" value={formData.productInterests} onChange={handleChange} required
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select product category...</option>
                      {productInterests.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Estimated Order Volume</label>
                    <select
                      name="orderVolume" value={formData.orderVolume} onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select volume range...</option>
                      <option value="50-100">50-100 units/month</option>
                      <option value="100-500">100-500 units/month</option>
                      <option value="500-1000">500-1,000 units/month</option>
                      <option value="1000+">1,000+ units/month</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Target Market</label>
                    <Input name="targetMarket" value={formData.targetMarket} onChange={handleChange} placeholder="UK, EU, US, Middle East..." className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Buying Timeline</label>
                    <select
                      name="timeline" value={formData.timeline} onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select timeline...</option>
                      <option value="sample-now">Need samples now</option>
                      <option value="first-order-30-days">First order within 30 days</option>
                      <option value="first-order-90-days">First order within 90 days</option>
                      <option value="catalog-planning">Planning catalog / supplier shortlist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">OEM / Private Label Needs</label>
                    <Input name="oemNeeds" value={formData.oemNeeds} onChange={handleChange} placeholder="Logo, color, packaging, barcode..." className="h-11" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message (Products of Interest, Requirements)</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about the products you're interested in and any specific requirements..." rows={4} className="resize-none" />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Your information is secure and will never be shared with third parties. We&apos;ll use it only to prepare your trade account application. Typical response time: within 1 business day.
                  </p>
                </div>

                {error && (
                  <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={loading} className="w-full h-12 text-base font-semibold">
                  {loading ? (
                    <>Submitting...</>
                  ) : (
                    <><Lock className="mr-2 h-4 w-4" />Submit Application</>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-[#1A365D] text-background">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-background/60 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
