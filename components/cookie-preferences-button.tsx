"use client"

import { openConsentPreferences } from "@/lib/consent"

export function CookiePreferencesButton() {
  return (
    <button type="button" onClick={openConsentPreferences} className="transition-colors hover:text-foreground">
      Preferências de cookies
    </button>
  )
}
