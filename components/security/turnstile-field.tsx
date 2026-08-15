"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface TurnstileApi {
  render: (el: HTMLElement, opts: TurnstileRenderOptions) => string
  reset: (id?: string) => void
  remove: (id: string) => void
  execute: (id?: string) => void
}

interface TurnstileRenderOptions {
  sitekey: string
  callback?: (token: string) => void
  "expired-callback"?: () => void
  "error-callback"?: () => void
  theme?: "light" | "dark" | "auto"
  size?: "normal" | "flexible" | "compact"
}

export interface TurnstileHandle {
  reset: () => void
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"

export const TurnstileField = forwardRef<TurnstileHandle, { onToken: (token: string) => void }>(
  function TurnstileField({ onToken }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<string | null>(null)

    useEffect(() => {
      if (!SITE_KEY || !containerRef.current) return
      let cancelled = false

      const renderWidget = () => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY as string,
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        })
      }

      if (window.turnstile) {
        renderWidget()
      } else {
        const existing = document.querySelector(
          'script[data-turnstile-api]'
        ) as HTMLScriptElement | null
        if (!existing) {
          const script = document.createElement("script")
          script.src = TURNSTILE_SCRIPT_SRC
          script.async = true
          script.defer = true
          script.setAttribute("data-turnstile-api", "true")
          script.addEventListener("load", renderWidget)
          document.body.appendChild(script)
        } else {
          existing.addEventListener("load", renderWidget)
        }
      }

      return () => {
        cancelled = true
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        }
      }
    }, [onToken])

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
        }
      },
    }))

    // Render nothing when keys are not provisioned (graceful degradation).
    if (!SITE_KEY) return null
    return <div ref={containerRef} aria-hidden="true" />
  }
)
