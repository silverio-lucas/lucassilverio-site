"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="sobre" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Quem está por trás
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center text-center"
        >
          {/* Photo placeholder */}
          <div className="h-32 w-32 rounded-full border-2 border-border bg-secondary/50" />
          
          <h3 className="mt-6 text-xl font-semibold text-foreground">Lucas Silvério</h3>
          <p className="mt-1 text-sm text-accent">Product Designer e desenvolvedor web</p>
          
          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Desenho e programo cada projeto, unindo estratégia, UX, design e desenvolvimento para que o site trabalhe pelo seu negócio. Atendo o Vale do Aço e todo o Brasil, de forma remota.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
