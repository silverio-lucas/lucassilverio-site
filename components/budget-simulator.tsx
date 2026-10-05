"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  Eye,
  LayoutTemplate,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Megaphone,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  LANDING_GOALS,
  MAX_PAGES,
  PRICES,
  BUDGET_HIGH,
  BUDGET_MICRO,
  DISCOVERY_OPTIONS,
  TRAFFIC_GOALS,
  TRAFFIC_MIN_MONTHS,
  buildQuoteLine,
  calculateQuote,
  formatBRL,
  normalizePages,
  normalizeState,
  type ProjectType,
  type QuoteState,
  type Discovery,
  type TrafficGoal,
  type TrafficPage,
} from "@/lib/pricing"
import { buildRequest, buildWhatsAppURL, isValidContact, normalizeClient } from "@/lib/request"
import { track } from "@/lib/track"

// Só as opções do orçamento ficam salvas no navegador. Nome, contato e observações nunca são persistidos.
const STORAGE_KEY = "ls-client-quote-v1"

const OBJECTIVES = [
  "Apresentar minha empresa",
  "Gerar contatos",
  "Divulgar uma oferta",
  "Vender um produto ou serviço",
  "Outro objetivo",
]
const TIMELINES = ["Assim que possível", "Até 30 dias", "De 1 a 3 meses", "Sem data definida"]

const selectClass =
  "border-input dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive md:text-sm [&>option]:bg-background"

interface ClientForm {
  name: string
  contact: string
  company: string
  objective: string
  segment: string
  timeline: string
  notes: string
}
const EMPTY_CLIENT: ClientForm = { name: "", contact: "", company: "", objective: "", segment: "", timeline: "", notes: "" }

/* ---------- peças ---------- */

