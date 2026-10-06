import { ServicePage } from "@/components/service-page"
import { PRICES, formatBRL } from "@/lib/pricing"
import { pageMetadata, whatsappUrl } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Perfil da Empresa no Google (Google Meu Negócio) | Lucas Silvério",
  description: `Instalação e gestão do Perfil da Empresa no Google para negócios locais: instalação por ${formatBRL(PRICES.googleBusiness)} e gestão mensal por ${formatBRL(PRICES.googleBusinessMonthly)}. Atendo o Vale do Aço e todo o Brasil.`,
  path: "/google-meu-negocio",
})

const WHATSAPP_GBP = whatsappUrl("Olá, Lucas! Vi a página do Perfil da Empresa no Google e quero conversar sobre o perfil da minha empresa.")

const installation = [
  "Criação ou configuração do Perfil da Empresa no Google",
  "Preenchimento do perfil com os dados que você fornece: nome, endereço, horários, categorias e contatos",
  `Pagamento único de ${formatBRL(PRICES.googleBusiness)}`,
]

const monthly = [
  "Respostas às avaliações e aos comentários dos clientes no seu perfil",
  "3 publicações por semana no seu perfil",
  `${formatBRL(PRICES.googleBusinessMonthly)} por mês`,
]

const steps = [
  { title: "Dados da empresa", text: "Você envia as informações do negócio: nome, endereço, horários e contatos." },
  { title: "Instalação", text: "Eu crio ou configuro o perfil com esses dados." },
  { title: "Gestão mensal", text: "Respondo as avaliações e os comentários e publico 3 vezes por semana." },
]

const faqs = [
  {
    question: "O que é o Perfil da Empresa no Google?",
    answer:
      "É o cadastro do seu negócio que aparece quando alguém pesquisa no Google ou no Google Maps. Ele mostra endereço, horário, telefone, fotos e avaliações. O nome anterior era Google Meu Negócio.",
  },
  {
    question: "Para que tipo de negócio vale a pena?",
    answer:
      "Para negócios que atendem clientes de uma região, como lojas, clínicas, escritórios, estúdios e prestadores de serviço locais. Quanto mais as pessoas procuram o que você vende por perto, mais o perfil ajuda.",
  },
  {
    question: "Quanto custa?",
    answer: `A instalação e a configuração custam ${formatBRL(PRICES.googleBusiness)}, em pagamento único. A gestão mensal custa ${formatBRL(PRICES.googleBusinessMonthly)} por mês.`,
  },
  {
    question: "O que está incluído na gestão mensal?",
    answer: "Eu respondo as avaliações e os comentários dos clientes no seu perfil e publico 3 vezes por semana.",
  },
  {
    question: "Quem fornece as informações da empresa?",
    answer: "Você fornece os dados da empresa. Eu cuido do preenchimento e da configuração do perfil.",
  },
  {
    question: "Preciso de um site para ter o perfil?",
    answer: `O perfil funciona mesmo sem site. Se você já tem um, o perfil pode apontar para ele. Se ainda não tem, eu posso criar: o site institucional parte de ${formatBRL(PRICES.base)}.`,
  },
  {
    question: "Você garante que a minha empresa vai aparecer em primeiro?",
    answer:
      "Não. Ninguém controla a posição no Google. Um perfil completo, com avaliações respondidas e publicações frequentes, ajuda o negócio a ser encontrado, mas o resultado depende da concorrência, da região e do histórico do perfil.",
  },
  {
    question: "Você atende fora do Vale do Aço?",
    answer: "Sim. Atendo negócios do Vale do Aço e de todo o Brasil, de forma remota.",
  },
]

export default function GoogleMeuNegocioPage() {
  return (
    <ServicePage
      title="Perfil da Empresa no Google para negócios locais"
      intro="Eu instalo e cuido do perfil da sua empresa no Google, o cadastro que aparece na busca e no Google Maps quando alguém procura o que você vende por perto, com as avaliações respondidas e publicações toda semana."
      priceLine={`Instalação por ${formatBRL(PRICES.googleBusiness)}, em pagamento único, e gestão mensal por ${formatBRL(PRICES.googleBusinessMonthly)}.`}
      whatsapp={{ href: WHATSAPP_GBP, event: "whatsapp_gbp" }}
      included={installation}
      optional={monthly}
      listsHeading="O que entra em cada etapa"
      includedTitle="Instalação"
      optionalTitle="Gestão mensal"
      steps={steps}
      stepsNote="A instalação começa quando eu recebo os dados da empresa."
      faqs={faqs}
      next={{
        title: "Do perfil ao seu site",
        text: `O perfil leva as pessoas até a sua empresa, e o site explica por que escolher você. O site institucional parte de ${formatBRL(PRICES.base)}, em pagamento único.`,
        href: "/criacao-de-sites",
        label: "Conhecer a criação de sites",
        event: "gbp_proximo_sites",
      }}
      closing="Quer que a sua empresa seja encontrada por quem procura por perto?"
    />
  )
}
