"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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
            Vamos conversar sobre o seu projeto?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Me chame no WhatsApp. Sem compromisso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
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
        </motion.div>
      </div>
    </section>
  )
}
