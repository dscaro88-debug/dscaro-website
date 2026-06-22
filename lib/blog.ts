// DS CARO Blog Data — Long-Term Care Supply Content

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
    title: 'Long-Term Care Supplies: A Three-Line Category Guide for B2B Buyers',
    excerpt: 'A practical guide to DS CARO\'s focused launch structure: Dining Solutions, Mobility & Transfer, and Daily Care Supplies for care facilities and distributors.',
    category: 'Market Insights',
    date: 'Jun 22, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/reusable-adult-bib-with-crumb-catcher-din-001',
    readTime: '8 min read',
  },
  {
    slug: 'adult-bibs-for-care-facilities-buying-guide',
    title: 'Adult Bibs for Care Facilities: What Buyers Should Check Before Ordering',
    excerpt: 'How to compare adult bibs, clothing protectors, closures, materials, washability, MOQ, and OEM packaging for nursing homes and assisted living channels.',
    category: 'Product Knowledge',
    date: 'Jun 18, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/premium-jewelry-clothing-protector-din-002',
    readTime: '6 min read',
  },
  {
    slug: 'underpads-and-bedding-care-sourcing-guide',
    title: 'Underpads and Bedding Care: Sourcing Notes for Long-Term Care Buyers',
    excerpt: 'Key checks for disposable underpads and bedding protection products, including size, absorbency, pack count, MOQ, and tiered FOB pricing.',
    category: 'Product Knowledge',
    date: 'Jun 12, 2026',
    author: 'DS CARO Team',
    image: '/product-visuals/disposable-adult-underpad-dcr-001',
    readTime: '7 min read',
  },
  {
    slug: 'oem-private-label-files-for-care-products',
    title: 'OEM and Private Label Files for Care Products: What Importers Should Prepare',
    excerpt: 'A simple checklist for SKU files, packaging requirements, logo placement, carton marks, product photos, and document-status review before quotation.',
    category: 'Industry Guides',
    date: 'Jun 6, 2026',
    author: 'DS CARO Team',
    image: '/products/daily-care/DS-DCR-002/DS-DCR-002_01_main_english.jpg',
    readTime: '7 min read',
  },
]
