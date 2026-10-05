import { Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/tracked-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BUDGET_HIGH,
  BUDGET_MICRO,
  DISCOVERY_OPTIONS,
  PRICES,
  TRAFFIC_MIN_MONTHS,
  formatBRL,
} from "@/lib/pricing"
import { pageMetadata, whatsappUrl } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Gestão de tráfego para negócios locais | Lucas Silvério",
  description: `Gestão de campanhas no Meta e no Google para negócios locais, a partir de ${formatBRL(PRICES.trafficSingle)} por mês. Os canais são recomendados conforme o negócio, o objetivo e a verba.`,
  path: "/gestao-de-trafego",
})

const WHATSAPP_TRAFEGO = whatsappUrl("Olá, Lucas! Vi a página de gestão de tráfego e quero conversar sobre os meus anúncios.")

// Canal recomendado para cada jeito de o cliente encontrar o negócio (a regra completa está em lib/pricing.ts).
const CHANNELS: Record<string, { channel: string; text: string }> = {
  descoberta: { channel: "Meta Ads", text: "Instagram e Facebook mostram o seu negócio para quem ainda não conhece." },
  busca: { channel: "Google Ads", text: "O seu anúncio aparece no momento em que a pessoa pesquisa pelo que você vende." },
  ambos: { channel: "Meta e Google", text: "Cada canal cuida de uma parte do caminho, quando a verba comporta os dois." },
}

const BUDGET_ROWS = [
  {
    range: `Até ${formatBRL(BUDGET_MICRO)} por mês`,
    text: "Se descobrem por acaso, só Meta. Se procuram ativamente, Google no início, com o Meta entrando para remarketing (anúncios para quem já visitou o seu site) quando houver público suficiente. Se valem os dois casos, Meta e Google.",
  },
  {
    range: `Acima de ${formatBRL(BUDGET_MICRO)} até ${formatBRL(BUDGET_HIGH)} por mês`,
    text: "Combinação de Meta e Google.",
  },
  {
    range: `Acima de ${formatBRL(BUDGET_HIGH)} por mês`,
    text: "Operação sob medida, orçada caso a caso.",
  },
]

const INCLUDED = [
  "Estruturação das campanhas e dos públicos",
  "Acompanhamento das campanhas durante o mês",
  "Relatório mensal com o que foi investido e o que voltou",
]

const CHARGED_APART = [
  "Verba dos anúncios: você paga direto ao Meta e ao Google",
  `Criativos: você envia as imagens e os vídeos, ou eu produzo por ${formatBRL(PRICES.trafficCreative)} cada`,
  `Site ou landing page, se você ainda não tem: a partir de ${formatBRL(PRICES.landingPage)} (landing page) ou ${formatBRL(PRICES.base)} (site institucional), uma única vez`,
]

const PLANS = [
  {
    name: "Um canal",
    price: `a partir de ${formatBRL(PRICES.trafficSingle)}`,
    period: "por mês",
    text: "Meta ou Google, para um negócio e uma oferta principal.",
  },
  {
    name: "Meta e Google",
    price: `a partir de ${formatBRL(PRICES.trafficCombined)}`,
    period: "por mês",
    text: "Os dois canais trabalhando juntos, para um negócio e uma oferta principal.",
  },
  {
    name: "Operações maiores",
    price: "Sob orçamento",
    period: "",
    text: "Várias ofertas, operações mais complexas ou maior investimento.",
  },
]

const STEPS = [
  { title: "Diagnóstico", text: "Entendo o seu negócio, a oferta e a verba, e confirmo os canais recomendados." },
  { title: "Estrutura", text: "Monto as campanhas e os públicos e defino para onde o anúncio leva o visitante: site, landing page ou WhatsApp." },
  { title: "Campanhas no ar", text: "Acompanho os números durante o mês." },
  { title: "Relatório mensal", text: "Você recebe o que foi investido e o que voltou." },
]

