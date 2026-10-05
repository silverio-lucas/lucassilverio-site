"use client"

import { motion } from "framer-motion"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRICES, TRAFFIC_MIN_MONTHS, formatBRL } from "@/lib/pricing"
import { track } from "@/lib/track"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Preços vêm de lib/pricing.ts: os mesmos do simulador, para nunca divergirem.
const services = [
  {
    type: "site" as const,
    name: "Site institucional",
    price: formatBRL(PRICES.base),
    description: "Para apresentar a empresa, os serviços e os canais de contato.",
    features: [
      { text: "Página principal completa", tooltip: "Apresentação da empresa, serviços e canais de contato" },
      { text: `Páginas internas: + ${formatBRL(PRICES.page)} cada`, tooltip: null },
      { text: "Integração WhatsApp", tooltip: null },
      { text: "Analytics, Pixel e Clarity", tooltip: "Google Analytics, Meta Pixel e Microsoft Clarity já incluídos" },
      { text: "SEO básico", tooltip: "Otimizações técnicas iniciais para mecanismos de busca" },
    ],
    extras: `Opcionais: banco de dados (Supabase) e Google Meu Negócio, + ${formatBRL(PRICES.supabase)} cada.`,
  },
  {
    type: "landing" as const,
    name: "Landing page",
    price: formatBRL(PRICES.landingPage),
    description: "Para uma oferta ou campanha, com uma ação principal clara.",
    features: [
      { text: "Uma página focada em uma oferta", tooltip: null },
      { text: "Ação principal: WhatsApp, leads ou checkout", tooltip: null },
      { text: "Formulário de até 5 campos", tooltip: "Envio para um e-mail, sem banco de dados" },
      { text: "Analytics, Pixel e Clarity", tooltip: "Google Analytics, Meta Pixel e Microsoft Clarity já incluídos" },
      { text: "Duas rodadas de ajustes", tooltip: null },
    ],
    extras: `Opcionais: página de agradecimento (+ ${formatBRL(PRICES.thankYou)}), CRM (a partir de ${formatBRL(PRICES.crm)}) e armazenamento de leads (+ ${formatBRL(PRICES.leadStorage)}).`,
  },
  {
    type: "trafego" as const,
    name: "Gestão de tráfego",
    price: formatBRL(PRICES.trafficSingle),
    period: "por mês",
    description: "Para negócios locais que querem aparecer para quem compra por perto.",
    features: [
      { text: "Canais recomendados conforme o seu caso", tooltip: "Meta, Google ou os dois, segundo o negócio, o objetivo e a verba" },
      { text: `Um canal: a partir de ${formatBRL(PRICES.trafficSingle)}/mês`, tooltip: null },
      { text: `Meta + Google: a partir de ${formatBRL(PRICES.trafficCombined)}/mês`, tooltip: null },
      { text: "Campanhas, públicos e relatório mensal", tooltip: null },
      { text: `Compromisso mínimo de ${TRAFFIC_MIN_MONTHS} meses`, tooltip: "Campanhas precisam de tempo de aprendizado para dar resultado" },
    ],
    extras: `Valores para um negócio e uma oferta principal. Mais ofertas ou operações maiores ficam sob orçamento. Verba de anúncios, criativos (${formatBRL(PRICES.trafficCreative)} cada) e a criação do site ou da landing page são cobrados à parte.`,
  },
]

export function Pricing() {
  // Leva o visitante ao orçamento já com o tipo escolhido.
  const goToBudget = (type: "site" | "landing" | "trafego") => {
    window.dispatchEvent(new CustomEvent("simulador:tipo", { detail: type }))
    track("servico_simular", { tipo: type })
  }

  return (
    <section id="planos" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Serviços
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Do site ao anúncio, conforme o momento do seu negócio
          </p>
        </motion.div>

        <TooltipProvider delayDuration={200}>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col rounded-2xl border border-border bg-card/30 p-8"
              >
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">a partir de</span>
                    <span className="text-3xl font-semibold tracking-tight text-foreground">{service.price}</span>
                    {"period" in service && service.period && (
                      <span className="text-sm text-muted-foreground">{service.period}</span>
                    )}
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <Check className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        {feature.text}
                        {feature.tooltip && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground/50 transition-colors hover:text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[220px] text-center">
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex-1 border-t border-border/60 pt-5 text-xs leading-relaxed text-muted-foreground/80">
                  {service.extras}
                </p>

                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <a href="#orcamento" onClick={() => goToBudget(service.type)}>
                      Simular este orçamento
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-muted-foreground/70"
        >
          Valores de entrada. Cada projeto é analisado individualmente e recursos adicionais podem ser incluídos. Resultados de tráfego dependem de oferta, verba e mercado.
        </motion.p>
      </div>
    </section>
  )
}
