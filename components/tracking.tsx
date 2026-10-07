"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent"

// Defina na Vercel (Settings > Environment Variables), marcando o ambiente Production:
// NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
// NEXT_PUBLIC_META_PIXEL_ID=000000000000000
// NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
// Cada ferramenta só carrega se o ID correspondente existir E se a pessoa aceitar o aviso de cookies.

export function Tracking() {
  const ga = process.env.NEXT_PUBLIC_GA_ID
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID

  const [consent, setConsent] = useState<Consent | null>(null)
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    setConsent(readConsent())
    const onChange = (event: Event) => setConsent((event as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [])

  // O Pixel só registra PageView quando a página carrega por inteiro. Nas trocas de página, que
  // não recarregam, o registro é feito aqui. O GA4 detecta a troca sozinho (medição aprimorada).
  useEffect(() => {
    if (consent !== "granted") {
      lastPath.current = null
      return
    }
    if (lastPath.current !== null && lastPath.current !== pathname) {
      try {
        window.fbq?.("track", "PageView")
      } catch {}
    }
    lastPath.current = pathname
  }, [consent, pathname])

  if (consent !== "granted") return null

  return (
    <>
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${ga}');
          `}</Script>
        </>
      )}

      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixel}');
          fbq('track', 'PageView');
        `}</Script>
      )}

      {clarity && (
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarity}");
        `}</Script>
      )}
    </>
  )
}
