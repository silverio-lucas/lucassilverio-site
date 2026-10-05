"use client"

import { motion } from "framer-motion"
import { Shield, Heart, Zap, MessageCircle, BarChart, TrendingUp } from "lucide-react"

const solutions = [
  { icon: Shield, title: "Presença profissional", description: "Design moderno que transmite credibilidade" },
  { icon: Heart, title: "Mais confiança", description: "Textos e provas que ajudam o visitante a decidir por você." },
  { icon: Zap, title: "Carregamento rápido", description: "Desempenho otimizado nos Core Web Vitals do Google." },
  { icon: MessageCircle, title: "WhatsApp integrado", description: "O interessado fala com você no canal em que você já fecha vendas." },
  { icon: BarChart, title: "Medição completa", description: "Google Analytics, Meta Pixel e Clarity para saber de onde vêm os contatos." },
  { icon: TrendingUp, title: "Estrutura preparada para crescer", description: "Base sólida para anúncios, novas páginas e integrações." },
]

export function Solution() {
  return (
    <section className="relative py-24">
      {/* Subtle accent background */}
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
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mais do que um site
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl border border-border bg-card/30 p-6 transition-all hover:border-accent/30 hover:bg-card/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <solution.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground">{solution.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
