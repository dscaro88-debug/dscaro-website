import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/account/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://dscaro.com/sitemap.xml',
    host: 'https://dscaro.com',
  }
}
