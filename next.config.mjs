/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Old long-term care category routes → new incontinence skin care category routes (301, keep SEO equity)
      { source: "/products/dining-solutions", destination: "/products/cleansing", permanent: true },
      { source: "/products/dining-solutions/:path*", destination: "/products/cleansing", permanent: true },
      { source: "/products/daily-care", destination: "/products/barrier-protection", permanent: true },
      { source: "/products/daily-care/:path*", destination: "/products/barrier-protection", permanent: true },
      { source: "/products/mobility-transfer", destination: "/products/barrier-protection", permanent: true },
      { source: "/products/mobility-transfer/:path*", destination: "/products/barrier-protection", permanent: true },
      { source: "/dining-care-products-for-elderly", destination: "/products/cleansing", permanent: true },
      // Old solution sub-pages and legacy entry pages → consolidated new pages (301)
      { source: "/solutions/nursing-homes", destination: "/solutions", permanent: true },
      { source: "/solutions/assisted-living", destination: "/solutions", permanent: true },
      { source: "/solutions/memory-care", destination: "/solutions", permanent: true },
      { source: "/long-term-care-distributors", destination: "/products", permanent: true },
      { source: "/nursing-home-supplies", destination: "/solutions", permanent: true },
      { source: "/assisted-living-supplies", destination: "/solutions", permanent: true },
      // Old blog slugs (auto-generated placeholder mismatched the article topic) → renamed to topic-matched slugs (301, keep SEO/GEO equity)
      { source: "/blog/bed-pads-and-bedding-care-sourcing-guide", destination: "/blog/no-rinse-cleansing-foam-best-practices", permanent: true },
      { source: "/blog/adult-bibs-for-care-facilities-buying-guide", destination: "/blog/barrier-cream-vs-skin-protectant-spray", permanent: true },
    ]
  },
}

export default nextConfig
