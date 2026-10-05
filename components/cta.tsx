"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WHATSAPP_URL } from "@/lib/site-content"
import { track } from "@/lib/track"

export function CTA() {
  return (
    <section id="cta" className="relative py-24">
      {/* Accent glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vamos conversar sobre o seu site?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Me chame no WhatsApp ou simule seu orçamento agora. Sem compromisso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild className="group">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_cta_final")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="group">
            <Link href="#orcamento" onClick={() => track("cta_simular_final")}>
              Simular orçamento
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
