"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/blog"
import { buildProductVisualPath } from "@/lib/products"
import { ArrowRight, Calendar, Tag, Search } from "lucide-react"

const categories = ["All", "Market Insights", "Product Knowledge", "Industry Guides", "Company News"] as const
type Category = typeof categories[number]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#1A365D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={buildProductVisualPath("disposable-adult-underpad-dcr-001")}
            alt="DS CARO knowledge hub visual"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F3C]/92 via-[#1A365D]/74 to-[#E67E22]/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,221,181,0.22),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              Knowledge Hub
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">
              Industry Insights & News
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              Practical sourcing notes, product guides, and market ideas for long-term care distributors, nursing homes, and assisted living buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b border-border bg-card sticky top-[112px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 w-full sm:w-[240px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setActiveCategory("All"); setSearchQuery("") }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full">
                    <Card className="h-full overflow-hidden hover-lift border-0 shadow-sm">
                      <div className="aspect-[3/2] relative overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground text-xs">{post.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                          <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{post.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                        <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-br from-[#0D1F3C] via-[#1A365D] to-[#E67E22] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Ahead of the Market</h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest senior care market insights, product updates,
            and exclusive B2B offers delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your business email"
              className="bg-white/15 border-white/25 text-white placeholder:text-white/55 h-11 flex-1"
            />
            <Button type="submit" variant="secondary" className="h-11 px-6 font-medium">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-white/55 mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>
    </>
  )
}
