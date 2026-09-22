// DS CARO — visible FAQ block (2026-09-22)
// Server component: the answers are in the server-rendered HTML, so they are
// readable by AI crawlers and by any client without JavaScript. Uses native
// <details> for the collapse behaviour — no client bundle cost, and the answer
// text stays in the DOM for extraction.
//
// The same array must be passed to <FaqJsonLd /> in the page file so that
// structured data and visible content match.

import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

import type { AeoFaq } from "@/lib/aeo-faqs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FaqSectionProps {
  faqs: AeoFaq[]
  eyebrow?: string
  title?: string
  intro?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function FaqSection({
  faqs,
  eyebrow = "Buyer Questions",
  title = "Frequently Asked Questions",
  intro,
  ctaLabel,
  ctaHref = "/rfq",
  className,
}: FaqSectionProps) {
  if (!faqs.length) return null

  return (
    <section
      className={`section-padding bg-muted/25${className ? ` ${className}` : ""}`}
      data-aeo="faq"
      id="faq"
    >
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Badge variant="secondary" className="mb-4">
              {eyebrow}
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{intro}</p>
            ) : null}
            {ctaLabel ? (
              <Link href={ctaHref} className="mt-7 inline-block">
                <Button className="h-11 bg-[#1A365D] text-white hover:bg-[#132844]">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : null}
          </div>

          <div className="divide-y divide-border border-t border-border">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group py-5"
                open={index === 0}
                id={`question-${index + 1}`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-relaxed text-foreground md:text-lg">
                    {faq.question}
                  </h3>
                  <Plus
                    className="mt-1 h-4 w-4 shrink-0 text-[#E67E22] transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
