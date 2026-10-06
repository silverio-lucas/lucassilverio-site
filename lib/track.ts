declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Evento que o Meta recebe. Cliques no WhatsApp viram "Contact" e o pedido enviado vira "Lead":
 * são eventos padrão, que os anúncios do Meta sabem otimizar. O resto segue como evento personalizado.
 */
export function metaEventFor(event: string): { standard: boolean; name: string } {
  if (event === "whatsapp_pedido") return { standard: true, name: "Lead" }
  if (event.startsWith("whatsapp_")) return { standard: true, name: "Contact" }
  return { standard: false, name: event }
}

/** Envia um evento para GA4 e Meta Pixel (se estiverem carregados). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  try {
    window.gtag?.("event", event, params)
  } catch {}
  try {
    const meta = metaEventFor(event)
    window.fbq?.(meta.standard ? "track" : "trackCustom", meta.name, params)
  } catch {}
}
