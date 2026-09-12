"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Globe, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { locales, localeNames, localeFlags } from "@/lib/i18n"
import { useLocale } from "@/components/locale-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const { locale, setLocale, t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[#1A365D] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-9 text-xs">
            <p className="hidden md:flex items-center gap-2 font-medium tracking-wide">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded text-[10px]">B2B</span>
              Adult Incontinence Skin Care | OEM/ODM | Documents Reviewed by SKU
          </p>
          <p className="md:hidden text-[11px] opacity-90">
            B2B | Incontinence Skin Care | OEM/ODM
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="hidden sm:flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3 w-3" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="h-3 w-3" />
              <span>WhatsApp</span>
            </a>
            <div className="w-px h-4 bg-white/20" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-xs">
                  <Globe className="h-3 w-3" />
                  <span className="uppercase font-medium">{locale}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {locales.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => setLocale(l)}
                    className={cn("cursor-pointer", locale === l && "bg-muted")}
                  >
                    <span className="mr-2">{localeFlags[l]}</span>
                    {localeNames[l]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform font-serif">
                  DS
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif font-semibold text-lg text-foreground leading-tight tracking-tight">DS CARO</div>
                <div className="text-[10px] text-muted-foreground leading-tight tracking-widest uppercase">Incontinence Skin Care</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {t.nav.home}
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                  {t.nav.products}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productsOpen && "rotate-180")} />
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[280px]">
                      {t.menu.products.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                        </Link>
                      ))}
                      <div className="border-t border-border/50 mt-2 pt-2">
                        <Link
                          href="/products"
                          className="flex items-center justify-between px-4 py-2 text-sm font-medium text-primary hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          {t.products.viewAll}
                          <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                  {t.nav.solutions}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", solutionsOpen && "rotate-180")} />
                </button>
                {solutionsOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[300px]">
                      {t.menu.solutions.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                  {t.nav.resources}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", resourcesOpen && "rotate-180")} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[280px]">
                      {t.menu.resources.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {t.nav.about}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/trade-account" className="hidden sm:block">
                <Button variant="outline" size="sm" className="h-9 text-xs font-medium">
                  {t.nav.tradeAccount}
                </Button>
              </Link>
              <Link href="/rfq?source=header-cta">
                <Button size="sm" className="h-9 text-xs font-medium bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                  {t.nav.getQuote}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b animate-fade-in">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-1">
              <Link href="/" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
              <Link href="/products" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.products}</Link>
              <div className="grid grid-cols-1 gap-1 pl-3">
                {t.menu.products.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link href="/solutions" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.solutions}</Link>
              <Link href="/why-dscaro" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.whyUs}</Link>
              <Link href="/how-to-order-bulk" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.resources}</Link>
              <Link href="/oem-private-label-process" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.resources}</Link>
              <Link href="/blog" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.blog}</Link>
              <Link href="/about" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.about}</Link>
              <Link href="/contact" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
              <div className="border-t my-3" />
              <Link href="/rfq?source=mobile-menu-cta" className="px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                {t.nav.getQuote} →
              </Link>
              <Link href="/trade-account" className="px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                {t.nav.tradeAccount} →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
