/**
 * Preços e cálculo do orçamento. Porta fiel do simulador do cliente (pricing.js):
 * mesma oferta, mesmas regras e mesmos textos do pedido.
 */
export const PRICES = Object.freeze({
  base: 2000,
  landingPage: 1200,
  page: 400,
  supabase: 500,
  googleBusiness: 500,
  // Gestão mensal do Perfil da Empresa no Google: respostas a avaliações e 3 publicações por semana.
  googleBusinessMonthly: 400,
  thankYou: 200,
  leadStorage: 500,
  crm: 500,
  adapted: 600,
  newLanding: 1200,
  // Gestão de tráfego: mensalidade recorrente, cobrada à parte da criação do site.
  // Gestão de tráfego para negócios locais
  trafficSingle: 1000,
  trafficCombined: 1800,
  trafficCreative: 300,
})
export const TRAFFIC_MIN_MONTHS = 3
export const TRAFFIC_MIN_BUDGET = 1500
export const MAX_PAGES = 999

export const LANDING_GOALS = ["WhatsApp", "Captar leads", "Encaminhar para checkout"] as const
export type LandingGoal = (typeof LANDING_GOALS)[number]
export type ProjectType = "site" | "landing" | "trafego"

/* ---------- Gestão de tráfego para negócios locais ----------
 * Os canais são recomendados conforme o negócio, o objetivo e a verba.
 * Faixas de verba: micro até R$ 1.500, médio acima de 1.500 até 5.000, alto acima de 5.000.
 */
export const BUDGET_MICRO = 1500
export const BUDGET_HIGH = 5000

export const DISCOVERY_OPTIONS = [
  { value: "descoberta", label: "Descobrem por acaso", help: "As pessoas conhecem o negócio navegando nas redes, sem estarem procurando." },
  { value: "busca", label: "Procuram ativamente", help: "As pessoas já sabem o que querem e pesquisam no Google na hora da necessidade." },
  { value: "ambos", label: "Os dois casos", help: "Parte descobre nas redes e parte chega pesquisando." },
] as const
export type Discovery = (typeof DISCOVERY_OPTIONS)[number]["value"]

export const TRAFFIC_GOALS = [
  { value: "whatsapp", label: "Conversas no WhatsApp" },
  { value: "leads", label: "Cadastros (leads) para eu contatar" },
  { value: "ligacoes", label: "Ligações telefônicas" },
  { value: "visitas", label: "Visitas ao meu estabelecimento" },
] as const
export type TrafficGoal = (typeof TRAFFIC_GOALS)[number]["value"]

export const TRAFFIC_PAGES = ["nenhuma", "landing", "site"] as const
export type TrafficPage = (typeof TRAFFIC_PAGES)[number]

export type TrafficSetup = "single" | "combined" | "custom"

export interface QuoteState {
  projectType: ProjectType
  projectName: string
  objective: string
  segment: string
  timeline: string
  landingGoal: LandingGoal
  thankYou: boolean
  leadStorage: boolean
  crm: boolean
  adapted: number
  newLanding: number
  pages: number
  supabase: boolean
  googleBusiness: boolean
  discovery: Discovery
  adBudget: number
  trafficGoal: TrafficGoal
  hasSite: boolean
  hasGoogleProfile: boolean
  trafficCreatives: number
  trafficPage: TrafficPage
}

export const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)
export const formatFullBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

export function normalizePages(value: unknown): number {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? Math.min(MAX_PAGES, Math.max(0, Math.round(numeric))) : 0
}

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : ""

