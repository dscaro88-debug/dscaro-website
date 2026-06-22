"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/lib/site-config"
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react"

export function Footer() {
  const productLinks = [
    { href: "/products/dining-solutions", label: "Dining Solutions" },
    { href: "/products/mobility-transfer", label: "Mobility & Transfer" },
    { href: "/products/daily-care", label: "Daily Care Supplies" },
  ]

  const solutionLinks = [
    { href: "/nursing-home-supplies", label: "Nursing Home Supplies" },
    { href: "/assisted-living-supplies", label: "Assisted Living Supplies" },
    { href: "/long-term-care-distributors", label: "LTC Distributors" },
    { href: "/dining-care-products-for-elderly", label: "Elderly Dining Care" },
    { href: "/solutions/memory-care", label: "Memory Care" },
  ]

  const resourceLinks = [
    { href: "/why-dscaro", label: "Why DS CARO" },
    { href: "/how-to-order-bulk", label: "How to Order Bulk" },
    { href: "/oem-private-label-process", label: "OEM Private Label" },
    { href: "/quality-certifications", label: "Quality & Certifications" },
    { href: "/blog", label: "Blog & Insights" },
    { href: "/blog?category=guides", label: "Product Guides" },
  ]

  const tradeLinks = [
    { href: "/trade-account", label: "Trade Account" },
    { href: "/rfq", label: "Request a Quote" },
    { href: "/rfq/dashboard", label: "RFQ Dashboard" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer className="bg-[#1A365D] text-background">
      {/* Newsletter Bar */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold">Stay Updated</h3>
              <p className="text-sm text-background/60 mt-1">New products, industry news, and trade pricing for care professionals.</p>
            </div>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your business email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 h-10 w-64 text-sm"
              />
              <Button type="submit" size="sm" className="h-10 px-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-medium text-sm">
                Subscribe <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded bg-background text-foreground flex items-center justify-center font-bold text-sm">
                DS
              </div>
              <div>
                <div className="font-bold text-base leading-tight">DS CARO</div>
                <div className="text-xs text-background/50 leading-tight tracking-wider uppercase">Long-Term Care Supply</div>
              </div>
            </Link>
            <p className="mt-3 text-sm text-background/60 leading-relaxed max-w-xs">
              {siteConfig.companyIntro}
            </p>
            <div className="mt-3 space-y-1.5">
              <a href="https://maps.google.com/?q=Jinhua,Zhejiang,China" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm group">
                <MapPin className="h-4 w-4 text-background/40" />
                <span className="text-background/50 group-hover:text-background transition-colors">{siteConfig.address.display}</span>
              </a>
              <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2 text-sm group">
                <Phone className="h-4 w-4 text-background/40" />
                <span className="text-background/50 group-hover:text-background transition-colors">{siteConfig.phoneDisplay}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm group">
                <Mail className="h-4 w-4 text-background/40" />
                <span className="text-background/50 group-hover:text-background transition-colors">{siteConfig.email}</span>
              </a>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm group">
                <MessageCircle className="h-4 w-4 text-background/40" />
                <span className="text-background/50 group-hover:text-background transition-colors">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Solutions</h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">For Buyers</h4>
            <ul className="space-y-2.5">
              {tradeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/trade-account" className="mt-4 inline-block">
              <Button size="sm" className="h-9 text-sm bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                Apply Trade Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/40">
            <p>&copy; {new Date().getFullYear()} DS CARO. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-background/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-background/60 transition-colors">Terms of Service</Link>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="hidden sm:inline">{siteConfig.address.display}</span>
              <span className="hidden sm:inline">{siteConfig.email}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
