import type { NextRequest } from "next/server"

// In-memory sliding-window rate limiter keyed by arbitrary id (IP or email).
//
// IMPORTANT: on Vercel / serverless this Map lives per-instance, so it is a
// best-effort defense layer — it will not be perfectly consistent across the
// multiple lambdas that may serve requests. Combine it with Turnstile and
// field validation. For strict cross-instance enforcement, back this with
// Vercel KV or Upstash Redis.

type Bucket = { count: number; resetAt: number }

const stores: Record<string, Map<string, Bucket>> = {}

export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSec: number
}

export function checkRateLimit(opts: {
  key: string
  id: string
  windowMs: number
  max: number
}): RateLimitResult {
  const { key, id, windowMs, max } = opts
  if (!stores[key]) stores[key] = new Map()
  const store = stores[key]
  const now = Date.now()
  const existing = store.get(id)

  if (!existing || existing.resetAt <= now) {
    store.set(id, { count: 1, resetAt: now + windowMs })
    pruneIfLarge(store)
    return { allowed: true, remaining: max - 1, retryAfterSec: Math.ceil(windowMs / 1000) }
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1
  return {
    allowed: true,
    remaining: max - existing.count,
    retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
  }
}

function pruneIfLarge(store: Map<string, Bucket>) {
  if (store.size <= 1000) return
  const now = Date.now()
  for (const [id, bucket] of store.entries()) {
    if (bucket.resetAt <= now) store.delete(id)
  }
}
