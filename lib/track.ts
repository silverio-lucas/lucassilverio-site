declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/** Envia um evento para GA4 e Meta Pixel (se estiverem carregados). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  try {
    window.gtag?.("event", event, params)
  } catch {}
  try {
    window.fbq?.("trackCustom", event, params)
  } catch {}
}
