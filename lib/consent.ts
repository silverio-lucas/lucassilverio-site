// Consentimento de cookies (LGPD). Sem "granted", GA4, Meta Pixel e Clarity não carregam.
export const CONSENT_KEY = "ls-consent-v1"
export const CONSENT_CHANGE_EVENT = "ls:consent-change"
export const CONSENT_OPEN_EVENT = "ls:consent-open"

export type Consent = "granted" | "denied"

export function parseConsent(value: unknown): Consent | null {
  return value === "granted" || value === "denied" ? value : null
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY))
  } catch {
    return null
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* sem armazenamento, a escolha vale só nesta visita */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}

/** Reabre o aviso de cookies (botão "Preferências de cookies" do rodapé). */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}
