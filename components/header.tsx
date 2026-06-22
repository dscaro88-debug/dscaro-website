"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Globe, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const locales = [
  { code: "en", name: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "ja", name: "日本語", flag: "\u{1F1EF}\u{1F1F5}" },
]

const products = [
  {
    name: "Dining Solutions",
    href: "/products/dining-solutions",
    desc: "Adult bibs, clothing protectors, dining aprons for care homes",
  },
  {
    name: "Mobility & Transfer",
    href: "/products/mobility-transfer",
    desc: "Transfer support, walking aids, and positioning products",
  },
  {
    name: "Daily Care Supplies",
    href: "/products/daily-care",
    desc: "Hygiene, incontinence, and bedding protection supplies",
  },
]

const solutions: Array<{ name: string; href: string; desc: string; badge?: string }> = [
  {
    name: "Nursing Homes",
    href: "/solutions/nursing-homes",
    desc: "Bulk dining & care supplies for skilled nursing facilities",
  },
  {
    name: "Assisted Living",
    href: "/solutions/assisted-living",
    desc: "Dignified, practical supplies for assisted living communities",
  },
  {
    name: "Memory Care",
    href: "/solutions/memory-care",
    desc: "Specialized supplies for memory care units",
  },
]

const resourcesItems = [
  { name: "Blog", href: "/blog", desc: "Industry insights & care trends" },
  { name: "Product Guides", href: "/blog?category=guides", desc: "How-to guides for care products" },
  { name: "Industry Insights", href: "/blog?category=insights", desc: "Market trends & analysis" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [locale, setLocale] = useState("en")
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
              Long-Term Care Supply | OEM/ODM | Documents Reviewed by SKU
          </p>
          <p className="md:hidden text-[11px] opacity-90">
            B2B | OEM/ODM | SKU Docs
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
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {locales.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={cn("cursor-pointer", locale === l.code && "bg-muted")}
                  >
                    <span className="mr-2">{l.flag}</span>
                    {l.name}
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
                <div className="text-[10px] text-muted-foreground leading-tight tracking-widest uppercase">Long-Term Care Supply</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                Home
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                  Products
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productsOpen && "rotate-180")} />
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[280px]">
                      {products.map((item) => (
                        <Link
                          key={item.name}
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
                          View All Products
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
                  Solutions
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", solutionsOpen && "rotate-180")} />
                </button>
                {solutionsOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[300px]">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex flex-col px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent">
                                {item.badge}
                              </span>
                            )}
                          </div>
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
                  Resources
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", resourcesOpen && "rotate-180")} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border/50 p-2 min-w-[280px]">
                      {resourcesItems.map((item) => (
                        <Link
                          key={item.name}
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
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/trade-account" className="hidden sm:block">
                <Button variant="outline" size="sm" className="h-9 text-xs font-medium">
                  Trade Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="sm" className="h-9 text-xs font-medium bg-[#E67E22] hover:bg-[#D35400] text-white border-0">
                  Get Quote
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
              <Link href="/" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/products" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Products</Link>
              <div className="grid grid-cols-1 gap-1 pl-3">
                {products.map((item) => (
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
              <Link href="/solutions" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Solutions</Link>
              <Link href="/blog" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Resources</Link>
              <Link href="/about" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/contact" className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="border-t my-3" />
              <Link href="/trade-account" className="px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                Apply for Trade Account →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
