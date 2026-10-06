import { ServicePage } from "@/components/service-page"
import { PRICES, formatBRL } from "@/lib/pricing"
import { pageMetadata, whatsappUrl } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Criação de landing pages para campanhas | Lucas Silvério",
  description: `Landing pages com uma oferta e uma ação principal, a partir de ${formatBRL(PRICES.landingPage)}, com a medição configurada desde o primeiro dia.`,
  path: "/landing-pages",
})

const WHATSAPP_LANDING = whatsappUrl("Olá, Lucas! Vi a página de landing pages e quero conversar sobre uma landing page para a minha oferta.")

const included = [
  "Uma landing page com uma oferta ou objetivo principal",
  "Estrutura pensada para conversão, com um chamado claro para a ação principal: WhatsApp, leads ou checkout",
  "Formulário básico de até 5 campos, com envio para um e-mail",
  "Google Analytics, Meta Pixel e Microsoft Clarity já configurados",
  "Duas rodadas de ajustes",
]

const optional = [
  `Página de agradecimento: + ${formatBRL(PRICES.thankYou)}`,
  `Armazenamento de leads (Supabase): + ${formatBRL(PRICES.leadStorage)}`,
  `Integração com CRM ou plataforma de e-mail: a partir de ${formatBRL(PRICES.crm)}`,
  `Landing page adaptada a partir de uma existente: + ${formatBRL(PRICES.adapted)} por versão`,
  `Nova landing page independente: + ${formatBRL(PRICES.newLanding)}`,
  "Domínio, hospedagem e custos de mídia ficam fora do preço e são combinados à parte, quando necessários",
]

const steps = [
  { title: "Oferta", text: "Defino com você a oferta e a ação principal que a página precisa gerar." },
  { title: "Conteúdo", text: "Você envia os textos e as imagens, e eu organizo a hierarquia da página." },
  { title: "Desenvolvimento", text: "Construo a página, o formulário e a medição." },
  { title: "Ajustes e publicação", text: "Duas rodadas de ajustes, e a página vai ao ar com Analytics, Pixel e Clarity." },
]

const faqs = [
  {
    question: "Qual a diferença para um site institucional?",
    answer:
      "A landing page tem uma oferta e uma ação. O site institucional apresenta a empresa inteira. Para vender uma oferta específica ou receber o tráfego de anúncios, a landing page costuma ser o melhor ponto de partida.",
  },
  {
    question: "O que acontece com os contatos do formulário?",
    answer: `No preço base, cada envio chega a um e-mail seu, sem banco de dados. Para guardar os contatos, há o armazenamento de leads (+ ${formatBRL(PRICES.leadStorage)}) ou a integração com um CRM ou plataforma de e-mail (a partir de ${formatBRL(PRICES.crm)}). Quando a integração com o CRM já guarda os contatos, não cobro o armazenamento à parte.`,
  },
  {
    question: "Posso usar a página nos meus anúncios?",
    answer: `Sim, ela foi pensada para isso e já sai com Analytics, Pixel e Clarity configurados. Se quiser, eu também cuido dos anúncios: a gestão de tráfego parte de ${formatBRL(PRICES.trafficSingle)} por mês.`,
  },
  {
    question: "Preciso de uma landing page para cada oferta?",
    answer: `Sim, cada landing page tem uma oferta principal. Para outra oferta, entram a versão adaptada (+ ${formatBRL(PRICES.adapted)} por versão) ou uma nova landing page independente (+ ${formatBRL(PRICES.newLanding)}).`,
  },
  {
    question: "Quantos ajustes estão incluídos?",
    answer: "Duas rodadas de ajustes no preço base.",
  },
  {
    question: "Quem fornece os textos e as imagens?",
    answer: "Por padrão, você envia os textos e as imagens. Eu organizo o conteúdo na estrutura da página e aviso o que ainda falta.",
  },
  {
    question: "Quanto tempo leva?",
    answer:
      "Até 10 dias úteis, contados a partir da definição da oferta e do envio dos textos e das imagens. A data fica definida na proposta.",
  },
]

export default function LandingPagesPage() {
  return (
    <ServicePage
      title="Criação de landing pages para campanhas e ofertas"
      intro="Eu crio uma página focada em uma única oferta e em uma única ação, com formulário ou WhatsApp, pronta para receber o tráfego dos seus anúncios e já com a medição configurada."
      priceLine={`A partir de ${formatBRL(PRICES.landingPage)}, pagamento único. Página de agradecimento, CRM e armazenamento de leads são opcionais.`}
      simulate={{ href: "/orcamento?tipo=landing", event: "landing_cta_simular", label: "Simular o orçamento da landing page" }}
      whatsapp={{ href: WHATSAPP_LANDING, event: "whatsapp_landing" }}
      included={included}
      optional={optional}
      steps={steps}
      stepsNote="O prazo é de até 10 dias úteis, contados a partir da definição da oferta e do envio do conteúdo."
      faqs={faqs}
      next={{
        title: "Landing page e anúncios, juntos",
        text: `A landing page recebe o visitante, e a gestão de tráfego leva as pessoas certas até ela. A gestão parte de ${formatBRL(PRICES.trafficSingle)} por mês, com a verba dos anúncios paga por você.`,
        href: "/gestao-de-trafego",
        label: "Conhecer a gestão de tráfego",
        event: "landing_proximo_trafego",
      }}
      closing="Tem uma oferta para transformar em contatos?"
    />
  )
}
