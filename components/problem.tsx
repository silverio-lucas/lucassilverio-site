"use client"

import { motion } from "framer-motion"
import { Clock, Palette, Target, TrendingDown, Users, Cog } from "lucide-react"

const problems = [
  { icon: Clock, title: "Site lento", description: "Quem espera a página abrir no celular vai para o concorrente." },
  { icon: Palette, title: "Visual antigo", description: "Um site desatualizado faz sua empresa parecer menor do que é." },
  { icon: Target, title: "Sem estratégia", description: "Sem clareza sobre o que oferecer, o visitante não entende o que fazer." },
  { icon: TrendingDown, title: "Sem conversão", description: "Muita visita e pouco contato: falta um caminho claro até o WhatsApp." },
  { icon: Users, title: "Sem acompanhamento", description: "Sem dados, você não sabe de onde vêm os clientes nem o que ajustar." },
  { icon: Cog, title: "Sem automação", description: "Contatos que chegam soltos e processos manuais tomam o seu tempo." },
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
            Seu site pode estar afastando clientes
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
