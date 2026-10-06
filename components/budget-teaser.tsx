"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@/lib/track"

// O simulador agora vive em /orcamento. Aqui fica só o convite, com o mesmo id para os links antigos (#orcamento).
export function BudgetTeaser() {
  return (
    <section id="orcamento" className="relative py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Monte seu orçamento</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Escolha o que seu negócio precisa, veja a estimativa na hora e envie o pedido de proposta pelo WhatsApp.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="group">
              <Link href="/orcamento" onClick={() => track("teaser_orcamento")}>
                Abrir o simulador
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/gestao-de-trafego" onClick={() => track("teaser_trafego")}>
                Conhecer a gestão de tráfego
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
