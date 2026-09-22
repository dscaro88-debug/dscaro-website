import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogPosts } from "@/lib/blog"
import { blogContent } from "@/lib/blog-content"
import { BlogPostView } from "@/components/blog-post-view"
import { BlogPostJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/seo/faq-section"
import { blogFaqs } from "@/lib/aeo-faqs"
import { siteConfig } from "@/lib/site-config"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const blogPostUrl = (slug: string) => `${siteConfig.siteUrl}/blog/${slug}`

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    alternates: { canonical: blogPostUrl(post.slug) },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
  const contentMap = blogContent[post.slug]
  const postUrl = blogPostUrl(post.slug)
  const faqs = blogFaqs[post.slug] ?? []

  return (
    <>
      <BlogPostJsonLd post={post} url={postUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Blog", url: `${siteConfig.siteUrl}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      {faqs.length > 0 ? <FaqJsonLd faqs={faqs} /> : null}
      <BlogPostView
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
        contentMap={contentMap}
        postUrl={postUrl}
      />
      {faqs.length > 0 ? (
        <FaqSection
          faqs={faqs}
          eyebrow="Article Questions"
          title="Questions this article answers"
          intro="Short answers to the buyer questions covered above, for quick reference and citation."
          ctaLabel="Request a quote"
          ctaHref={`/rfq?source=blog-${post.slug}`}
        />
      ) : null}
    </>
  )
}
