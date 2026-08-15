// Shared lead-form validation: email/phone format checks + gibberish/spam heuristics.
// Used by the RFQ and Contact API routes to reject obviously fake submissions
// (e.g. random-character fills, quantities with no number, honeypot traps).

export interface ValidationResult {
  ok: boolean
  status: number
  error: string
  reason?: string // internal-only, logged server side; never leaked to the client
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function countCaseTransitions(letters: string): number {
  let transitions = 0
  for (let i = 1; i < letters.length; i++) {
    const prev = letters[i - 1]
    const cur = letters[i]
    const prevUpper = prev === prev.toUpperCase() && prev !== prev.toLowerCase()
    const curUpper = cur === cur.toUpperCase() && cur !== cur.toLowerCase()
    if (prevUpper !== curUpper) transitions++
  }
  return transitions
}

// Heuristic detection of machine-generated random strings (e.g. "BVwJEPrVXERKRquDIDswKai").
// Human-like names/companies are usually shorter, contain spaces, or have natural
// vowel patterns, so we only flag longer, space-less, heavily-mixed-case strings.
export function looksGibberish(value: unknown, minLen = 12): boolean {
  if (typeof value !== "string") return false
  const v = value.trim()
  if (v.length < minLen) return false
  if (/\s/.test(v)) return false // multi-word human input is treated as fine
  const letters = v.replace(/[^A-Za-z]/g, "")
  if (letters.length < 8) return false
  const vowels = (letters.match(/[AEIOUaeiou]/g) || []).length
  if (vowels === 0) return true // pure consonant clusters of length >= 8 are almost always random
  const transitions = countCaseTransitions(letters)
  const ratio = transitions / Math.max(1, letters.length - 1)
  if (ratio > 0.6 && letters.length >= 10) return true // heavy alternating case, no real words
  return false
}

function hasDigit(value: unknown): boolean {
  return typeof value === "string" && /\d/.test(value)
}

const GENERIC_ERROR =
  "Your submission could not be processed. Please check the required fields or contact us on WhatsApp."

export function validateRfqPayload(body: Record<string, unknown>): ValidationResult {
  // Honeypot — hidden field that humans never see but bots tend to fill.
  if (isNonEmptyString(body.companyWebsite)) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "honeypot filled" }
  }

  const email = body.email
  const name = body.name
  const requestedQuantity = body.quantity ?? body.estimatedQuantity

  if (!isNonEmptyString(email) || !EMAIL_RE.test(email.trim())) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "invalid email" }
  }
  if (!isNonEmptyString(name) || looksGibberish(name, 10)) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "invalid name" }
  }
  // A real quantity must contain at least one number (e.g. "500 pcs", "60 bags").
  // Spam submits random letter strings like "BVwJEPrVXERKRquDIDswKai".
  if (!isNonEmptyString(requestedQuantity) || !hasDigit(requestedQuantity)) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "quantity missing or has no number" }
  }

  // Optional free-text fields: reject obvious random fills.
  const optionalText = [
    "company",
    "country",
    "sku",
    "targetMarket",
    "destinationPort",
    "packagingNeeds",
    "certificationNeeds",
    "message",
  ]
  for (const key of optionalText) {
    const val = body[key]
    if (isNonEmptyString(val) && looksGibberish(val)) {
      return { ok: false, status: 400, error: GENERIC_ERROR, reason: `gibberish in ${key}` }
    }
  }

  return { ok: true, status: 200, error: "" }
}

export function validateContactPayload(body: Record<string, unknown>): ValidationResult {
  if (isNonEmptyString(body.companyWebsite)) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "honeypot filled" }
  }

  const email = body.email
  const firstName = body.firstName
  const message = body.message

  if (!isNonEmptyString(email) || !EMAIL_RE.test(email.trim())) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "invalid email" }
  }
  if (!isNonEmptyString(firstName) || looksGibberish(firstName, 10)) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "invalid firstName" }
  }
  if (!isNonEmptyString(message) || message.trim().length < 2) {
    return { ok: false, status: 400, error: GENERIC_ERROR, reason: "message too short" }
  }

  const optionalText = ["lastName", "subject", "orderNumber", "phone"]
  for (const key of optionalText) {
    const val = body[key]
    if (isNonEmptyString(val) && looksGibberish(val)) {
      return { ok: false, status: 400, error: GENERIC_ERROR, reason: `gibberish in ${key}` }
    }
  }

  return { ok: true, status: 200, error: "" }
}
