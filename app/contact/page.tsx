"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TurnstileField, type TurnstileHandle } from "@/components/security/turnstile-field"
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
import { useLocale } from "@/components/locale-provider"
import { contactContent } from "@/lib/pages-i18n"

interface SubmissionState {
  leadId: string
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

export default function ContactPage() {
  const { locale } = useLocale()
  const c = contactContent[locale] ?? contactContent.en

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", subject: "", orderNumber: "", message: "",
    companyWebsite: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null)
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<TurnstileHandle>(null)

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

    const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(c.humanVerify)
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, cfTurnstileToken: turnstileToken }),
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
      setError(err instanceof Error ? err.message : c.sendError)
      turnstileRef.current?.reset()
      setTurnstileToken("")
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: MapPin, title: c.visitUs, lines: [siteConfig.address.display] },
    { icon: Phone, title: c.callUs, lines: [siteConfig.phoneDisplay, "Mon-Fri 8:00-18:00 (GMT+8)"] },
    { icon: Mail, title: c.emailUs, lines: [siteConfig.email] },
    { icon: Clock, title: c.businessHours, lines: ["Monday – Friday", "8:00 AM – 6:00 PM (GMT+8)"] },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#1A365D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("no-rinse-cleansing-foam-200-cln-200")}
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
              {c.badge}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">{c.heroTitle}</h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              {c.heroDesc}
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
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{c.thankYou}</h3>
                      <p className="text-muted-foreground mb-6">{c.thankYouDesc}</p>
                      {submissionState ? (
                        <div className="mx-auto mb-6 max-w-xl rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{c.leadStatus}</p>
                          <p className="mt-2">{c.leadId}: {submissionState.leadId}</p>
                          <p>{c.archive}: {submissionState.delivery.archive}</p>
                          <p>{c.emailNotify}: {submissionState.delivery.email}</p>
                          <p>{c.webhookSync}: {submissionState.delivery.webhook}</p>
                        </div>
                      ) : null}
                      <div className="flex flex-wrap justify-center gap-3">
                        <a href={whatsappHref("Hello, I submitted a DS CARO inquiry and would like to follow up.")} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact-success")}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {c.followUpWhatsApp}
                          </Button>
                        </a>
                        <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", orderNumber: "", message: "", companyWebsite: "" }) }}>
                          {c.sendAnother}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{c.formTitle}</h2>
                      <p className="text-muted-foreground mb-8">{c.formDesc}</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                          <label htmlFor="contact-companyWebsite">Company website</label>
                          <input id="contact-companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" value={formData.companyWebsite} onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.first} *</label>
                            <Input required placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.last} *</label>
                            <Input required placeholder="Smith" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.email} *</label>
                            <Input required type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.phone} <span className="text-muted-foreground font-normal">{c.phoneOptional}</span></label>
                            <Input type="tel" placeholder="+44 20 1234 5678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.subject} *</label>
                            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                              <SelectTrigger><SelectValue placeholder={c.selectSubject} /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wholesale">{c.wholesale}</SelectItem>
                                <SelectItem value="oem">{c.oem}</SelectItem>
                                <SelectItem value="spec">{c.spec}</SelectItem>
                                <SelectItem value="sample">{c.sample}</SelectItem>
                                <SelectItem value="order">{c.order}</SelectItem>
                                <SelectItem value="other">{c.other}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{c.orderRef} <span className="text-muted-foreground font-normal">{c.orderRefOptional}</span></label>
                            <Input placeholder="e.g. PO-2026-001" value={formData.orderNumber} onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">{c.message} *</label>
                          <Textarea required placeholder={c.messagePlaceholder} rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </div>

                        {error && (
                          <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            {error}
                          </p>
                        )}

                        <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} />

                        <Button type="submit" size="lg" className="h-12 w-full sm:w-auto" disabled={loading}>
                          {loading ? c.sending : (<><Send className="mr-2 h-4 w-4" /> {c.sendMessage}</>)}
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
                      <h3 className="font-semibold text-foreground mb-1">{c.whatsappTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{c.whatsappDesc}</p>
                      <a href={whatsappHref("Hello, I would like B2B pricing and product documentation for DS CARO incontinence skin care products.")} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact-page")}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          {c.chatWhatsapp}
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
                  <h3 className="font-semibold text-foreground mb-4">{c.whyPartner}</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Globe, text: c.statBuilt },
                      { icon: Building2, text: c.statOem },
                      { icon: CheckCircle, text: c.statCompliance },
                      { icon: Clock, text: c.statResponse },
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
                <p className="text-muted-foreground font-medium">{c.mapTitle}</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  {c.mapDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Prefer to call */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">{c.preferCall}</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {c.preferCallDesc}
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
                {c.whatsappUs}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
