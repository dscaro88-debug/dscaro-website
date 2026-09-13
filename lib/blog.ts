// DS CARO Blog Data — Adult Incontinence Skin Care Content

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'Market Insights' | 'Product Knowledge' | 'Industry Guides' | 'Company News'
  date: string
  author: string
  image: string
  readTime: string
  content?: string // HTML content for full blog post pages
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'long-term-care-supplies-category-guide',
    title: 'Adult Incontinence Skin Care: A Three-Line Category Guide for B2B Buyers',
    excerpt: 'A practical guide to DS CARO\'s focused launch structure: Cleansing, Barrier Protection, and Complete Care Kits for care facilities and distributors.',
    category: 'Market Insights',
    date: 'Jun 22, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/no-rinse-cleansing-foam-200-cln-200',
    readTime: '8 min read',
  },
  {
    slug: 'adult-bibs-for-care-facilities-buying-guide',
    title: 'Barrier Cream vs Skin Protectant Spray: What Care Buyers Should Know',
    excerpt: 'How to compare zinc oxide and dimethicone barrier creams with no-sting film-forming skin protectant sprays — materials, ease of removal, CHG compatibility, MOQ, and OEM packaging.',
    category: 'Product Knowledge',
    date: 'Jun 18, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/adult-barrier-cream-crm-100',
    readTime: '6 min read',
  },
  {
    slug: 'bed-pads-and-bedding-care-sourcing-guide',
    title: 'No-Rinse Cleansing Foam: Best Practices for Daily Incontinence Care',
    excerpt: 'Why pH-balanced, fragrance-free no-rinse cleansing reduces friction on fragile skin — pack sizes, unit cost, and replenishment planning for facilities.',
    category: 'Product Knowledge',
    date: 'Jun 12, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/no-rinse-cleansing-foam-500-cln-500',
    readTime: '7 min read',
  },
  {
    slug: 'oem-private-label-files-for-care-products',
    title: 'OEM and Private Label Files for Incontinence Skin Care: What Importers Should Prepare',
    excerpt: 'A simple checklist for SKU files, packaging requirements, logo placement, carton marks, language labels, product photos, and document-status review before quotation.',
    category: 'Industry Guides',
    date: 'Jun 6, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/incontinence-skin-care-kit-kit-001',
    readTime: '7 min read',
  },
]
