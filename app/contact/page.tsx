"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { siteConfig, whatsappHref } from "@/lib/site-config"
import {
  MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle,
  Send, CheckCircle, Globe, Building2,
} from "lucide-react"
import { trackLeadSubmitted, trackWhatsAppClick } from "@/lib/browser-analytics"
import { buildProductVisualPath } from "@/lib/products"

interface SubmissionState {
  leadId: string
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", subject: "", orderNumber: "", message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const product = params.get("product")
    const sku = params.get("sku")
    const subject = params.get("subject")
    const service = params.get("service")

    if (!product && !sku && !subject && !service) return

    setFormData((prev) => ({
      ...prev,
      subject: service === "oem" ? "oem" : subject?.toLowerCase().includes("spec") ? "spec" : "wholesale",
      orderNumber: sku || prev.orderNumber,
      message: [
        service === "oem" ? "Service of interest: OEM/ODM partnership" : "",
        product ? `Product of interest: ${product}` : "",
        sku ? `SKU: ${sku}` : "",
        subject ? `Request type: ${subject}` : "",
        "",
        "Please send B2B pricing, MOQ, lead time, current document status, and available OEM/private label options.",
      ].filter(Boolean).join("\n"),
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Failed to submit")
      }
      const data = await res.json()
      setSubmissionState(data)
      trackLeadSubmitted("contact-form", data.leadId)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send your inquiry. Please try again or contact us on WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: MapPin, title: "Visit Us", lines: [siteConfig.address.display] },
    { icon: Phone, title: "Call Us", lines: [siteConfig.phoneDisplay, "Mon-Fri 8:00-18:00 (GMT+8)"] },
    { icon: Mail, title: "Email Us", lines: [siteConfig.email] },
    { icon: Clock, title: "Business Hours", lines: ["Monday – Friday", "8:00 AM – 6:00 PM (GMT+8)"] },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#1A365D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("reusable-adult-bib-with-crumb-catcher-din-001")}
            alt="DS CARO contact and inquiry visual"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F3C]/92 via-[#1A365D]/76 to-[#E67E22]/44" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_44%,rgba(255,221,181,0.22),transparent_34%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white mb-6">
              <MessageCircle className="h-4 w-4" />
              B2B Inquiries Welcome
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              Get in touch with our B2B team. Whether you&apos;re a distributor, importer, or care facility buyer, we&apos;re here to help you source long-term care supplies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form — 3 cols */}
            <div className="lg:col-span-3">
              <Card className="border shadow-sm">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">Your inquiry has been received. Our B2B team will respond within 1 business day.</p>
                      {submissionState ? (
                        <div className="mx-auto mb-6 max-w-xl rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">Lead status</p>
                          <p className="mt-2">Lead ID: {submissionState.leadId}</p>
                          <p>Archive: {submissionState.delivery.archive}</p>
                          <p>Email notify: {submissionState.delivery.email}</p>
                          <p>Webhook sync: {submissionState.delivery.webhook}</p>
                        </div>
                      ) : null}
                      <div className="flex flex-wrap justify-center gap-3">
                        <a href={whatsappHref("Hello, I submitted a DS CARO inquiry and would like to follow up.")} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact-success")}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Follow Up on WhatsApp
                          </Button>
                        </a>
                        <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", orderNumber: "", message: "" }) }}>
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                      <p className="text-muted-foreground mb-8">Fill out the form below and our B2B team will respond within 1 business day. We now archive every submission before delivery, so the lead does not disappear even if email/webhook needs retry.</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                            <Input required placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                            <Input required placeholder="Smith" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                            <Input required type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Phone Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                            <Input type="tel" placeholder="+44 20 1234 5678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                              <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                                <SelectItem value="oem">OEM/ODM Partnership</SelectItem>
                                <SelectItem value="spec">Spec Sheet / Catalog Request</SelectItem>
                                <SelectItem value="sample">Sample Request</SelectItem>
                                <SelectItem value="order">Order Inquiry</SelectItem>
                                <SelectItem value="other">General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Order / Reference Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                            <Input placeholder="e.g. PO-2026-001" value={formData.orderNumber} onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                          <Textarea required placeholder="Tell us about your business and what you're looking for..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </div>

                        {error && (
                          <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            {error}
                          </p>
                        )}

                        <Button type="submit" size="lg" className="h-12 w-full sm:w-auto" disabled={loading}>
                          {loading ? "Sending..." : (<><Send className="mr-2 h-4 w-4" /> Send Message</>)}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info — 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item) => (
                <Card key={item.title} className="border shadow-sm hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-sm text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* WhatsApp Card */}
              <Card className="border-2 border-green-200 bg-green-50/50 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mb-3">Chat with us directly for quick responses</p>
                      <a href={whatsappHref("Hello, I would like B2B pricing and product documentation for DS CARO senior care products.")} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact-page")}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Chat on WhatsApp
                          <MessageCircle className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Why Partner with DS CARO</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Globe, text: "Built for distributor and care-channel sourcing" },
                      { icon: Building2, text: "OEM/ODM for care homes & distributors" },
                      { icon: CheckCircle, text: siteConfig.complianceShort },
                      { icon: Clock, text: "1 business day response time" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <item.icon className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="aspect-[21/9] rounded-2xl bg-muted overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Jinhua, Zhejiang, China</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Manufacturing & Export Hub — 2 hours from Shanghai / Ningbo Port
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Prefer to call */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Prefer to Call?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our B2B sales team is available Monday through Friday, 8:00 AM to 6:00 PM (GMT+8). We speak English and Japanese.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phoneHref}`}>
              <Button size="lg" variant="secondary" className="h-12 px-8">
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.phoneDisplay}
              </Button>
            </a>
            <a href={whatsappHref("Hello, I would like to speak with DS CARO about a B2B inquiry.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
