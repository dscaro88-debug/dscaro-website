export const buyerTypeOptions = [
  "Distributor",
  "Nursing Home",
  "Clinic",
  "Retailer",
  "Assisted Living",
  "Online Seller",
  "Other",
] as const

export const monthlyVolumeOptions = [
  "Under 100 units/month",
  "100-500 units/month",
  "500-2,000 units/month",
  "2,000+ units/month",
  "Project-based purchase",
] as const

export const urgencyLevelOptions = [
  "Need quote this week",
  "Sample request first",
  "Bulk order within 30 days",
  "Planning next quarter",
  "Price comparison only",
] as const

export type LeadTag = "HIGH VALUE LEAD" | "OEM POTENTIAL" | "SAMPLE REQUEST"

export interface RfqLeadScoringResult {
  score: number
  priority: "Hot" | "Qualified" | "Nurture"
  tags: LeadTag[]
  reasons: string[]
}

const normalize = (value: unknown) => String(value || "").toLowerCase()

const extractLargestNumber = (...values: unknown[]) => {
  const numbers = values
    .flatMap((value) => String(value || "").match(/\d+(?:,\d{3})*(?:\.\d+)?/g) || [])
    .map((value) => Number(value.replaceAll(",", "")))
    .filter((value) => Number.isFinite(value))

  return numbers.length > 0 ? Math.max(...numbers) : 0
}

export function scoreRfqLead(fields: Record<string, unknown>): RfqLeadScoringResult {
  const buyerType = normalize(fields.buyerType || fields.facilityType)
  const monthlyVolume = normalize(fields.monthlyVolume)
  const urgencyLevel = normalize(fields.urgencyLevel)
  const oemRequired = normalize(fields.oemRequired)
  const packagingNeeds = normalize(fields.packagingNeeds)
  const message = normalize(fields.message)
  const sourcePage = normalize(fields.sourcePage)
  const requestedQuantity = extractLargestNumber(
    fields.quantity,
    fields.estimatedQuantity,
    fields.monthlyVolume
  )

  const tags: LeadTag[] = []
  const reasons: string[] = []
  let score = 35

  const highValueBuyer =
    buyerType.includes("distributor") ||
    buyerType.includes("nursing") ||
    buyerType.includes("assisted") ||
    buyerType.includes("online")
  const highVolume =
    requestedQuantity >= 500 ||
    monthlyVolume.includes("500") ||
    monthlyVolume.includes("2,000") ||
    monthlyVolume.includes("2000") ||
    monthlyVolume.includes("project")

  if (highValueBuyer) {
    score += 15
    reasons.push("B2B buyer type")
  }

  if (highVolume) {
    score += 25
    tags.push("HIGH VALUE LEAD")
    reasons.push("bulk or repeat-volume potential")
  }

  if (
    oemRequired === "yes" ||
    packagingNeeds.includes("oem") ||
    packagingNeeds.includes("private") ||
    packagingNeeds.includes("label") ||
    packagingNeeds.includes("logo") ||
    message.includes("oem") ||
    message.includes("private label") ||
    message.includes("logo")
  ) {
    score += 20
    tags.push("OEM POTENTIAL")
    reasons.push("OEM/private label signal")
  }

  if (
    urgencyLevel.includes("sample") ||
    message.includes("sample") ||
    sourcePage.includes("sample")
  ) {
    score += 10
    tags.push("SAMPLE REQUEST")
    reasons.push("sample request signal")
  }

  if (urgencyLevel.includes("this week") || urgencyLevel.includes("30 days")) {
    score += 10
    reasons.push("near-term purchase timeline")
  }

  const uniqueTags = Array.from(new Set(tags))
  const cappedScore = Math.min(score, 100)

  return {
    score: cappedScore,
    priority: cappedScore >= 80 ? "Hot" : cappedScore >= 60 ? "Qualified" : "Nurture",
    tags: uniqueTags,
    reasons,
  }
}
