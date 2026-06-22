'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Locale, translations, locales } from '@/lib/i18n'

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('dscaro-locale') as Locale
    if (stored && locales.includes(stored)) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('dscaro-locale', newLocale)
  }

  const t = translations[locale]

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
