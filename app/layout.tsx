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
    default: 'DS CARO — Long-Term Care Supplies for Care Facilities | B2B OEM/ODM',
    template: '%s | DS CARO'
  },
  description: 'DS CARO supplies B2B long-term care products for nursing homes, assisted living, care distributors, and home-care channels: dining solutions, mobility and transfer support, and daily care supplies with OEM/ODM support.',
  keywords: [
    'long-term care supplies',
    'nursing home supplies',
    'assisted living supplies',
    'adult bibs wholesale',
    'care facility dining supplies',
    'mobility transfer supplies',
    'incontinence care supplies',
    'disposable adult underpads wholesale',
    'OEM long-term care products',
    'B2B care supplies',
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
    title: 'DS CARO — Long-Term Care Supplies for Care Facilities',
    description: 'B2B dining solutions, mobility and transfer support, and daily care supplies for nursing homes, assisted living, and care distributors.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'DS CARO — Long-Term Care Supplies for Care Facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DS CARO — Long-Term Care Supplies',
    description: 'B2B long-term care supplies with OEM/ODM support for care facilities and distributors.',
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
    <html lang="en" className="bg-background" data-scroll-behavior="smooth" suppressHydrationWarning>
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
