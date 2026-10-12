"use client"

import { motion } from "framer-motion"
import { Clock, Palette, Target, TrendingDown, Users, Cog } from "lucide-react"

const problems = [
  { icon: Users, title: "Ninguém sabe que você existe", description: "Seus clientes em potencial procuram no Google e Maps, mas não te encontram." },
  { icon: Target, title: "Sem presença digital", description: "Não aparecer onde o cliente procura é deixar dinheiro sobre a mesa." },
  { icon: TrendingDown, title: "Sem estratégia de atração", description: "Sem clareza e planejamento, o cliente descobre o concorrente primeiro." },
  { icon: Clock, title: "Processos lentos", description: "Contatos que chegam soltos e sem integração tomam o seu tempo precioso." },
  { icon: Palette, title: "Perfil desatualizado", description: "Um Perfil do Google incompleto ou com fotos antigas afasta novos clientes." },
  { icon: Cog, title: "Sem dados", description: "Sem acompanhamento, você não sabe o que está funcionando ou o que ajustar." },
]

export function Problem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Seus clientes locais procuram antes de ligar
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl border border-border bg-card/30 p-6 transition-colors hover:border-border/80 hover:bg-card/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <problem.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-medium text-foreground">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
