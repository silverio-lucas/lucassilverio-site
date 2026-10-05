import { buildSummary } from "@/lib/pricing"
import { whatsappUrl } from "@/lib/site-content"

const singleLine = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : ""

export interface ClientInput {
  name?: string
  contact?: string
  company?: string
  notes?: string
  objective?: string
  segment?: string
  timeline?: string
}

export function normalizeClient(input: ClientInput = {}) {
  return {
    objective: singleLine(input.objective, 120),
    segment: singleLine(input.segment, 120),
    timeline: singleLine(input.timeline, 120),
    name: singleLine(input.name, 100),
    contact: singleLine(input.contact, 160),
    company: singleLine(input.company, 120),
    notes: typeof input.notes === "string" ? input.notes.trim().slice(0, 1000) : "",
  }
}

export function isValidContact(value: unknown): boolean {
  const contact = singleLine(value, 160)
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return true
  const digits = contact.replace(/\D/g, "")
  return /^[+\d\s().-]+$/.test(contact) && digits.length >= 10 && digits.length <= 15
}

// Nome do projeto quando o cliente não informa a empresa: acompanha o tipo escolhido no simulador.
function fallbackProjectName(projectType: unknown): string {
  if (projectType === "landing") return "Landing page para meu negócio"
  if (projectType === "trafego") return "Gestão de tráfego para meu negócio"
  return "Site para meu negócio"
}

export function buildRequest(config: unknown, input: ClientInput): string {
  const client = normalizeClient(input)
  if (client.name.length < 2 || !isValidContact(client.contact)) throw new Error("Informe nome e contato válidos.")
  const base = (config && typeof config === "object" ? config : {}) as Record<string, unknown>
  return [
    "Olá, Lucas! Gostaria de conversar sobre este projeto e receber uma proposta.",
    "",
    "MEUS DADOS",
    `Nome: ${client.name}`,
    `Contato: ${client.contact}`,
    ...(client.company ? [`Empresa: ${client.company}`] : []),
    ...(client.notes ? ["", "SOBRE O PROJETO", client.notes] : []),
    "",
    buildSummary({
      ...base,
      objective: client.objective,
      segment: client.segment,
      timeline: client.timeline,
      projectName: client.company || fallbackProjectName(base.projectType),
    }),
    "",
    "Este é um pedido de proposta, sem contratação ou cobrança automática.",
  ].join("\n")
}

export const buildWhatsAppURL = (text: string) => whatsappUrl(text)
