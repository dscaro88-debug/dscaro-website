'use client'

import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/browser-analytics'
import { whatsappHref } from '@/lib/site-config'
import { useLocale } from '@/components/locale-provider'
import { rfqTranslations } from '@/lib/rfq-i18n'

export function WhatsAppButton() {
  const { locale } = useLocale()
  const rfq = rfqTranslations[locale] ?? rfqTranslations.en
  const whatsappUrl = whatsappHref(rfq.whatsappMessage)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating-button")}
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  )
}
