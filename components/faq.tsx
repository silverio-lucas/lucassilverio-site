"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Você trabalha sozinho?",
    answer: "Sim. Trabalho diretamente em cada projeto para manter qualidade, comunicação simples e entregas consistentes.",
  },
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "O prazo médio é de 2 a 4 semanas, dependendo da complexidade do projeto e da rapidez no envio dos materiais necessários. Sites mais simples podem ficar prontos em menos tempo.",
  },
  {
    question: "Você faz sites em WordPress?",
    answer: "Não. Utilizo tecnologias modernas como Next.js e React que oferecem melhor performance, segurança e escalabilidade que o WordPress. Isso resulta em sites mais rápidos e com melhor SEO.",
  },
  {
    question: "Como funciona o suporte após a entrega?",
    answer: "O que entra de suporte e ajustes depois da entrega fica definido na proposta, para que não haja surpresa para nenhum dos lados.",
  },
  {
    question: "Posso atualizar o conteúdo do site sozinho?",
    answer: "Posso incluir um painel para você editar textos e conteúdos, ou fazer as atualizações por você. Definimos isso no escopo do projeto.",
  },
  {
    question: "Quais integrações estão incluídas?",
    answer: "WhatsApp, Google Analytics, Meta Pixel e Microsoft Clarity, com eventos nos cliques de contato. Integrações extras entram no orçamento.",
  },
  {
    question: "O site será otimizado para Google?",
    answer: "Todo site sai com SEO técnico: velocidade otimizada, estrutura semântica, meta tags e sitemap. Para buscas locais, posso configurar também o Google Meu Negócio.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tire suas principais dúvidas sobre meu trabalho
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card/30 px-6 data-[state=open]:bg-card/50"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
