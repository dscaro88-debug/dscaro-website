"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/components/locale-provider"
import type { Locale } from "@/lib/i18n"
import { blogContent } from "@/lib/pages-i18n"
import { blogCtaContent } from "@/lib/blog-cta-i18n"
import { getLocalizedCategory } from "@/lib/product-i18n"
import { productCategories } from "@/lib/products"
import type { BlogPost } from "@/lib/blog"
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2, Clock } from "lucide-react"

export function BlogPostView({
  post,
  prevPost,
  nextPost,
  contentMap,
  postUrl,
}: {
  post: BlogPost
  prevPost: BlogPost | null
  nextPost: BlogPost | null
  contentMap: Record<Locale, string> | undefined
  postUrl: string
}) {
  const { locale } = useLocale()
  const c = blogContent[locale] ?? blogContent.en
  const cta = blogCtaContent[locale] ?? blogCtaContent.en
  const relatedCategories = productCategories.filter((cat) =>
    ["cleansing", "barrier-protection", "complete-care-kits"].includes(cat.slug)
  )
  const content = contentMap?.[locale] ?? contentMap?.en ?? null

  const catLabel = (key: string): string => {
    if (key === "Market Insights") return c.catMarketInsights
    if (key === "Product Knowledge") return c.catProductKnowledge
    if (key === "Industry Guides") return c.catIndustryGuides
    if (key === "Company News") return c.catCompanyNews
    return key
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <Image
          src={post.image.replace("w=600&h=400", "w=1920&h=800")}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              {catLabel(post.category)}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">{c.detailHome}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">{c.detailBlog}</Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {content ? (
            <div
              className="prose prose-lg prose-stone max-w-none
                prose-headings:font-serif prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-table:border prose-table:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2
                [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                {c.comingSoon}
              </p>
              <Link href="/blog">
                <Button>{c.backToBlog}</Button>
              </Link>
            </div>
          )}

          <Separator className="my-12" />

          {/* Share and Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Share2 className="h-4 w-4" />
                {c.shareLabel}
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Tags */}
            <Badge variant="outline" className="text-xs">
              {catLabel(post.category)}
            </Badge>
          </div>

          {/* Prev / Next Navigation */}
          <div className="grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <Card className="border hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{c.prevArticle}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {prevPost.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <Card className="border hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-4 flex items-start justify-end gap-3 text-right">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{c.nextArticle}</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {nextPost.title}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ) : <div />}
          </div>

          {/* Related Products CTA */}
          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
            <div className="mb-6 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">{cta.heading}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{cta.desc}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedCategories.map((cat) => {
                const lc = getLocalizedCategory(cat, locale)
                return (
                  <Link key={cat.slug} href={`/products/${cat.slug}`} className="group">
                    <Card className="h-full border hover:border-primary/50 transition-colors">
                      <CardContent className="p-5">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lc.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {lc.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          {cta.viewProducts}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
            <div className="mt-6 text-center">
              <Link href="/rfq">
                <Button size="lg">
                  {cta.requestQuote}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Back to Blog CTA */}
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToAll}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
