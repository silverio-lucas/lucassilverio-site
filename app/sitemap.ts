import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-content"

// Páginas indexáveis. Ao criar uma página nova, inclua o caminho aqui.
const SITEMAP_PATHS = ["", "/gestao-de-trafego", "/orcamento", "/politica-de-privacidade"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/politica-de-privacidade" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path === "/politica-de-privacidade" ? 0.3 : 0.8,
  }))
}
