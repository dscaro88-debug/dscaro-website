// JSON-LD Structured Data for DS CARO (Senior Care B2B)
import { siteConfig } from "@/lib/site-config"

const BASE_URL = 'https://dscaro.com'

// ─── Organization (homepage) ────────────────────────────────────────────────
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${BASE_URL}/#organization`,
        name: 'DS CARO',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/icon.svg`,
          width: 512,
          height: 512,
        },
        legalName: siteConfig.legalName,
        foundingDate: siteConfig.foundedYear,
        description: siteConfig.companyIntro,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        areaServed: {
          '@type': 'Continent',
          name: 'Europe',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: siteConfig.phoneHref,
          email: siteConfig.email,
          availableLanguage: ['English', 'Chinese'],
        },
        email: siteConfig.email,
        telephone: siteConfig.phoneHref,
        knowsAbout: [
          'Long-Term Care Products',
          'Dining Solutions',
          'Mobility & Transfer Supplies',
          'Daily Care Products',
          'Nursing Home Supplies',
          'Assisted Living Supplies',
          'Memory Care Supplies',
          'OEM/ODM Manufacturing',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'DS CARO',
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Product JSON-LD ─────────────────────────────────────────────────────────
interface ProductJsonLdProps {
  product: {
    name: string
    description: string
    slug: string
    image: string
    images: string[]
    price: number
    currencyCode: string
    inStock: boolean
    rating: number
    reviews: number
    vendor: string
    category: string
  }
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const productUrl = `${BASE_URL}/products/${product.slug}`

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: productUrl,
    image: product.images.length > 0 ? product.images : [product.image],
    brand: {
      '@type': 'Brand',
      name: product.vendor || 'DS CARO',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: product.currencyCode || 'EUR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'DS CARO',
      },
    },
    ...(product.reviews > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    category: product.category,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Breadcrumb JSON-LD ──────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Blog Post (Article) JSON-LD ──────────────────────────────────────────
interface BlogPostLdProps {
  post: {
    title: string
    excerpt: string
    slug: string
    image: string
    date: string
    author: string
    category: string
  }
  url: string
}

export function BlogPostJsonLd({ post, url }: BlogPostLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DS CARO',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.category,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── BlogPosting JSON-LD ────────────────────────────────────────────────────
interface BlogPostingJsonLdProps {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  image: string
  url: string
}

export function BlogPostingJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
  url,
}: BlogPostingJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image,
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DS CARO',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── FAQ JSON-LD ────────────────────────────────────────────────────────────
interface FaqItem {
  question: string
  answer: string
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
