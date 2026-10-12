"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PRICES, TRAFFIC_MIN_MONTHS, formatBRL } from "@/lib/pricing"

const faqs = [
  {
    question: "Você trabalha sozinho?",
    answer: "Sim. Trabalho diretamente em cada projeto para manter qualidade, comunicação simples e entregas consistentes, do primeiro contato aos relatórios.",
  },
  {
    question: "Como funciona o posicionamento digital?",
    answer: "Começo com um diagnóstico: analisamos seu mercado, concorrentes e oportunidades. Depois, desenhamos a estratégia: se é site, tráfego, Perfil no Google ou uma combinação. Cada ferramenta tem seu tempo — sites ficam prontos em até 10 dias úteis, campanhas precisam de meses de aprendizado. Tudo sai documentado na proposta.",
  },
  {
    question: "Preciso de um site para começar?",
    answer: "Não necessariamente. Se você tem pouco orçamento ou quer começar rápido, o Perfil da Empresa no Google (Google Meu Negócio) já posiciona você nas buscas locais e é mais rápido de montar. O site entra quando há verba ou quando você quer expandir para buscas em todo o Brasil. A gestão de tráfego funciona com ou sem site.",
  },
  {
    question: "O que entra no site?",
    answer: "Página principal com apresentação da empresa, serviços, benefícios e canais de contato. Você define o número de páginas internas. Todos os sites saem com WhatsApp integrado, Google Analytics, Meta Pixel, Microsoft Clarity, velocidade otimizada, estrutura SEO técnico e sitemap. O conteúdo pode ser gerenciado por você através de um painel, ou por mim — escolhemos no escopo.",
  },
  {
    question: "Como funciona a gestão de tráfego?",
    answer: `Eu estruturo e administro as suas campanhas no Meta, no Google ou nos dois, conforme o seu negócio, o seu objetivo e a verba disponível. Você recebe relatório semanal simples e relatório mensal detalhado. A gestão começa em ${formatBRL(PRICES.trafficSingle)} com um canal e ${formatBRL(PRICES.trafficCombined)} com Meta e Google. A verba dos anúncios é separada: vai direto para as plataformas. Criativos saem de você ou produzidos por mim, a ${formatBRL(PRICES.trafficCreative)} cada.`,
  },
  {
    question: "Como funciona o Perfil da Empresa no Google?",
    answer: `Configuramos e otimizamos seu perfil para máxima visibilidade no Google Maps e nas buscas locais. Depois, gerencio atualizações, fotos, horários, respostas a clientes e relatórios semanais. Sai a partir de ${formatBRL(PRICES.googleBusiness)} de instalação, depois ${formatBRL(PRICES.googleBusinessMonthly)}/mês com gestão contínua. Tem compromisso mínimo de 6 meses para consolidar.`,
  },
  {
    question: "A gestão de tráfego tem prazo mínimo? Você garante resultados?",
    answer: `O compromisso mínimo é de ${TRAFFIC_MIN_MONTHS} meses, porque as campanhas precisam de tempo de aprendizado para dar resultado. Não prometo número de vendas ou de contatos: o resultado depende da oferta, da verba, do mercado e da capacidade de atendimento do seu negócio. Trabalho com dados — ajustes vêm de relatórios e testes.`,
  },
  {
    question: "Como você acompanha os resultados?",
    answer: "Tudo é monitorado através de dados: Google Analytics, Meta Pixel, performance de campanhas. Você recebe relatórios semanais com resumo das ações e relatórios mensais detalhados com análise estratégica. Nos 1-1s mensais, a gente revisa números, aprova ajustes e planeja os próximos passos.",
  },
  {
    question: "Vocês atendem empresas em outros estados?",
    answer: "Sim. Atendo o Vale do Aço presencialmente, mas trabalho de forma remota com empresas em todo o Brasil. Não há diferença em qualidade ou tempo de resposta — é tudo online, com videochamadas para apresentações e acompanhamento.",
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