function Card({ children, className = "", selected = false }: { children: React.ReactNode; className?: string; selected?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors ${
        selected ? "border-accent/50 bg-accent/5" : "border-border bg-card/30"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function CardHead({
  icon: Icon,
  title,
  subtitle,
  right,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle?: string
  right?: React.ReactNode
  active?: boolean
}) {
  return (
    <div className="flex items-center gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${active ? "bg-accent/20" : "bg-secondary"}`}>
        <Icon className={`h-5 w-5 ${active ? "text-accent" : "text-muted-foreground"}`} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

function Stepper({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (value: number) => void
  label: string
}) {
  return (
    <div className="inline-flex shrink-0 items-center rounded-md border border-border" role="group" aria-label={label}>
      <Button type="button" variant="ghost" size="icon" aria-label={`Remover: ${label}`} disabled={value === 0} onClick={() => onChange(normalizePages(value - 1))}>
        <Minus className="h-4 w-4" />
      </Button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_PAGES}
        step={1}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(normalizePages(event.target.value))}
        className="h-9 w-14 border-x border-border bg-transparent text-center font-mono text-sm text-foreground outline-none [appearance:textfield] focus-visible:bg-secondary/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button type="button" variant="ghost" size="icon" aria-label={`Adicionar: ${label}`} disabled={value === MAX_PAGES} onClick={() => onChange(normalizePages(value + 1))}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ToggleRow({
  id,
  title,
  description,
  price,
  checked,
  onChange,
  disabled = false,
}: {
  id: string
  title: string
  description: string
  price: string
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-start gap-4 border-t border-border/60 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onChange} aria-describedby={`${id}-desc`} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <Label htmlFor={id} className="text-sm font-medium leading-snug text-foreground">
          {title}
        </Label>
        <p id={`${id}-desc`} className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <span className="shrink-0 font-mono text-sm text-foreground">{price}</span>
    </div>
  )
}

/* ---------- componente principal ---------- */

export function BudgetSimulator() {
  const [state, setState] = useState<QuoteState>(() => normalizeState({}))
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"details" | "review">("details")
  const [client, setClient] = useState<ClientForm>(EMPTY_CLIENT)
  const [errors, setErrors] = useState<Partial<Record<keyof ClientForm, string>>>({})
  const [summary, setSummary] = useState("")
  const [copyMessage, setCopyMessage] = useState<string | null>(null)
  const [showBar, setShowBar] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLTextAreaElement>(null)

  const quote = useMemo(() => calculateQuote(state), [state])
  const landing = state.projectType === "landing"
  const trafego = state.projectType === "trafego"

  // Lê o rascunho salvo só depois de montar, para não divergir do HTML gerado no servidor.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setState(normalizeState(JSON.parse(saved)))
    } catch {
      /* segue sem rascunho */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* a simulação funciona sem armazenamento */
    }
  }, [state, hydrated])

  // Barra fixa no celular: aparece enquanto o card de estimativa está fora da tela.
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !sectionRef.current || !cardRef.current) return
    const seen = { section: false, card: false }
    const update = () => setShowBar(seen.section && !seen.card)
    const watch = (element: Element, key: keyof typeof seen) => {
      const observer = new IntersectionObserver((entries) => {
        seen[key] = entries[entries.length - 1].isIntersecting
        update()
      })
      observer.observe(element)
      return observer
    }
    const observers = [watch(sectionRef.current, "section"), watch(cardRef.current, "card")]
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const patch = (changes: Partial<QuoteState>) => setState((current) => normalizeState({ ...current, ...changes }))

  // A seção de serviços pré-seleciona o tipo de projeto (site, landing page ou tráfego).
  useEffect(() => {
    const onType = (event: Event) => {
      const type = (event as CustomEvent<string>).detail
      if (type === "site" || type === "landing" || type === "trafego")
        setState((current) => normalizeState({ ...current, projectType: type }))
    }
    window.addEventListener("simulador:tipo", onType)
    return () => window.removeEventListener("simulador:tipo", onType)
  }, [])

  const openRequest = () => {
    setStep("details")
    setErrors({})
    setCopyMessage(null)
    setOpen(true)
    track("simulador_pedido_aberto", { tipo: state.projectType, valor: quote.total })
  }

  const reset = () => {
    setState(normalizeState({}))
    setClient(EMPTY_CLIENT)
    setSummary("")
    setErrors({})
  }

  const setField = (key: keyof ClientForm, value: string) => {
    setClient((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const normalized = normalizeClient(client)
    const next: Partial<Record<keyof ClientForm, string>> = {}
    if (normalized.name.length < 2) next.name = "Informe seu nome."
    if (!isValidContact(normalized.contact)) next.contact = "Informe um WhatsApp com DDD ou um e-mail válido."
    if (!normalized.objective) next.objective = "Selecione o objetivo."
    if (!normalized.segment) next.segment = "Informe o segmento do negócio."
    if (!normalized.timeline) next.timeline = "Selecione o prazo."
    setErrors(next)
    if (Object.keys(next).length) return
    setSummary(buildRequest(state, normalized))
    setCopyMessage(null)
    setStep("review")
  }

  const copy = async () => {
    let copied = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary)
        copied = true
      }
    } catch {
      /* usa a seleção abaixo */
    }
    if (!copied && summaryRef.current) {
      summaryRef.current.focus()
      summaryRef.current.select()
      try {
        copied = document.execCommand("copy")
      } catch {
        copied = false
      }
    }
    setCopyMessage(
      copied
        ? "Pedido copiado! Agora cole e envie na sua conversa com Lucas."
        : "O texto foi selecionado. Use Copiar no seu dispositivo e envie na sua conversa com Lucas.",
    )
    track("simulador_copiar", { valor: quote.total })
  }

  const pagesLabel = `${quote.totalPages} ${quote.totalPages === 1 ? "página no projeto" : "páginas no projeto"}`

  return (
    <section id="orcamento" ref={sectionRef} className="relative py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Monte seu orçamento</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Escolha o que seu negócio precisa, veja a estimativa na hora e envie o pedido de proposta pelo WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]"
        >
          {/* ---------- escolhas ---------- */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <Tabs
                value={state.projectType}
                onValueChange={(value) => {
                  patch({ projectType: value as ProjectType })
                  track("simulador_tipo", { tipo: value })
                }}
                className="flex-1"
              >
                <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 sm:grid-cols-3" aria-label="Tipo de projeto">
                  <TabsTrigger value="site" className="flex-col items-start gap-0.5 px-4 py-3 text-left">
                    <span>Site institucional</span>
                    <small className="text-xs font-normal text-muted-foreground">A partir de {formatBRL(PRICES.base)}</small>
                  </TabsTrigger>
                  <TabsTrigger value="landing" className="flex-col items-start gap-0.5 px-4 py-3 text-left">
                    <span>Landing page</span>
                    <small className="text-xs font-normal text-muted-foreground">A partir de {formatBRL(PRICES.landingPage)}</small>
                  </TabsTrigger>
                  <TabsTrigger value="trafego" className="flex-col items-start gap-0.5 px-4 py-3 text-left">
                    <span>Gestão de tráfego</span>
                    <small className="text-xs font-normal text-muted-foreground">A partir de {formatBRL(PRICES.trafficSingle)}/mês</small>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" />
                Recomeçar
              </Button>
            </div>

            <Card selected>
              <CardHead
                icon={trafego ? Megaphone : LayoutTemplate}
                active
                title={quote.projectLabel}
                subtitle="Seu ponto de partida"
                right={
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">a partir de</p>
                    <p className="text-xl font-semibold tracking-tight text-foreground">
                      {formatBRL(quote.baseCost)}
                      {trafego && <span className="text-sm font-normal text-muted-foreground">/mês</span>}
                    </p>
                  </div>
                }
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {trafego
                  ? "Anúncios para levar gente qualificada até a sua página, com campanhas, acompanhamento e relatório mensal."
                  : landing
                    ? "Uma página focada em apresentar uma oferta ou campanha e orientar o visitante para uma ação de contato ou conversão."
                    : "Uma página principal para apresentar o negócio, seus serviços e canais de contato. Adicione páginas internas se precisar."}
              </p>
              {trafego ? (
                <div className="mt-5 rounded-lg border border-border/60 bg-secondary/40 p-4">
                  <p className="text-sm font-medium text-foreground">A verba dos anúncios não está incluída</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Você paga a verba direto à plataforma e decide quanto investir. O compromisso mínimo é de {TRAFFIC_MIN_MONTHS} meses, porque as campanhas precisam de tempo de aprendizado.
                  </p>
                </div>
              ) : (
              <div className="mt-5 border-t border-border/60 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">Ferramentas de marketing já incluídas</p>
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Check className="h-3.5 w-3.5" /> Sem adicional
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: BarChart3, name: "Google Analytics", text: "Entenda as visitas ao site." },
                    { icon: Target, name: "Meta Pixel", text: "Conecte a mensuração dos anúncios." },
                    { icon: Eye, name: "Microsoft Clarity", text: "Observe a navegação dos visitantes." },
                  ].map((tool) => (
                    <div key={tool.name} className="rounded-lg bg-secondary/50 p-3">
                      <tool.icon className="h-4 w-4 text-accent" />
                      <p className="mt-2 text-sm font-medium text-foreground">{tool.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tool.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </Card>

            {trafego ? (
              <Card>
                <CardHead icon={Target} title="Sobre o seu negócio" subtitle="Quatro perguntas para eu recomendar os canais" />

                {/* 1. Como os clientes encontram a empresa */}
                <fieldset className="mt-6 border-t border-border/60 pt-5 first:border-t-0">
                  <legend className="text-sm font-medium text-foreground">Como os seus clientes costumam encontrar você?</legend>
                  <div className="mt-3 grid gap-2">
                    {DISCOVERY_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={state.discovery === option.value}
                        onClick={() => patch({ discovery: option.value as Discovery })}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                          state.discovery === option.value
                            ? "border-accent/50 bg-accent/5"
                            : "border-border bg-secondary/30 hover:bg-secondary/60"
                        }`}
                      >
                        <span className="block text-sm font-medium text-foreground">{option.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{option.help}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* 2. Verba de anúncios */}
                <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                  <Label htmlFor="ad-budget">Quanto você pode investir por mês só em anúncios?</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <Input
                      id="ad-budget"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={100}
                      value={state.adBudget || ""}
                      placeholder="1500"
                      onChange={(event) => patch({ adBudget: Number(event.target.value) })}
                      className="max-w-40 font-mono"
                    />
                    <span className="text-sm text-muted-foreground">por mês</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Esse valor vai direto para o Meta e o Google, não para mim. Serve para eu recomendar os canais certos.
                  </p>
                </div>

                {/* 3. Objetivo principal */}
                <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                  <Label htmlFor="traffic-goal">O que você quer que o anúncio traga?</Label>
                  <select
                    id="traffic-goal"
                    className={selectClass}
                    value={state.trafficGoal}
                    onChange={(event) => patch({ trafficGoal: event.target.value as TrafficGoal })}
                  >
                    {TRAFFIC_GOALS.map((goal) => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. O que já existe */}
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-sm font-medium text-foreground">O que você já tem hoje?</p>
                  <div className="mt-3">
                    <ToggleRow
                      id="has-site"
                      title="Já tenho site ou landing page"
                      description="Os anúncios precisam de uma página para levar o visitante."
                      price=""
                      checked={state.hasSite}
                      onChange={(hasSite) => patch({ hasSite, trafficPage: hasSite ? "nenhuma" : state.trafficPage })}
                    />
                    <ToggleRow
                      id="has-gbp"
                      title="Já tenho Perfil da Empresa no Google"
                      description="É o cadastro que faz o negócio aparecer no Maps e na busca local."
                      price=""
                      checked={state.hasGoogleProfile}
                      onChange={(hasGoogleProfile) => patch({ hasGoogleProfile })}
                    />
                  </div>
                </div>

                {/* Página de destino, só quando não tem */}
                {!state.hasSite && (
                  <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                    <Label htmlFor="traffic-page">Quer que eu crie a página de destino?</Label>
                    <select
                      id="traffic-page"
                      className={selectClass}
                      value={state.trafficPage}
                      onChange={(event) => patch({ trafficPage: event.target.value as TrafficPage })}
                    >
                      <option value="nenhuma">Por enquanto não</option>
                      <option value="landing">Landing page · {formatBRL(PRICES.landingPage)} uma única vez</option>
                      <option value="site">Site institucional · {formatBRL(PRICES.base)} uma única vez</option>
                    </select>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Anúncio bom em página ruim não converte.
                    </p>
                  </div>
                )}

                {/* Criativos */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
                  <div className="max-w-sm">
                    <p className="text-sm font-medium text-foreground">Criativos por mês</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Deixe em zero se você mesmo envia as imagens e os vídeos. Cada criativo produzido por mim custa {formatBRL(PRICES.trafficCreative)}.
                    </p>
                  </div>
                  <Stepper
                    value={state.trafficCreatives}
                    onChange={(trafficCreatives) => patch({ trafficCreatives })}
                    label="Criativos por mês"
                  />
                </div>

                <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
                  Os valores atendem inicialmente um negócio e uma oferta principal. Resultados dependem de oferta, verba, mercado e da sua capacidade de atender.
                </p>
              </Card>
            ) : !landing ? (
              <>
                <Card>
                  <CardHead
                    icon={LayoutTemplate}
                    title="Precisa de mais páginas?"
                    subtitle="Páginas internas adicionais"
                    right={
                      <div className="text-right font-mono text-sm text-foreground">
                        + {formatBRL(PRICES.page)}
                        <span className="block text-xs font-normal text-muted-foreground">por página</span>
                      </div>
                    }
                  />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                      Crie espaços próprios para Sobre, Serviços ou Contato. A página principal já está incluída.
                    </p>
                    <Stepper value={state.pages} onChange={(pages) => patch({ pages })} label="Páginas internas adicionais" />
                  </div>
                  <div className="mt-4 flex justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <span>{pagesLabel}</span>
                    <span className="font-mono">{quote.pagesCost ? `+ ${formatBRL(quote.pagesCost)}` : "Sem adicional"}</span>
                  </div>
                </Card>

                <Card selected={state.supabase || state.googleBusiness}>
                  <ToggleRow
                    id="supabase"
                    title="Banco de dados para o seu site · Integração com Supabase"
                    description="Para projetos que precisam armazenar dados. As funcionalidades serão definidas na conversa sobre o projeto."
                    price={`+ ${formatBRL(PRICES.supabase)}`}
                    checked={state.supabase}
                    onChange={(supabase) => patch({ supabase })}
                  />
                  <ToggleRow
                    id="google-business"
                    title="Configurar Google Meu Negócio"
                    description="Configuração do perfil da empresa com as informações fornecidas por você."
                    price={`+ ${formatBRL(PRICES.googleBusiness)}`}
                    checked={state.googleBusiness}
                    onChange={(googleBusiness) => patch({ googleBusiness })}
                  />
                </Card>
              </>
            ) : (
              <Card>
                <CardHead icon={Target} title="Uma oferta. Uma ação principal." subtitle="Escolha o destino da campanha e os recursos de captação" />
                <div className="mt-5 space-y-2">
                  <Label htmlFor="landing-goal">Ação principal</Label>
                  <select
                    id="landing-goal"
                    className={selectClass}
                    value={state.landingGoal}
                    onChange={(event) => patch({ landingGoal: event.target.value as QuoteState["landingGoal"] })}
                  >
                    {LANDING_GOALS.map((goal) => (
                      <option key={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-5 rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm font-medium text-foreground">Incluído nos {formatBRL(PRICES.landingPage)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Formulário de até 5 campos com envio para um e-mail, sem banco de dados. Analytics, Pixel, Clarity e duas rodadas de ajustes.
                  </p>
                </div>
                <div className="mt-5">
                  <ToggleRow
                    id="thank-you"
                    title="Página de agradecimento"
                    description="Confirmação da solicitação e orientação do próximo passo."
                    price={`+ ${formatBRL(PRICES.thankYou)}`}
                    checked={state.thankYou}
                    onChange={(thankYou) => patch({ thankYou })}
                  />
                  <ToggleRow
                    id="crm"
                    title="CRM ou e-mail marketing"
                    description="Um formulário conectado a uma ferramenta. Automações avançadas sob consulta."
                    price={`a partir de ${formatBRL(PRICES.crm)}`}
                    checked={state.crm}
                    onChange={(crm) => patch({ crm })}
                  />
                  <ToggleRow
                    id="lead-storage"
                    title="Armazenamento de leads"
                    description={state.crm ? "O CRM recebe os leads. Não há cobrança adicional de armazenamento." : "Salva os dados recebidos, sem painel administrativo."}
                    price={`+ ${formatBRL(PRICES.leadStorage)}`}
                    checked={state.leadStorage && !state.crm}
                    disabled={state.crm}
                    onChange={(leadStorage) => patch({ leadStorage })}
                  />
                </div>
                <div className="mt-2 grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Landing pages adaptadas</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{formatBRL(PRICES.adapted)} cada. Reutilizam estrutura e identidade; alteram textos e imagens.</p>
                    <div className="mt-3">
                      <Stepper value={state.adapted} onChange={(adapted) => patch({ adapted })} label="Landing pages adaptadas" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Landing pages com criação nova</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{formatBRL(PRICES.newLanding)} cada. Nova estrutura para outra oferta.</p>
                    <div className="mt-3">
                      <Stepper value={state.newLanding} onChange={(newLanding) => patch({ newLanding })} label="Landing pages com criação nova" />
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
                  Textos e imagens fornecidos pelo cliente. Copywriting do zero, assinaturas e manutenção ficam fora do valor. Integrações e agradecimento previstos para a página principal; extensão às adicionais a combinar.
                </p>
              </Card>
            )}
          </div>

          {/* ---------- estimativa ---------- */}
          <aside className="lg:sticky lg:top-24">
            <div ref={cardRef} className="rounded-2xl border border-accent/50 bg-accent/5 p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Seu projeto, em números.</h3>
                <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> ao vivo
                </span>
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {trafego ? "Total mensal estimado" : "Investimento estimado"}
              </p>
              {trafego && quote.monthlyFee === null ? (
                <p aria-live="polite" className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  Sob orçamento
                </p>
              ) : (
                <p aria-live="polite" aria-atomic="true" className="mt-2 flex items-baseline gap-1.5 whitespace-nowrap tabular-nums text-foreground">
                  <span className="text-xl text-muted-foreground">R$</span>
                  <strong className={`font-semibold tracking-tight ${((trafego ? quote.monthlyTotal! : quote.total)) >= 100000 ? "text-4xl" : "text-5xl"}`}>
                    {new Intl.NumberFormat("pt-BR").format(trafego ? quote.monthlyTotal! : quote.total)}
                  </strong>
                  <span className="text-xl text-muted-foreground">{trafego ? "/mês" : ",00"}</span>
                </p>
              )}
              {trafego && quote.setupCost > 0 && (
                <p className="mt-3 flex items-baseline gap-2 text-sm">
                  <span className="text-muted-foreground">Total inicial, uma única vez</span>
                  <span className="font-mono text-foreground">{formatBRL(quote.setupCost)}</span>
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {trafego
                  ? "Inclui a verba dos anúncios, que você paga direto à plataforma."
                  : "A partir deste valor, conforme o escopo."}
              </p>

              {/* Recomendação da matriz */}
              {trafego && quote.recommendation && (
                <div className="mt-5 rounded-lg border border-border/60 bg-secondary/40 p-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">Recomendação</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{quote.recommendation.channels}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{quote.recommendation.reason}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">Estimativa sujeita a diagnóstico.</p>
                </div>
              )}

              <div className="mt-6 space-y-3 border-y border-border/60 py-5 text-sm">
                {trafego ? (
                  <>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Gestão mensal</span>
                      <span className="font-mono text-foreground">
                        {quote.monthlyFee === null ? "sob orçamento" : formatBRL(quote.monthlyFee)}
                        {quote.monthlyFee !== null && <span className="text-muted-foreground">/mês</span>}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Verba de anúncios <span className="block text-xs">paga por você à plataforma</span></span>
                      <span className="font-mono text-foreground">
                        {state.adBudget ? formatBRL(state.adBudget) : "a definir"}
                        {state.adBudget > 0 && <span className="text-muted-foreground">/mês</span>}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        Criativos <span className="block text-xs">{state.trafficCreatives} × {formatBRL(PRICES.trafficCreative)}</span>
                      </span>
                      <span className="font-mono text-foreground">
                        {quote.creativesCost ? formatBRL(quote.creativesCost) : "—"}
                        {quote.creativesCost > 0 && <span className="text-muted-foreground">/mês</span>}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-border/60 pt-3">
                      <span className="text-muted-foreground">Site ou landing page <span className="block text-xs">uma única vez</span></span>
                      <span className="font-mono text-foreground">{quote.setupCost ? formatBRL(quote.setupCost) : "já tenho"}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{quote.projectLabel}</span>
                    <span className="font-mono text-foreground">{formatBRL(quote.baseCost)}</span>
                  </div>
                )}
                {!trafego && !landing && (
                  <>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        Páginas internas <span className="block text-xs">{state.pages} × {formatBRL(PRICES.page)}</span>
                      </span>
                      <span className="font-mono text-foreground">{formatBRL(quote.pagesCost)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Integração com Supabase</span>
                      <span className="font-mono text-foreground">{state.supabase ? formatBRL(PRICES.supabase) : "—"}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Google Meu Negócio</span>
                      <span className="font-mono text-foreground">{state.googleBusiness ? formatBRL(PRICES.googleBusiness) : "—"}</span>
                    </div>
                  </>
                )}
                {quote.landingItems.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono text-foreground">{formatBRL(item.cost)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">O que entra no projeto</p>
                <ul className="mt-3 space-y-2">
                  {quote.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20">
                        <Check className="h-2.5 w-2.5 text-accent" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button size="lg" className="group mt-7 w-full" onClick={openRequest}>
                Preparar pedido de proposta
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Você revisa o pedido e envia pelo WhatsApp.</p>
              <a href="#portfolio" className="mt-3 block text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Ver projetos entregues
              </a>
            </div>
            <p className="mt-4 px-2 text-xs leading-relaxed text-muted-foreground/80">
              Esta é uma estimativa inicial. O escopo final e as condições de pagamento serão combinados com Lucas.{" "}
              {trafego
                ? `A verba dos anúncios é paga por você direto à plataforma. Compromisso mínimo de ${TRAFFIC_MIN_MONTHS} meses.`
                : "Domínio, hospedagem, manutenção e planos pagos das ferramentas não estão no cálculo."}
            </p>
          </aside>
        </motion.div>
      </div>

      {/* barra fixa (só no celular) */}
      {showBar && !open && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-xl md:hidden" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">a partir de</p>
            <p className="text-xl font-semibold tabular-nums text-foreground">
              {trafego && quote.monthlyFee === null
                ? "Sob orçamento"
                : formatBRL(trafego ? quote.monthlyTotal! : quote.total)}
              {trafego && quote.monthlyFee !== null && <span className="text-sm font-normal text-muted-foreground">/mês</span>}
            </p>
          </div>
          <Button onClick={openRequest}>
            Preparar pedido <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* ---------- pedido ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-xl">
          {step === "details" ? (
            <>
              <DialogHeader>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">Só mais um passo</p>
                <DialogTitle className="text-2xl leading-tight">Vamos conhecer seu projeto.</DialogTitle>
                <DialogDescription>Inclua seus dados para preparar um pedido completo.</DialogDescription>
              </DialogHeader>
              <p className="rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm font-medium text-foreground">{buildQuoteLine(state)}</p>
              <form onSubmit={submit} noValidate className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-name">Seu nome <span className="text-accent">*</span></Label>
                  <Input id="client-name" autoComplete="name" maxLength={100} placeholder="Como podemos chamar você?" value={client.name} onChange={(e) => setField("name", e.target.value)} aria-invalid={!!errors.name} />
                  {errors.name && <p role="alert" className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-contact">WhatsApp com DDD ou e-mail <span className="text-accent">*</span></Label>
                  <Input id="client-contact" autoComplete="off" maxLength={160} placeholder="(31) 99999-9999 ou voce@empresa.com" value={client.contact} onChange={(e) => setField("contact", e.target.value)} aria-invalid={!!errors.contact} />
                  {errors.contact && <p role="alert" className="text-xs text-destructive">{errors.contact}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-company">Empresa <span className="text-xs font-normal text-muted-foreground">opcional</span></Label>
                  <Input id="client-company" autoComplete="organization" maxLength={120} placeholder="Nome do seu negócio" value={client.company} onChange={(e) => setField("company", e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-objective">Objetivo principal</Label>
                  <select id="client-objective" className={selectClass} value={client.objective} onChange={(e) => setField("objective", e.target.value)} aria-invalid={!!errors.objective}>
                    <option value="">Selecione o objetivo</option>
                    {OBJECTIVES.map((item) => <option key={item}>{item}</option>)}
                  </select>
                  {errors.objective && <p role="alert" className="text-xs text-destructive">{errors.objective}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-segment">Segmento do negócio</Label>
                  <Input id="client-segment" maxLength={120} placeholder="Ex.: clínica odontológica" value={client.segment} onChange={(e) => setField("segment", e.target.value)} aria-invalid={!!errors.segment} />
                  {errors.segment && <p role="alert" className="text-xs text-destructive">{errors.segment}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-timeline">Prazo desejado <span className="text-xs font-normal text-muted-foreground">a confirmar</span></Label>
                  <select id="client-timeline" className={selectClass} value={client.timeline} onChange={(e) => setField("timeline", e.target.value)} aria-invalid={!!errors.timeline}>
                    <option value="">Selecione o prazo</option>
                    {TIMELINES.map((item) => <option key={item}>{item}</option>)}
                  </select>
                  {errors.timeline && <p role="alert" className="text-xs text-destructive">{errors.timeline}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-notes">Conte um pouco sobre o projeto <span className="text-xs font-normal text-muted-foreground">opcional</span></Label>
                  <Textarea id="client-notes" maxLength={1000} rows={3} placeholder="O que você gostaria de alcançar com o novo site?" value={client.notes} onChange={(e) => setField("notes", e.target.value)} />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">Seus dados entram no pedido que você revisa e escolhe enviar. Nada é enviado automaticamente.</p>
                <Button type="submit" size="lg" className="w-full">
                  Revisar meu pedido <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">Seu próximo passo</p>
                <DialogTitle className="text-2xl leading-tight">Pedido pronto para você enviar.</DialogTitle>
                <DialogDescription>Confira o resumo e abra sua conversa com Lucas no WhatsApp.</DialogDescription>
              </DialogHeader>
              <Label htmlFor="request-summary" className="sr-only">Seu pedido completo</Label>
              <Textarea id="request-summary" ref={summaryRef} readOnly rows={12} value={summary} className="max-h-72 min-h-56 resize-y font-mono text-xs leading-relaxed" />
              {copyMessage && <p role="status" className="text-sm text-accent">{copyMessage}</p>}
              <div className="grid gap-3">
                <Button asChild size="lg" className="w-full">
                  <a href={buildWhatsAppURL(summary)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_pedido", { tipo: state.projectType, valor: quote.total })}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar pedido pelo WhatsApp
                  </a>
                </Button>
                <Button type="button" variant="outline" size="lg" className="w-full" onClick={copy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar pedido de proposta
                </Button>
                <Button type="button" variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep("details")}>
                  ← Editar meus dados
                </Button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">O botão abre a conversa com Lucas, no (31) 98763-8437. Confirme o envio no WhatsApp.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
