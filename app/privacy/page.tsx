"use client"

import { ShieldCheck } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { legalContent } from "@/lib/pages-i18n"
import { legalBodies } from "@/lib/legal-i18n"

export default function PrivacyPage() {
  const { locale } = useLocale()
  const c = legalContent[locale] ?? legalContent.en
  const body = legalBodies[locale] ?? legalBodies.en

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container-wide text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.privTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {c.privUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div
            className="legal-body max-w-3xl mx-auto space-y-12
              [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4
              [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:text-lg [&_h3]:mt-4
              [&_p]:text-muted-foreground [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-muted-foreground
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-muted-foreground
              [&_li]:leading-relaxed
              [&_strong]:text-foreground
              [&_a]:text-primary [&_a]:no-underline [&_a]:hover:underline
              [&_.contact-card]:bg-secondary/30 [&_.contact-card]:rounded-2xl [&_.contact-card]:p-8 [&_.contact-card]:md:p-10 [&_.contact-card]:space-y-4
              [&_.legal-cards]:space-y-4
              [&_.legal-card]:bg-secondary/30 [&_.legal-card]:rounded-xl [&_.legal-card]:border [&_.legal-card]:border-border/50 [&_.legal-card]:p-5 [&_.legal-card]:mt-4
              [&_.legal-card_h3]:mt-0
              [&_.table-wrap]:overflow-x-auto
              [&_.legal-table]:mt-4 [&_.legal-table]:w-full [&_.legal-table]:text-sm [&_.legal-table]:border-collapse
              [&_.legal-table_th]:text-left [&_.legal-table_th]:py-3 [&_.legal-table_th]:px-4 [&_.legal-table_th]:font-semibold [&_.legal-table_th]:text-foreground [&_.legal-table_th]:bg-muted
              [&_.legal-table_td]:py-3 [&_.legal-table_td]:px-4 [&_.legal-table_td]:text-muted-foreground
              [&_.legal-table_tr]:border-b [&_.legal-table_tr]:border-border/50"
            dangerouslySetInnerHTML={{ __html: body.privacy }}
          />
          <p className="text-xs text-muted-foreground text-center pt-4 max-w-3xl mx-auto">
            {c.pFooter}
          </p>
        </div>
      </section>
    </>
  )
}