export function normalizeState(value: unknown): QuoteState {
  const input = (value && typeof value === "object" ? value : {}) as Record<string, unknown>
  return {
    projectType:
      input.projectType === "landing" ? "landing" : input.projectType === "trafego" ? "trafego" : "site",
    projectName: typeof input.projectName === "string" ? input.projectName.slice(0, 100) : "",
    objective: text(input.objective, 120),
    segment: text(input.segment, 120),
    timeline: text(input.timeline, 120),
    landingGoal: (LANDING_GOALS as readonly unknown[]).includes(input.landingGoal)
      ? (input.landingGoal as LandingGoal)
      : "WhatsApp",
    thankYou: input.thankYou === true,
    leadStorage: input.leadStorage === true,
    crm: input.crm === true,
    adapted: normalizePages(input.adapted ?? 0),
    newLanding: normalizePages(input.newLanding ?? 0),
    pages: normalizePages(input.pages ?? 0),
    supabase: input.supabase === true,
    googleBusiness: input.googleBusiness === true,
    discovery: (DISCOVERY_OPTIONS as readonly { value: string }[]).some((o) => o.value === input.discovery)
      ? (input.discovery as Discovery)
      : "descoberta",
    adBudget: Math.min(1000000, Math.max(0, Math.round(Number(input.adBudget) || 0))),
    trafficGoal: (TRAFFIC_GOALS as readonly { value: string }[]).some((o) => o.value === input.trafficGoal)
      ? (input.trafficGoal as TrafficGoal)
      : "whatsapp",
    hasSite: input.hasSite === true,
    hasGoogleProfile: input.hasGoogleProfile === true,
    trafficCreatives: Math.min(20, normalizePages(input.trafficCreatives ?? 0)),
    trafficPage: (TRAFFIC_PAGES as readonly unknown[]).includes(input.trafficPage)
      ? (input.trafficPage as TrafficPage)
      : "nenhuma",
  }
}

/**
 * Matriz: como os clientes encontram a empresa × faixa de verba.
 * micro até 1.500 · médio acima de 1.500 até 5.000 · alto acima de 5.000 (sob orçamento).
 */
export function recommendTraffic(discovery: Discovery, adBudget: number): {
  setup: TrafficSetup
  channels: string
  reason: string
  fee: number | null
} {
  if (adBudget > BUDGET_HIGH) {
    return {
      setup: "custom",
      channels: "Meta Ads + Google Ads, com estrutura sob medida",
      reason: "Com essa verba dá para trabalhar várias ofertas e campanhas ao mesmo tempo, então a gestão é orçada caso a caso.",
      fee: null,
    }
  }
  if (adBudget <= BUDGET_MICRO && discovery === "descoberta") {
    return {
      setup: "single",
      channels: "Somente Meta Ads",
      reason: "Seu cliente descobre o negócio navegando, e com essa verba é melhor concentrar tudo em um canal só.",
      fee: PRICES.trafficSingle,
    }
  }
  if (adBudget <= BUDGET_MICRO && discovery === "busca") {
    return {
      setup: "single",
      channels: "Google Ads no início; Meta para remarketing depois",
      reason: "Seu cliente já procura pelo que você faz, então o Google vem primeiro. O Meta entra só para remarketing, quando houver público suficiente.",
      fee: PRICES.trafficSingle,
    }
  }
  return {
    setup: "combined",
    channels: "Meta Ads + Google Ads",
    reason: "Sua verba comporta os dois canais: o Google capta quem já procura e o Meta apresenta o negócio para quem ainda não conhece.",
    fee: PRICES.trafficCombined,
  }
}

export interface LandingItem {
  label: string
  cost: number
}

