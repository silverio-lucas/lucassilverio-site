"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Conversa inicial",
    description: "Pelo WhatsApp ou em reunião, conforme o caso",
  },
  {
    number: "02",
    title: "Entendimento do negócio",
    description: "Analiso seu mercado, público e diferenciais",
  },
  {
    number: "03",
    title: "Organização do conteúdo",
    description: "Estruturo textos, imagens e informações do site",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Construo seu site com tecnologia moderna",
  },
  {
    number: "05",
    title: "Publicação",
    description: "Publico e configuro todas as integrações e a medição",
  },
]

export function Process() {
  return (
    <section id="processo" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Como trabalho
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Um processo claro que garante qualidade e entregas consistentes
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-border" />
            
            <div className="relative grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background">
                    <span className="font-mono text-lg font-semibold text-foreground">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-base font-medium text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="mt-12 lg:hidden">
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <span className="font-mono text-lg font-semibold text-foreground">{step.number}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-base font-medium text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
