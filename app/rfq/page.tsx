"use client"

import { Suspense, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, Package, Shield } from "lucide-react"
import { TurnstileField, type TurnstileHandle } from "@/components/security/turnstile-field"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { trackLeadSubmitted } from "@/lib/browser-analytics"
import { useLocale } from "@/components/locale-provider"
import {
  rfqPageContent,
  rfqTranslations,
  buyerTypeOptionsLocalized,
  facilityTypeOptionsLocalized,
  productCategoryOptionsLocalized,
  monthlyVolumeOptionsLocalized,
  urgencyOptionsLocalized,
} from "@/lib/rfq-i18n"

interface SubmissionState {
  leadId: string
  leadScore?: number
  leadPriority?: string
  leadTags?: string[]
  delivery: {
    archive: string
    email: string
    webhook: string
  }
}

const standardRfqByLocale: Record<string, string> = {
  en: "Standard RFQ",
  ja: "標準RFQ",
  de: "Standard-RFQ",
  es: "RFQ estándar",
  fr: "RFQ standard",
  pt: "RFQ padrão",
  pl: "Standardowe RFQ",
}

const phPortByLocale: Record<string, string> = {
  en: "FOB Ningbo / destination port",
  ja: "FOB寧波 / 仕向港",
  de: "FOB Ningbo / Zielhafen",
  es: "FOB Ningbo / puerto de destino",
  fr: "FOB Ningbo / port de destination",
  pt: "FOB Ningbo / porto de destino",
  pl: "FOB Ningbo / port docelowy",
}

