"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TurnstileField, type TurnstileHandle } from "@/components/security/turnstile-field"
import {
  ArrowRight, DollarSign, CreditCard, Headphones, Package,
  CheckCircle, Shield, Lock, Clock, Building2
} from "lucide-react"
import { trackLeadSubmitted } from "@/lib/browser-analytics"
import { useLocale } from "@/components/locale-provider"
import { tradeAccountContent } from "@/lib/pages-i18n"

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

interface SubmissionState {
  leadId: string
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

export default function TradeAccountPage() {
  const { locale } = useLocale()
  const t = tradeAccountContent[locale] ?? tradeAccountContent.en

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
    companyWebsite: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submissionState, setSubmissionState] = useState<SubmissionState | null>(null)
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<TurnstileHandle>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (TURNSTILE_SITE_KEY && !turnstileToken) {
        throw new Error(t.humanVerify)
      }
      const res = await fetch("/api/trade-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cfTurnstileToken: turnstileToken,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || t.submitError)
      }
      const data = await res.json()
      setSubmissionState(data)
      trackLeadSubmitted("trade-account-application", data.leadId)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.submitError)
      turnstileRef.current?.reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Building2 className="h-4 w-4" />
            {t.badge}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{t.heroTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">{t.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.map((benefit, i) => {
              const BenefitIcon = [DollarSign, CreditCard, Headphones, Package][i] ?? Package
              return (
                <Card key={benefit.title} className="border-0 shadow-sm text-center hover-lift">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-4">
              {submitted ? t.submittedTitle : t.applyNow}
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              {submitted ? t.descSubmitted : t.descApply}
            </p>

            {submitted ? (
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                {submissionState ? (
                  <div className="mx-auto mb-6 max-w-xl rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{t.leadStatus}</p>
                    <p className="mt-2">{t.leadId}: {submissionState.leadId}</p>
                    <p>{t.archive}: {submissionState.delivery.archive}</p>
                    <p>{t.emailNotify}: {submissionState.delivery.email}</p>
                    <p>{t.webhookSync}: {submissionState.delivery.webhook}</p>
                  </div>
                ) : null}
                <Link href="/products">
                  <Button size="lg" className="h-12 px-8">
                    {t.browseCatalog}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.company} *</label>
                    <Input name="company" value={formData.company} onChange={handleChange} placeholder={t.companyPh} required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.name} *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder={t.namePh} required className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.email} *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t.emailPh} required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.phone}</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder={t.phonePh} className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.country} *</label>
                    <Input name="country" value={formData.country} onChange={handleChange} placeholder={t.countryPh} required className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.website}</label>
                    <Input name="website" value={formData.website} onChange={handleChange} placeholder={t.websitePh} className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.businessType} *</label>
                    <select
                      name="businessType" value={formData.businessType} onChange={handleChange} required
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t.selectBusinessType}</option>
                      {t.businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.productInterest} *</label>
                    <select
                      name="productInterests" value={formData.productInterests} onChange={handleChange} required
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t.selectProduct}</option>
                      {t.productInterests.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.orderVolume}</label>
                    <select
                      name="orderVolume" value={formData.orderVolume} onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t.selectVolume}</option>
                      <option value="50-100">{t.volume50_100}</option>
                      <option value="100-500">{t.volume100_500}</option>
                      <option value="500-1000">{t.volume500_1000}</option>
                      <option value="1000+">{t.volume1000plus}</option>
                      <option value="not-sure">{t.volumeNotSure}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.targetMarket}</label>
                    <Input name="targetMarket" value={formData.targetMarket} onChange={handleChange} placeholder={t.targetMarketPh} className="h-11" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.timeline}</label>
                    <select
                      name="timeline" value={formData.timeline} onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{t.selectTimeline}</option>
                      <option value="sample-now">{t.tlSample}</option>
                      <option value="first-order-30-days">{t.tl30}</option>
                      <option value="first-order-90-days">{t.tl90}</option>
                      <option value="catalog-planning">{t.tlCatalog}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t.oemNeeds}</label>
                    <Input name="oemNeeds" value={formData.oemNeeds} onChange={handleChange} placeholder={t.oemNeedsPh} className="h-11" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.message}</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.messagePh} rows={4} className="resize-none" />
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="trade-companyWebsite">Company website</label>
                  <input id="trade-companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" value={formData.companyWebsite} onChange={handleChange} />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    {t.privacyNote}
                  </p>
                </div>

                {error && (
                  <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} />

                <Button type="submit" size="lg" disabled={loading} className="w-full h-12 text-base font-semibold">
                  {loading ? (
                    <>{t.submitting}</>
                  ) : (
                    <><Lock className="mr-2 h-4 w-4" />{t.submitApplication}</>
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
            {t.trustItems.map((item, i) => {
              const TrustIcon = [Clock, Shield, CheckCircle, Headphones][i] ?? Clock
              return (
                <div key={item.title} className="text-center">
                  <TrustIcon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-background/60 mt-1">{item.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
