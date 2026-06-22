"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, PackageCheck, Send, ShieldCheck, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { trackLeadSubmitted } from "@/lib/browser-analytics"

const productCategories = [
  "Dining Solutions",
  "Mobility & Transfer",
  "Daily Care Supplies",
  "Mixed Long-Term Care Bundle",
]

const facilityTypes = ["Nursing Home", "Distributor", "Clinic", "Assisted Living", "Other"]

type FormVariant = "compact" | "full"

interface BulkOrderEntryFormProps {
  variant?: FormVariant
  source?: string
  defaultCategory?: string
  defaultProduct?: string
  defaultSku?: string
  onSuccess?: () => void
}

export function BulkOrderEntryForm({
  variant = "full",
  source = "bulk-order-entry",
  defaultCategory = "",
  defaultProduct = "",
  defaultSku = "",
  onSuccess,
}: BulkOrderEntryFormProps) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    facilityType: "Nursing Home",
    productCategory: defaultCategory || "Dining Solutions",
    product: defaultProduct,
    sku: defaultSku,
    estimatedQuantity: "",
    oemRequired: "No",
    country: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      productCategory: defaultCategory || current.productCategory,
      product: defaultProduct || current.product,
      sku: defaultSku || current.sku,
    }))
  }, [defaultCategory, defaultProduct, defaultSku])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const productValue =
        formData.product || formData.productCategory || "Mixed Long-Term Care Bundle"
      const quantityValue = formData.estimatedQuantity

      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          product: productValue,
          sku: formData.sku,
          quantity: quantityValue,
          facilityType: formData.facilityType,
          productCategory: formData.productCategory,
          estimatedQuantity: formData.estimatedQuantity,
          oemRequired: formData.oemRequired,
          packagingNeeds: formData.oemRequired === "Yes" ? "OEM / private label required" : "Standard packaging acceptable",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : source,
          message: `Bulk Order Entry Form. Facility Type: ${formData.facilityType}. Product Category: ${formData.productCategory}. Estimated Quantity: ${formData.estimatedQuantity}. OEM Required: ${formData.oemRequired}. Country: ${formData.country}. Source: ${source}.`,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Failed to submit bulk order request")
      }

      const data = await response.json()
      trackLeadSubmitted("request-quote", data.leadId)
      setSubmitted(true)
      onSuccess?.()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit. Please contact us by WhatsApp or email."
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">RFQ received.</p>
            <p className="mt-1 text-green-700">
              We will review quantity, OEM scope, country requirements, and reply with MOQ, FOB range, and lead time.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={variant === "compact" ? "space-y-3" : "space-y-5"}>
      <div className={variant === "compact" ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Contact Name *</span>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Business Email *</span>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" />
        </label>
      </div>

      {variant === "full" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-foreground">Company</span>
            <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-foreground">Phone / WhatsApp</span>
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+44..." />
          </label>
        </div>
      ) : null}

      <div className={variant === "compact" ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Facility Type *</span>
          <select
            name="facilityType"
            value={formData.facilityType}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {facilityTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Product Category *</span>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {productCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={variant === "compact" ? "grid gap-3" : "grid gap-4 sm:grid-cols-3"}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Estimated Quantity *</span>
          <Input name="estimatedQuantity" value={formData.estimatedQuantity} onChange={handleChange} required placeholder="e.g. 500 pcs" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">OEM Required *</span>
          <select
            name="oemRequired"
            value={formData.oemRequired}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">Country *</span>
          <Input name="country" value={formData.country} onChange={handleChange} required placeholder="Germany, UK..." />
        </label>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={loading} className="h-11 w-full bg-[#E67E22] text-white hover:bg-[#D35400]">
        {loading ? "Sending..." : "Send Bulk RFQ"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

function isProductDetailPath(pathname: string) {
  return /^\/products\/(?!$|dining-solutions$|mobility-transfer$|daily-care$)[^/]+$/.test(pathname)
}

export function QuoteConversionSystem() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    const currentPath = window.location.pathname
    setPathname(currentPath)

    const alreadyDismissed = sessionStorage.getItem("dscaro-quick-rfq-dismissed") === "1"
    if (alreadyDismissed || currentPath === "/rfq") {
      setDismissed(true)
      return
    }

    const timer = window.setTimeout(() => {
      setPopupOpen(true)
    }, 30000)

    const handleScroll = () => {
      if (!isProductDetailPath(window.location.pathname)) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const ratio = window.scrollY / scrollable
      if (ratio >= 0.6) {
        setPopupOpen(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const closePopup = () => {
    setPopupOpen(false)
    setDismissed(true)
    sessionStorage.setItem("dscaro-quick-rfq-dismissed", "1")
  }

  return (
    <>
      <Link
        href="/rfq?source=sticky-quote"
        className="fixed bottom-4 left-4 z-50 hidden rounded-full bg-[#E67E22] px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-[#D35400] sm:inline-flex sm:items-center sm:gap-2"
      >
        <PackageCheck className="h-4 w-4" />
        Get Bulk Quote
      </Link>

      <Link
        href="/rfq?source=mobile-sticky-quote"
        className="fixed bottom-4 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E67E22] text-white shadow-xl transition hover:bg-[#D35400] sm:hidden"
        aria-label="Get bulk quote"
      >
        <PackageCheck className="h-5 w-5" />
      </Link>

      {popupOpen && !dismissed ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/30 px-4 py-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <Badge className="mb-3 bg-primary text-primary-foreground">Quick RFQ</Badge>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Need bulk pricing for care supplies?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send facility type, category, quantity, OEM need, and country. We will reply with MOQ, FOB range, and lead time.
                </p>
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close quick RFQ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <BulkOrderEntryForm
              variant="compact"
              source={isProductDetailPath(pathname) ? "product-scroll-quick-rfq" : "30s-quick-rfq"}
              onSuccess={closePopup}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}

interface ProductQuotePanelProps {
  productName: string
  sku: string
  category: string
  moq: number
  sourcePage: string
}

export function ProductQuotePanel({
  productName,
  sku,
  category,
  moq,
  sourcePage,
}: ProductQuotePanelProps) {
  const rfqHref = `/rfq?product=${encodeURIComponent(productName)}&sku=${encodeURIComponent(sku)}&sourcePage=${encodeURIComponent(sourcePage)}`

  return (
    <section className="section-padding bg-muted/20">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-0 bg-[#1A365D] text-background shadow-sm">
            <CardContent className="p-7">
              <Badge className="mb-4 bg-background/15 text-background">Bulk Order Entry</Badge>
              <h2 className="font-serif text-2xl font-bold md:text-3xl">
                Quote this SKU for facility procurement
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-background/75">
                Tell us buyer type, quantity, country, and OEM scope. We prepare MOQ, FOB range, lead time, packing plan, and document status for {productName}.
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-4 w-4 text-[#F4C27A]" />
                  <span>MOQ reference: {moq} units</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-[#F4C27A]" />
                  <span>SKU, packing, and buyer file review</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-[#F4C27A]" />
                  <span>OEM / private label support available</span>
                </div>
              </div>
              <Link href={rfqHref} className="mt-7 inline-flex">
                <Button variant="secondary" className="h-11">
                  Request Quote for {sku}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold text-foreground">Fast bulk quote form</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pre-filled for {category}. Add quantity, country, and OEM need.
              </p>
              <div className="mt-5">
                <BulkOrderEntryForm
                  source="product-page-bulk-order"
                  defaultCategory={category}
                  defaultProduct={productName}
                  defaultSku={sku}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