function RfqPageContent() {
  const { locale } = useLocale()
  const c = rfqPageContent[locale] ?? rfqPageContent.en
  const rfq = rfqTranslations[locale] ?? rfqTranslations.en
  const standardRfq = standardRfqByLocale[locale] ?? "Standard RFQ"

  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    buyerType: searchParams.get("buyerType") || "Nursing Home",
    facilityType: "Nursing Home",
    productCategory: searchParams.get("category") || "Cleansing",
    product: searchParams.get("product") || searchParams.get("kit") || "",
    sku: searchParams.get("sku") || "",
    quantity: "",
    estimatedQuantity: searchParams.get("quantity") || "",
    monthlyVolume: searchParams.get("monthlyVolume") || "100-500 units/month",
    urgencyLevel: searchParams.get("urgency") || "Need quote this week",
    oemRequired: searchParams.get("oem") || "No",
    targetMarket: "",
    destinationPort: "",
    packagingNeeds: "",
    certificationNeeds: "",
    sourcePage: searchParams.get("sourcePage") || "",
    message: "",
    companyWebsite: "",
  })
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<TurnstileHandle>(null)
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

    const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(rfq.completeVerification)
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, cfTurnstileToken: turnstileToken }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || rfq.submitErrorContact)
      }

      const data = await response.json()
      setSubmissionState(data)
      trackLeadSubmitted("request-quote", data.leadId)
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : rfq.submitErrorContact
      )
      turnstileRef.current?.reset()
      setTurnstileToken("")
    } finally {
      setLoading(false)
    }
  }

  const buyerTypes = buyerTypeOptionsLocalized[locale] ?? buyerTypeOptionsLocalized.en
  const facilityTypes = facilityTypeOptionsLocalized[locale] ?? facilityTypeOptionsLocalized.en
  const productCategories = productCategoryOptionsLocalized[locale] ?? productCategoryOptionsLocalized.en
  const monthlyVolumes = monthlyVolumeOptionsLocalized[locale] ?? monthlyVolumeOptionsLocalized.en
  const urgencies = urgencyOptionsLocalized[locale] ?? urgencyOptionsLocalized.en

  return (
    <>
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <FileText className="h-4 w-4" />
              {c.badge}
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {c.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {c.heroDesc}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-0 shadow-sm bg-muted/40">
              <CardContent className="p-7">
                <h2 className="text-2xl font-bold text-foreground">{c.whatToInclude}</h2>
                <ul className="mt-6 space-y-3">
                  {c.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4 rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>{c.sideNoteAi}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>{c.sideNoteCompliance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-7">
                <h2 className="text-2xl font-bold text-foreground">
                  {submitted ? c.formSubmittedTitle : c.formSendTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {submitted
                    ? c.submittedDesc
                    : c.typicalReply}
                </p>

                {submitted ? (
                  <div className="mt-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      {c.nextStep}
                    </p>
                    {submissionState ? (
                      <div className="mt-5 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{c.leadStatus}</p>
                        <p className="mt-2">{c.leadId} {submissionState.leadId}</p>
                        <p>{c.archive} {submissionState.delivery.archive}</p>
                        <p>{c.emailNotify} {submissionState.delivery.email}</p>
                        <p>{c.webhookSync} {submissionState.delivery.webhook}</p>
                        {typeof submissionState.leadScore === "number" ? (
                          <>
                            <p className="mt-2 font-medium text-foreground">
                              {c.leadPriorityLabel} {submissionState.leadPriority} ({submissionState.leadScore}/100)
                            </p>
                            <p>{c.tags} {submissionState.leadTags?.join(", ") || standardRfq}</p>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/products">
                        <Button>
                          {c.backToProducts}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/trade-account">
                        <Button variant="outline">{c.applyTrade}</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="rfqpage-companyWebsite">Company website</label>
                      <input id="rfqpage-companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" value={formData.companyWebsite} onChange={handleChange} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.companyName}</label>
                        <Input name="company" value={formData.company} onChange={handleChange} placeholder={c.phCompany} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.contactName}</label>
                        <Input name="name" value={formData.name} onChange={handleChange} required placeholder={c.phName} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.email}</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder={c.phEmail} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.phoneWhatsapp}</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder={c.phPhone} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.country}</label>
                        <Input name="country" value={formData.country} onChange={handleChange} required placeholder={c.phCountry} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.targetMarket}</label>
                        <Input name="targetMarket" value={formData.targetMarket} onChange={handleChange} placeholder={c.phTargetMarket} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.buyerType}</label>
                        <select
                          name="buyerType"
                          value={formData.buyerType}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {buyerTypes.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.facilityType}</label>
                        <select
                          name="facilityType"
                          value={formData.facilityType}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {facilityTypes.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.productCategory}</label>
                        <select
                          name="productCategory"
                          value={formData.productCategory}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {productCategories.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.monthlyVolume}</label>
                        <select
                          name="monthlyVolume"
                          value={formData.monthlyVolume}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {monthlyVolumes.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.urgencyLevel}</label>
                        <select
                          name="urgencyLevel"
                          value={formData.urgencyLevel}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          {urgencies.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.specificProduct}</label>
                        <Input name="product" value={formData.product} onChange={handleChange} required placeholder={c.phProduct} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.sku}</label>
                        <Input name="sku" value={formData.sku} onChange={handleChange} placeholder={c.phSku} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.estimatedQuantity}</label>
                        <Input name="estimatedQuantity" value={formData.estimatedQuantity} onChange={handleChange} required placeholder={c.phQuantity} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.oemRequired}</label>
                        <select
                          name="oemRequired"
                          value={formData.oemRequired}
                          onChange={handleChange}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          <option value="Yes">{rfq.yes}</option>
                          <option value="No">{rfq.no}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.destinationPort}</label>
                        <Input name="destinationPort" value={formData.destinationPort} onChange={handleChange} placeholder={c.phCountry} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.packagingNeeds}</label>
                        <Input name="packagingNeeds" value={formData.packagingNeeds} onChange={handleChange} placeholder={c.phPackaging} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">{c.certNeeds}</label>
                        <Input name="certificationNeeds" value={formData.certificationNeeds} onChange={handleChange} placeholder={c.phCert} />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">{c.message}</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                        placeholder={c.phMessage}
                      />
                    </div>

                    {error ? (
                      <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {error}
                      </p>
                    ) : null}

                    <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} />

                    <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                      {loading ? c.submitting : c.submitRfq}
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
