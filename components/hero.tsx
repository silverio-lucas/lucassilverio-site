"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, MessageCircle, BarChart3, Headphones } from "lucide-react"
import Link from "next/link"

const projectSteps = [
  { status: "complete", text: "Planejamento", color: "bg-emerald-400" },
  { status: "complete", text: "Design", color: "bg-emerald-400" },
  { status: "complete", text: "Desenvolvimento", color: "bg-emerald-400" },
  { status: "complete", text: "Revisão", color: "bg-emerald-400" },
  { status: "complete", text: "Publicação", color: "bg-emerald-400" },
]

const socialProof = [
  { icon: Zap, text: "Sites rápidos" },
  { icon: MessageCircle, text: "WhatsApp integrado" },
  { icon: BarChart3, text: "Estrutura escalável" },
  { icon: Headphones, text: "Medição incluída" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Sites que passam confiança e trazem clientes para o seu negócio
            </h1>
            
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Sou Lucas Silvério. Crio sites institucionais e landing pages rápidos, com WhatsApp integrado e medição desde o primeiro dia. Landing pages a partir de R$ 1.200 e sites a partir de R$ 2.000.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="group">
                <Link href="#orcamento">
                  Simular orçamento
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#processo">Ver processo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Foto + status do projeto recente */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:ml-auto lg:mr-0"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50">
              {/* AVIF (mais leve e mais fiel na textura) com WebP de reserva. 960 px cobre telas comuns; 1440 px, as de alta densidade. */}
              <picture>
                <source
                  type="image/avif"
                  srcSet="/lucas-silverio-960.avif 960w, /lucas-silverio-1440.avif 1440w"
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 384px"
                />
                <img
                  src="/lucas-silverio-960.webp"
                  alt="Lucas Silvério sentado em um sofá claro, de blusa preta de gola alta, olhando para a câmera"
                  width={960}
                  height={1200}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full"
                />
              </picture>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              {/* Projeto recente */}
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-card/80 p-4 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">projeto.status</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-medium text-foreground">luanacopywriter.com.br</h3>
                  <span className="shrink-0 font-mono text-xs text-emerald-400">Publicado</span>
                </div>
                <div
                  className="mt-3 flex gap-1.5"
                  role="img"
                  aria-label={`Etapas concluídas: ${projectSteps.map((step) => step.text).join(", ")}`}
                >
                  {projectSteps.map((step) => (
                    <div key={step.text} className={`h-1 flex-1 rounded-full ${step.color}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 border-t border-border/50 pt-12"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {socialProof.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
