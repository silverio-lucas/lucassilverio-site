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
import { PORTFOLIO_URL, PROJECTS } from "@/lib/portfolio"

interface Step {
  title: string
  text: string
}

interface Faq {
  question: string
  answer: string
}

export interface ServicePageProps {
  title: string
  intro: string
  priceLine: string
  /** Sem simulador para o serviço, a página usa só o WhatsApp como chamada principal. */
  simulate?: { href: string; event: string; label: string }
  whatsapp: { href: string; event: string }
  included: string[]
  optional: string[]
  /** Títulos opcionais do bloco de listas (padrão: preço e custos à parte). */
  listsHeading?: string
  includedTitle?: string
  optionalTitle?: string
  steps: Step[]
  stepsNote: string
  /** Mostra o projeto entregue. Só para serviços em que ele serve de prova. */
  showProof?: boolean
  faqs: Faq[]
  next: { title: string; text: string; href: string; label: string; event: string }
  closing: string
}

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

/** Estrutura das páginas de serviço (site e landing page): cada página só informa texto e preços. */
export function ServicePage({
  title,
  intro,
  priceLine,
  simulate,
  whatsapp,
  included,
  optional,
  listsHeading = "O que entra e o que é cobrado à parte",
  includedTitle = "Está no preço",
  optionalTitle = "Opcionais e custos à parte",
  steps,
  stepsNote,
  showProof = false,
  faqs,
  next,
  closing,
}: ServicePageProps) {
  const project = PROJECTS[0]

  return (
    <main id="conteudo" className="min-h-screen">
      <Navbar />

      {/* Abertura */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground/80">{priceLine}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {simulate && (
              <TrackedButton href={simulate.href} event={simulate.event}>
                {simulate.label}
              </TrackedButton>
            )}
            <TrackedButton href={whatsapp.href} event={whatsapp.event} variant={simulate ? "outline" : "default"} external>
              Chamar no WhatsApp
            </TrackedButton>
          </div>
        </div>
      </section>

      {/* O que entra e o que é cobrado à parte */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {listsHeading}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <ListCard title={includedTitle} items={included} />
            <ListCard title={optionalTitle} items={optional} />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Como funciona</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{stepsNote}</p>
          </div>
          <ol className={`mt-16 grid gap-4 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card/30 p-6">
                <span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projeto entregue */}
      {showProof && project && (
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Um projeto entregue</h2>
            </div>
            <div className="mt-12 rounded-2xl border border-border bg-card/30 p-8">
              <p className="text-sm text-muted-foreground">
                {project.type}: {project.segment}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <TrackedButton href={project.url} event="portfolio_projeto" variant="outline" external params={{ projeto: project.id }}>
                  Ver o site {project.host}
                </TrackedButton>
                <TrackedButton href={PORTFOLIO_URL} event="portfolio_completo" variant="outline" external>
                  Ver portfólio completo
                </TrackedButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Perguntas */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Perguntas frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
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

      {/* Próximo passo */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card/30 p-8 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground">{next.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{next.text}</p>
            <div className="mt-8 flex justify-center">
              <TrackedButton href={next.href} event={next.event} variant="outline">
                {next.label}
              </TrackedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{closing}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {simulate ? "Simule o orçamento agora ou me chame no WhatsApp. Sem compromisso." : "Me chame no WhatsApp para conversar. Sem compromisso."}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {simulate && (
              <TrackedButton href={simulate.href} event={`${simulate.event}_final`}>
                {simulate.label}
              </TrackedButton>
            )}
            <TrackedButton href={whatsapp.href} event={whatsapp.event} variant={simulate ? "outline" : "default"} external>
              Chamar no WhatsApp
            </TrackedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
