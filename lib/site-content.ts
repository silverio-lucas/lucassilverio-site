export const WHATSAPP_NUMBER = "5531987638437"
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

export const SITE_URL = "https://www.lucassilverio.dev"

export const seo = {
  title: "Lucas Silvério — Posicionamento Digital | Sites e landing pages",
  description:
    "Sites institucionais e landing pages rápidos, com WhatsApp integrado e medição. Landing pages a partir de R$ 1.200 e sites a partir de R$ 2.000.",
}

// Injetado em app/layout.tsx como JSON-LD
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lucas Silvério — Posicionamento Digital",
  url: SITE_URL,
  description: seo.description,
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ipatinga",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  makesOffer: [
    { "@type": "Offer", name: "Landing page", priceCurrency: "BRL", price: "1200" },
    { "@type": "Offer", name: "Site institucional", priceCurrency: "BRL", price: "2000" },
  ],
}