export function calculateQuote(input: unknown) {
  const state = normalizeState(input)

  // Gestão de tráfego: mensalidade + entrada opcional da página de destino.
  if (state.projectType === "trafego") {
    const rec = recommendTraffic(state.discovery, state.adBudget)
    const creativesCost = state.trafficCreatives * PRICES.trafficCreative
    // Mensalidade da gestão: null quando a operação é sob orçamento.
    const monthlyFee = rec.fee
    const setupCost =
      state.trafficPage === "landing" ? PRICES.landingPage : state.trafficPage === "site" ? PRICES.base : 0
    // Total mensal = gestão + verba + criativos. Sem fechar valor quando é sob orçamento.
    const monthlyTotal = monthlyFee === null ? null : monthlyFee + state.adBudget + creativesCost
    const goalLabel = TRAFFIC_GOALS.find((g) => g.value === state.trafficGoal)!.label
    const scope = [
      `Canais recomendados: ${rec.channels}`,
      `Objetivo: ${goalLabel}`,
      "Estruturação de campanhas, públicos e acompanhamento",
      "Relatório mensal com o que foi investido e o que voltou",
      state.trafficCreatives > 0
        ? `${state.trafficCreatives} ${state.trafficCreatives === 1 ? "criativo produzido" : "criativos produzidos"} por mim a cada mês`
        : "Criativos (imagens e vídeos) fornecidos por você",
      ...(state.trafficPage === "landing" ? ["Landing page para receber os anúncios"] : []),
      ...(state.trafficPage === "site" ? ["Site institucional para receber os anúncios"] : []),
      ...(state.hasGoogleProfile ? [] : ["Perfil da Empresa no Google a configurar"]),
      `Compromisso mínimo de ${TRAFFIC_MIN_MONTHS} meses`,
    ]
    return {
      ...state,
      includedInternalPages: 0,
      baseCost: monthlyFee ?? 0,
      projectLabel: "Gestão de tráfego",
      pagesCost: 0,
      supabaseCost: 0,
      googleBusinessCost: 0,
      landingItems: [] as LandingItem[],
      recommendation: rec,
      monthlyFee,
      creativesCost,
      monthlyTotal,
      setupCost,
      totalPages: state.trafficPage === "nenhuma" ? 0 : 1,
      total: setupCost,
      scope,
    }
  }

  const landing = state.projectType === "landing"
  const baseCost = landing ? PRICES.landingPage : PRICES.base
  const projectLabel = landing ? "Landing page" : "Site institucional"
  const includedInternalPages = landing ? 0 : state.pages
  const pagesCost = includedInternalPages * PRICES.page
  const supabaseCost = !landing && state.supabase ? PRICES.supabase : 0
  const googleBusinessCost = !landing && state.googleBusiness ? PRICES.googleBusiness : 0

  const scope: string[] = [
    landing ? "1 landing page focada em uma oferta ou campanha" : "1 página principal para o site institucional",
  ]
  if (includedInternalPages > 0) {
    scope.push(`${includedInternalPages} ${includedInternalPages === 1 ? "página interna adicional" : "páginas internas adicionais"}`)
  }
  scope.push(
    landing
      ? "Apresentação de uma oferta e chamada para uma ação principal"
      : "Apresentação da empresa, serviços e canais de contato",
  )
  scope.push("Google Analytics, Meta Pixel e Microsoft Clarity")
  if (!landing && state.supabase) scope.push("Integração com Supabase")
  if (!landing && state.googleBusiness) scope.push("Configuração do Google Meu Negócio")

  const landingItems: LandingItem[] = landing
    ? [
        ...(state.thankYou ? [{ label: "Página de agradecimento", cost: PRICES.thankYou }] : []),
        ...(state.crm ? [{ label: "Integração simples com CRM ou e-mail marketing (a partir de)", cost: PRICES.crm }] : []),
        ...(state.leadStorage && !state.crm
          ? [{ label: "Armazenamento de leads, sem painel administrativo", cost: PRICES.leadStorage }]
          : []),
        ...(state.adapted
          ? [{ label: `${state.adapted} landing page(s) adicional(is) adaptada(s)`, cost: state.adapted * PRICES.adapted }]
          : []),
        ...(state.newLanding
          ? [{ label: `${state.newLanding} landing page(s) com criação nova`, cost: state.newLanding * PRICES.newLanding }]
          : []),
      ]
    : []

  if (landing) {
    scope.push(
      `Ação principal: ${state.landingGoal}`,
      "Formulário básico de até 5 campos com envio para um e-mail, sem banco de dados",
      "Duas rodadas de ajustes",
    )
    scope.push(...landingItems.map((item) => item.label))
    if (state.crm) scope.push("Leads recebidos no CRM; sem cobrança adicional de armazenamento")
  }

  return {
    ...state,
    includedInternalPages,
    baseCost,
    projectLabel,
    pagesCost,
    supabaseCost,
    googleBusinessCost,
    landingItems,
    recommendation: null as ReturnType<typeof recommendTraffic> | null,
    monthlyFee: 0,
    creativesCost: 0,
    monthlyTotal: 0 as number | null,
    setupCost: 0,
    totalPages: landing
      ? 1 + state.adapted + state.newLanding + Number(state.thankYou)
      : includedInternalPages + 1,
    total:
      baseCost + pagesCost + supabaseCost + googleBusinessCost + landingItems.reduce((sum, item) => sum + item.cost, 0),
    scope,
  }
}