const FAQS = [
  {
    question: "Preciso ter site ou landing page?",
    answer: `O anúncio precisa de uma página para receber o visitante. Se você ainda não tem, eu posso criar: landing page a partir de ${formatBRL(PRICES.landingPage)} ou site institucional a partir de ${formatBRL(PRICES.base)}, cobrados uma única vez.`,
  },
  {
    question: "Quanto devo investir em anúncios?",
    answer: `Não existe um número único, porque depende do negócio, da cidade e da oferta. Para a recomendação de canais, trabalho com faixas de verba mensal: até ${formatBRL(BUDGET_MICRO)}, acima disso até ${formatBRL(BUDGET_HIGH)} e acima de ${formatBRL(BUDGET_HIGH)}. O valor final fica definido no diagnóstico.`,
  },
  {
    question: "Quem paga os anúncios?",
    answer: "Você, direto ao Meta e ao Google. A verba dos anúncios não passa por mim e não faz parte da mensalidade da gestão.",
  },
  {
    question: "Os criativos estão incluídos?",
    answer: `Por padrão, você envia as imagens e os vídeos. Se preferir, eu produzo por ${formatBRL(PRICES.trafficCreative)} cada.`,
  },
  {
    question: "Existe prazo mínimo? Você garante resultados?",
    answer: `O compromisso mínimo é de ${TRAFFIC_MIN_MONTHS} meses, porque as campanhas precisam de tempo de aprendizado para dar resultado. Não prometo número de vendas ou de contatos: o resultado depende da oferta, da verba, do mercado e da capacidade de atendimento do negócio.`,
  },
]

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/30 p-8">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Check className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GestaoDeTrafegoPage() {
  return (
    <main id="conteudo" className="min-h-screen">
      <Navbar />

      {/* Abertura */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Gestão de tráfego para negócios locais
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Eu estruturo e administro os seus anúncios no Meta e no Google para levar clientes até o seu site ou a sua landing page, e envio um relatório mensal com o que foi investido e o que voltou.
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground/80">
            A partir de {formatBRL(PRICES.trafficSingle)} por mês com um canal e de {formatBRL(PRICES.trafficCombined)} com Meta e Google. A verba dos anúncios é paga por você, direto às plataformas.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <TrackedButton href="/orcamento?tipo=trafego" event="trafego_cta_simular">
              Simular gestão de tráfego
            </TrackedButton>
            <TrackedButton href={WHATSAPP_TRAFEGO} event="whatsapp_trafego" variant="outline" external>
              Chamar no WhatsApp
            </TrackedButton>
          </div>
        </div>
      </section>

      {/* Como escolho os canais */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Cada negócio pede um canal diferente
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A escolha depende de como os seus clientes chegam até você e de quanto você pode investir por mês em anúncios.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {DISCOVERY_OPTIONS.map((option) => (
              <div key={option.value} className="flex flex-col rounded-2xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-medium text-foreground">{option.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.help}</p>
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-sm font-medium text-foreground">{CHANNELS[option.value].channel}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{CHANNELS[option.value].text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card/30 p-8">
            <h3 className="text-lg font-semibold text-foreground">Como a verba entra na decisão</h3>
            <dl className="mt-6 space-y-5">
              {BUDGET_ROWS.map((row) => (
                <div key={row.range} className="border-t border-border/60 pt-5 first:border-t-0 first:pt-0">
                  <dt className="text-sm font-medium text-foreground">{row.range}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
              É uma estimativa inicial. Eu confirmo os canais no diagnóstico, antes de começar.
            </p>
          </div>
        </div>
      </section>

      {/* O que está incluído */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              O que entra e o que é cobrado à parte
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <ListCard title="Está na mensalidade" items={INCLUDED} />
            <ListCard title="É cobrado à parte" items={CHARGED_APART} />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Valores da gestão</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Valores de entrada, para um negócio e uma oferta principal.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className="flex flex-col rounded-2xl border border-border bg-card/30 p-8">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground/80">
            Compromisso mínimo de {TRAFFIC_MIN_MONTHS} meses, porque as campanhas precisam de tempo de aprendizado. Não prometo número de vendas nem de contatos: o resultado depende da oferta, da verba, do mercado e da capacidade de atendimento do negócio.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Como funciona</h2>
          </div>
          <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card/30 p-6">
                <span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Perguntas */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Perguntas sobre a gestão de tráfego</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card/30 px-6 data-[state=open]:bg-card/50"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Chamada final */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Quer saber qual operação faz sentido para o seu negócio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Simule a gestão agora ou me chame no WhatsApp. Sem compromisso.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedButton href="/orcamento?tipo=trafego" event="trafego_cta_final">
              Simular gestão de tráfego
            </TrackedButton>
            <TrackedButton href={WHATSAPP_TRAFEGO} event="whatsapp_trafego" variant="outline" external>
              Chamar no WhatsApp
            </TrackedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
