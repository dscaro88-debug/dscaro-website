"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/lib/site-config"
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react"
import { useLocale } from "@/components/locale-provider"

export function Footer() {
  const { t } = useLocale()

  const productLinks = t.menu.products
  const solutionLinks = t.menu.solutions
  const resourceLinks = t.menu.resources

  const tradeLinks = [
    { href: "/trade-account", label: t.nav.tradeAccount },
    { href: "/rfq", label: t.nav.getQuote },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <footer className="bg-[#1A365D] text-background">
      {/* Newsletter Bar */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold">{t.footer.newsletter}</h3>
              <p className="text-sm text-background/60 mt-1">{t.footer.newsletterDesc}</p>
            </div>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 h-10 w-64 text-sm"
              />
              <Button type="submit" size="sm" className="h-10 px-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-medium text-sm">
                {t.footer.subscribe} <ArrowRight className="ml-1.5 h-4 w-4" />
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
                <div className="text-xs text-background/50 leading-tight tracking-wider uppercase">Incontinence Skin Care</div>
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
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">{t.nav.products}</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">{t.nav.solutions}</h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">{t.nav.resources}</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">{t.nav.wholesale}</h4>
            <ul className="space-y-2.5">
              {tradeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/50 hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/trade-account" className="mt-4 inline-block">
              <Button size="sm" className="h-9 text-sm bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                {t.nav.tradeAccount}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/40">
            <p>&copy; {new Date().getFullYear()} DS CARO. {t.footer.rights}.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-background/60 transition-colors">{t.footer.privacy}</Link>
              <Link href="/terms" className="hover:text-background/60 transition-colors">{t.footer.terms}</Link>
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