export type Quote = ReturnType<typeof calculateQuote>

export function buildSummary(input: unknown): string {
  const quote = calculateQuote(input)

  if (quote.projectType === "trafego") {
    const rec = quote.recommendation!
    const goalLabel = TRAFFIC_GOALS.find((g) => g.value === quote.trafficGoal)!.label
    const discoveryLabel = DISCOVERY_OPTIONS.find((d) => d.value === quote.discovery)!.label
    const sob = quote.monthlyFee === null
    return [
      "ORÇAMENTO ESTIMADO · LUCAS SILVÉRIO",
      quote.projectName.trim() ? `Projeto: ${quote.projectName.trim()}` : "Projeto: Gestão de tráfego",
      "",
      "Tipo de projeto: Gestão de tráfego para negócios locais",
      ...(quote.objective ? [`Objetivo do negócio: ${quote.objective}`] : []),
      ...(quote.segment ? [`Segmento: ${quote.segment}`] : []),
      ...(quote.timeline ? [`Início desejado: ${quote.timeline} (a confirmar)`] : []),
      "",
      "O QUE EU RESPONDI",
      `Como meus clientes me encontram: ${discoveryLabel}`,
      `Verba mensal para anúncios: ${quote.adBudget ? formatFullBRL(quote.adBudget) : "a definir"}`,
      `Objetivo principal: ${goalLabel}`,
      `Já tenho site ou landing page: ${quote.hasSite ? "sim" : "não"}`,
      `Já tenho Perfil da Empresa no Google: ${quote.hasGoogleProfile ? "sim" : "não"}`,
      "",
      "RECOMENDAÇÃO (estimativa, sujeita a diagnóstico)",
      rec.channels,
      rec.reason,
      "",
      "COMPOSIÇÃO DO INVESTIMENTO",
      `Gestão mensal: ${sob ? "sob orçamento" : formatFullBRL(quote.monthlyFee!)}`,
      `Verba de anúncios (paga por você à plataforma): ${quote.adBudget ? `${formatFullBRL(quote.adBudget)} por mês` : "a definir"}`,
      `Criativos: ${quote.trafficCreatives ? `${quote.trafficCreatives} × ${formatFullBRL(PRICES.trafficCreative)} = ${formatFullBRL(quote.creativesCost)} por mês` : "fornecidos por mim"}`,
      `Site ou landing page: ${quote.trafficPage === "nenhuma" ? "já tenho" : quote.trafficPage === "landing" ? `landing page, ${formatFullBRL(PRICES.landingPage)} uma única vez` : `site institucional, ${formatFullBRL(PRICES.base)} uma única vez`}`,
      "",
      sob
        ? "TOTAL MENSAL: sob orçamento, definido no diagnóstico"
        : `TOTAL MENSAL ESTIMADO: ${formatFullBRL(quote.monthlyTotal!)}`,
      ...(quote.setupCost
        ? [`TOTAL INICIAL (uma única vez): ${formatFullBRL(quote.setupCost)}`]
        : []),
      "",
      "ESCOPO INCLUÍDO",
      ...quote.scope.map((item) => `• ${item}`),
      "",
      "CONDIÇÕES",
      "Estimativa inicial, sujeita a diagnóstico e à definição do escopo.",
      "A verba dos anúncios é paga por você direto à plataforma e não faz parte da mensalidade da gestão.",
      "Os valores atendem inicialmente um negócio e uma oferta principal.",
      `Compromisso mínimo de ${TRAFFIC_MIN_MONTHS} meses: campanhas precisam de tempo de aprendizado para dar resultado.`,
      "Resultados dependem de oferta, verba, mercado e capacidade de atendimento; não há garantia de número de vendas.",
      "Condições de pagamento a combinar.",
      "",
      "Este é um pedido de proposta, sem contratação ou cobrança automática.",
    ].join("\n")
  }

  return [
    "ORÇAMENTO ESTIMADO · LUCAS SILVÉRIO",
    quote.projectName.trim() ? `Projeto: ${quote.projectName.trim()}` : `Projeto: ${quote.projectLabel}`,
    "",
    `Tipo de projeto: ${quote.projectLabel}`,
    ...(quote.objective ? [`Objetivo: ${quote.objective}`] : []),
    ...(quote.segment ? [`Segmento: ${quote.segment}`] : []),
    ...(quote.timeline ? [`Prazo desejado: ${quote.timeline} (a confirmar)`] : []),
    "",
    "COMPOSIÇÃO DO INVESTIMENTO",
    `${quote.projectLabel}: ${formatFullBRL(quote.baseCost)}`,
    ...(quote.projectType === "site"
      ? [`Páginas internas: ${quote.includedInternalPages} × ${formatFullBRL(PRICES.page)} = ${formatFullBRL(quote.pagesCost)}`]
      : []),
    ...(quote.projectType === "site"
      ? [
          `Integração com Supabase: ${quote.supabase ? formatFullBRL(quote.supabaseCost) : "não incluída"}`,
          `Configuração do Google Meu Negócio: ${quote.googleBusiness ? formatFullBRL(quote.googleBusinessCost) : "não incluída"}`,
        ]
      : quote.landingItems.map((item) => `${item.label}: ${formatFullBRL(item.cost)}`)),
    "",
    `INVESTIMENTO ESTIMADO: a partir de ${formatFullBRL(quote.total)}`,
    "",
    "ESCOPO INCLUÍDO",
    ...quote.scope.map((item) => `• ${item}`),
    `Total: ${quote.totalPages} ${quote.totalPages === 1 ? "página" : "páginas"}.`,
    "",
    "CONDIÇÕES",
    "Estimativa inicial, sujeita à definição do escopo no briefing.",
    ...(quote.projectType === "site" && quote.supabase
      ? ["Funcionalidades e estrutura da integração com Supabase a definir no briefing."]
      : []),
    "Domínio, hospedagem, manutenção e eventuais planos pagos das ferramentas não estão contemplados neste cálculo.",
    ...(quote.projectType === "landing"
      ? [
          "Textos e imagens fornecidos pelo cliente. Copywriting do zero não incluído.",
          "Adaptações reutilizam estrutura e identidade; criação nova tem nova estrutura para outra oferta.",
          "CRM: um formulário conectado a uma ferramenta. Automações avançadas sob consulta.",
          "Adicionais de integração e agradecimento previstos para a landing page principal; extensão às demais páginas a combinar no briefing.",
        ]
      : []),
    "Condições de pagamento a combinar.",
  ].join("\n")
}

/** Linha-resumo mostrada no início do pedido, ex.: "Site institucional · 4 páginas · a partir de R$ 3.700". */
export function buildQuoteLine(input: unknown): string {
  const quote = calculateQuote(input)
  if (quote.projectType === "trafego") {
    const mensal =
      quote.monthlyFee === null
        ? "gestão sob orçamento"
        : `a partir de ${formatBRL(quote.monthlyTotal!)}/mês`
    return quote.setupCost
      ? `Gestão de tráfego · ${mensal} · + ${formatBRL(quote.setupCost)} de entrada`
      : `Gestão de tráfego · ${mensal}`
  }
  const pages = `${quote.totalPages} ${quote.totalPages === 1 ? "página" : "páginas"}`
  return `${quote.projectLabel} · ${pages} · a partir de ${formatBRL(quote.total)}`
}
