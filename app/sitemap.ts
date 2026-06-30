import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { allProducts, productCategories } from '@/lib/products'
import { procurementDecisionPageList } from '@/lib/procurement-decision-pages'
import { siteConfig } from '@/lib/site-config'

const BASE_URL = siteConfig.siteUrl
const SITE_LAST_MODIFIED = new Date('2026-06-30T00:00:00.000Z')

const blogLastModified = (date: string) => {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? SITE_LAST_MODIFIED : parsed
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/solutions`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/solutions/nursing-homes`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/solutions/assisted-living`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/solutions/memory-care`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nursing-home-supplies`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/assisted-living-supplies`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/long-term-care-distributors`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dining-care-products-for-elderly`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/rfq`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/trade-account`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const categoryPages = productCategories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const trustPageEntries = procurementDecisionPageList.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const productPages = allProducts.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: blogLastModified(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...trustPageEntries, ...categoryPages, ...productPages, ...blogPages]
}
