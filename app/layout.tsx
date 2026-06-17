import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/components/locale-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { OrganizationJsonLd } from '@/components/seo/json-ld'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import './globals.css'

const tikTokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const isVercelProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'

export const metadata: Metadata = {
  metadataBase: new URL('https://dscaro.com'),
  title: {
    default: 'DS CARO — Global Senior Care & Mobility Solutions | B2B OEM/ODM Manufacturer',
    template: '%s | DS CARO'
  },
  description: 'DS CARO is a trusted B2B manufacturer and supplier of senior care products — mobility aids, bathroom safety, daily living aids, and home care solutions. OEM/ODM services for distributors, importers, and healthcare providers worldwide.',
  keywords: [
    'senior care products manufacturer',
    'mobility aids wholesale',
    'bathroom safety equipment OEM',
    'elderly care products supplier',
    'daily living aids B2B',
    'home care products factory',
    'geriatric care equipment',
    'aging population solutions',
    'OEM senior care products',
    'wholesale elderly aids',
  ],
  authors: [{ name: 'DS CARO' }],
  creator: 'DS CARO',
  publisher: 'DS CARO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dscaro.com',
    siteName: 'DS CARO',
    title: 'DS CARO — Global Senior Care & Mobility Solutions | B2B Manufacturer',
    description: 'Trusted B2B manufacturer of senior care products — mobility aids, bathroom safety, daily living, and home care. OEM/ODM for distributors worldwide.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'DS CARO — Senior Care & Mobility Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DS CARO — Global Senior Care & Mobility Solutions',
    description: 'Trusted B2B manufacturer of senior care products. OEM/ODM for distributors worldwide.',
    images: ['/opengraph-image'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'googledf00cb50a320971d',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    languages: {
      'en': 'https://dscaro.com',
    },
  },
  other: {
    'p:domain_verify': '',
  },
}

export const viewport = {
    themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1A365D' },
    { media: '(prefers-color-scheme: dark)', color: '#1A365D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <OrganizationJsonLd />
        {googleAnalyticsId ? <GoogleAnalytics measurementId={googleAnalyticsId} /> : null}
        {tikTokPixelId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
  ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
  var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;
  var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${tikTokPixelId}');
  ttq.page();
}(window, document, 'ttq');
              `
            }}
          />
        ) : null}
      </head>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </LocaleProvider>
        {isVercelProduction && <Analytics />}
      </body>
    </html>
  )
}
