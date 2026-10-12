import type { Metadata } from "next"
import { PRICES, formatBRL } from "@/lib/pricing"

export const WHATSAPP_NUMBER = "5531935033407"
export const WHATSAPP_MESSAGE = "Olá, Lucas! Vi seu site e quero conversar sobre o meu projeto."
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function whatsappUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppUrl() {
  return WHATSAPP_URL
}

export function getWhatsAppMessage() {
  return WHATSAPP_MESSAGE
}

export function getWhatsAppNumber() {
  return WHATSAPP_NUMBER
}

export const SITE_URL = "https://www.lucassilverio.com.br"

export const seo = {
  title: "Lucas Silvério — Posicionamento Digital | Sites, landing pages e tráfego",
  description: `Sites, landing pages e gestão de tráfego para negócios locais. Landing pages a partir de ${formatBRL(PRICES.landingPage)}, sites a partir de ${formatBRL(PRICES.base)} e tráfego a partir de ${formatBRL(PRICES.trafficSingle)}/mês.`,
}

const BRAND = "Lucas Silvério — Posicionamento Digital"
export const WHATSAPP_PHONE = "+55 31 93503-3407"
const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Ipatinga",
  addressRegion: "MG",
  addressCountry: "BR",
}

// Injetado em app/layout.tsx como JSON-LD
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#negocio`,
  name: BRAND,
  url: SITE_URL,
  description: seo.description,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/icon.svg`,
  telephone: WHATSAPP_PHONE,
  inLanguage: "pt-BR",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Vale do Aço, MG" },
    { "@type": "Country", name: "Brasil" },
  ],
  address: ADDRESS,
  founder: { "@id": `${SITE_URL}/#lucas` },
  makesOffer: [
    { "@type": "Offer", name: "Landing page", priceCurrency: "BRL", price: String(PRICES.landingPage) },
    { "@type": "Offer", name: "Site institucional", priceCurrency: "BRL", price: String(PRICES.base) },
    {
      "@type": "Offer",
      name: "Gestão de tráfego para negócios locais",
      priceCurrency: "BRL",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "BRL",
        price: String(PRICES.trafficSingle),
        unitText: "MONTH",
      },
    },
  ],
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#lucas`,
  name: "Lucas Silvério",
  url: SITE_URL,
  image: `${SITE_URL}/lucas-silverio-960.webp`,
  jobTitle: "Web designer e gestor de tráfego",
  telephone: WHATSAPP_PHONE,
  address: ADDRESS,
  worksFor: { "@id": `${SITE_URL}/#negocio` },
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: BRAND,
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#negocio` },
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#negocio` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Vale do Aço, MG" },
      { "@type": "Country", name: "Brasil" },
    ],
  }
}

/** Metadados das páginas internas: título, descrição, canonical e Open Graph no mesmo padrão da home. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Lucas Silvério — Posicionamento Digital",
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lucas Silvério — Posicionamento Digital" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  }
}
