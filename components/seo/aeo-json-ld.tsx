// DS CARO — additional JSON-LD emitters for AEO (2026-09-22)
// Kept in a separate file so components/seo/json-ld.tsx does not need to be
// rewritten. FaqJsonLd already exists there; this file adds HowTo plus an
// entity-signal helper.

import { siteConfig } from "@/lib/site-config"
import { businessIdentifiers, howToDefinitions, socialProfiles, type HowToDefinition } from "@/lib/aeo-howto"

const BASE_URL = siteConfig.siteUrl

// ─── HowTo ──────────────────────────────────────────────────────────────────
export function HowToJsonLd({ slug }: { slug: string }) {
  const definition: HowToDefinition | undefined = howToDefinitions[slug]
  if (!definition) return null

  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: definition.name,
    description: definition.description,
    ...(definition.totalTime && { totalTime: definition.totalTime }),
    url: `${BASE_URL}/${slug}`,
    inLanguage: "en",
    provider: { "@id": `${BASE_URL}/#organization` },
    step: definition.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.desc,
      url: `${BASE_URL}/${slug}#step-${index + 1}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Entity signal patch for Organization ───────────────────────────────────
// Rendered in addition to OrganizationJsonLd so the main component stays
// untouched. Emits sameAs / identifier only when data actually exists.
export function OrganizationEntitySignalsJsonLd() {
  if (socialProfiles.length === 0 && businessIdentifiers.length === 0) return null

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    ...(socialProfiles.length > 0 && { sameAs: socialProfiles }),
    ...(businessIdentifiers.length > 0 && {
      identifier: businessIdentifiers.map((item) => ({
        "@type": "PropertyValue",
        propertyID: item.type,
        value: item.value,
      })),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── speakable (voice / answer-surface hint) ─────────────────────────────────
export function SpeakableJsonLd({ cssSelectors }: { cssSelectors: string[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: BASE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
