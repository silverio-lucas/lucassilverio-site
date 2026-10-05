"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { PORTFOLIO_URL, PROJECTS, type PortfolioProject } from "@/lib/portfolio"
import { track } from "@/lib/track"

function Thumb({ host }: { host: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/60" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground">{host}</span>
      </div>
      <div className="grid grid-cols-[1.25fr_1fr] items-center gap-4 p-5">
        <div className="space-y-2.5">
          <div className="h-2.5 w-[86%] rounded-full bg-foreground/25" />
          <div className="h-1.5 w-[62%] rounded-full bg-foreground/10" />
          <div className="h-1.5 w-[74%] rounded-full bg-foreground/10" />
          <div className="mt-4 h-2.5 w-[34%] rounded-sm bg-accent" />
        </div>
        <div className="mx-auto aspect-square w-[72%] rounded-full bg-accent/25 ring-[10px] ring-inset ring-accent/60" />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name}: ${project.type}. Abre ${project.host} em uma nova aba`}
      onClick={() => track("portfolio_projeto", { projeto: project.id })}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-accent/30 hover:bg-card/50 lg:col-span-1"
    >
      <Thumb host={project.host} />
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.type}</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <span>{project.segment}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </motion.a>
  )
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projetos que já saíram do papel</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Trabalhos entregues, com site no ar para você abrir e conferir</p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          <motion.a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("portfolio_completo")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: PROJECTS.length * 0.1 }}
            className="group flex flex-col rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-accent/30 hover:bg-card/50"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Portfólio completo</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Mais projetos e estudos</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Veja outros trabalhos, processos e experimentos no portfólio.</p>
            <span className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
              Abre em uma nova aba
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </motion.a>

          <motion.a
            href="#orcamento"
            onClick={() => track("portfolio_ir_orcamento")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (PROJECTS.length + 1) * 0.1 }}
            className="group flex flex-col rounded-2xl border border-accent/50 bg-accent/5 p-6 transition-colors hover:bg-accent/10"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">O próximo pode ser o seu</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Vamos desenhar o seu?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Monte o escopo e veja a estimativa na hora.</p>
            <span className="mt-auto flex items-center justify-between border-t border-accent/30 pt-4 text-xs text-foreground">
              Ir para o orçamento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
