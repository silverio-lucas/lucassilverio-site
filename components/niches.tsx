"use client"

import { motion } from "framer-motion"
import { Briefcase, User, Store, Sparkles, Megaphone } from "lucide-react"

const niches = [
  { icon: Briefcase, name: "Empresas de serviços", description: "Prestadores e negócios B2B" },
  { icon: User, name: "Profissionais liberais", description: "Consultórios, escritórios e autônomos" },
  { icon: Store, name: "Comércios e negócios locais", description: "Lojas, estúdios e franquias" },
  { icon: Sparkles, name: "Marcas pessoais", description: "Consultores, especialistas e criadores" },
  { icon: Megaphone, name: "Empresas que anunciam", description: "Páginas e campanhas trabalhando juntas" },
]

export function Niches() {
  return (
    <section id="nichos" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Para quem é
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Empresas que precisam ser encontradas e passar confiança online
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche, index) => (
            <motion.div
              key={niche.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/30 p-5 transition-colors hover:border-border/80 hover:bg-card/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <niche.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{niche.name}</h3>
                <p className="text-sm text-muted-foreground">{niche.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
