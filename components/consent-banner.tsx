"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CONSENT_OPEN_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent"

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setVisible(true)
    const open = () => setVisible(true)
    window.addEventListener(CONSENT_OPEN_EVENT, open)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open)
  }, [])

  const choose = (value: Consent) => {
    const previous = readConsent()
    writeConsent(value)
    setVisible(false)
    // Scripts já carregados só param de verdade quando a página recarrega.
    if (previous === "granted" && value === "denied") window.location.reload()
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-[55] mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-5 shadow-lg backdrop-blur-xl sm:p-6"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <p className="text-sm leading-relaxed text-foreground">
        Este site usa cookies para medir as visitas e o desempenho dos anúncios (Google Analytics, Meta Pixel e Microsoft Clarity). Você escolhe: o site funciona igual se recusar.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Saiba mais na{" "}
        <Link href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-foreground">
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button onClick={() => choose("granted")}>Aceitar</Button>
        <Button variant="outline" onClick={() => choose("denied")}>
          Recusar
        </Button>
      </div>
    </div>
  )
}
