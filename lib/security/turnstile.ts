// Server-side verification of Cloudflare Turnstile tokens.
// Docs: https://developers.cloudflare.com/turnstile/
//
// The secret is read from TURNSTILE_SECRET_KEY. When the secret is not set
// (e.g. during local dev or before the site owner provisions keys), the check
// is treated as "not configured" and the route skips it — but field validation
// and rate limiting still run, so the form is never fully unprotected.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export interface TurnstileVerifyResult {
  configured: boolean
  success: boolean
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { configured: false, success: false }
  }
  if (typeof token !== "string" || token.length === 0) {
    return { configured: true, success: false }
  }

  try {
    const params = new URLSearchParams({ secret, response: token })
    if (remoteIp) params.set("remoteip", remoteIp)

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })

    if (!res.ok) {
      console.error("[Turnstile] verify HTTP error", res.status)
      return { configured: true, success: false }
    }

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] }
    if (!data.success) {
      console.warn("[Turnstile] token rejected", data["error-codes"])
    }
    return { configured: true, success: Boolean(data.success) }
  } catch (err) {
    console.error("[Turnstile] verify exception", err)
    return { configured: true, success: false }
  }
}
