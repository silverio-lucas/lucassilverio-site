import { ServicePage } from "@/components/service-page"
import { PRICES, formatBRL } from "@/lib/pricing"
import { pageMetadata, whatsappUrl } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Criação de sites institucionais no Vale do Aço | Lucas Silvério",
  description: `Sites institucionais que deixam claro por que escolher a sua empresa, a partir de ${formatBRL(PRICES.base)}. Atendo o Vale do Aço e todo o Brasil, com a medição configurada desde o primeiro dia.`,
  path: "/criacao-de-sites",
})

const WHATSAPP_SITES = whatsappUrl("Olá, Lucas! Vi a página de criação de sites e quero conversar sobre o site da minha empresa.")

const included = [
  "Página principal completa: apresentação da empresa, proposta, serviços, diferenciais e canais de contato",
  "Integração com o WhatsApp",
  "Google Analytics, Meta Pixel e Microsoft Clarity já configurados",
  "Velocidade otimizada e SEO técnico básico",
  "Layout que funciona bem no celular",
]

const optional = [
  `Páginas internas: + ${formatBRL(PRICES.page)} cada (a página principal já está no preço)`,
  `Banco de dados (Supabase): + ${formatBRL(PRICES.supabase)}`,
  `Perfil da Empresa no Google (Google Meu Negócio): + ${formatBRL(PRICES.googleBusiness)}, com os dados da empresa fornecidos por você`,
  "Domínio, hospedagem, manutenção recorrente e assinaturas de ferramentas pagas ficam fora do preço e são combinados à parte, quando necessários",
]

const steps = [
  { title: "Briefing", text: "Entendo o seu negócio, a oferta e o que o visitante precisa fazer no site." },
  { title: "Conteúdo", text: "Você envia os textos e as imagens, e eu organizo tudo na estrutura da página." },
  { title: "Desenvolvimento", text: "Construo o site e deixo a medição configurada." },
  { title: "Revisão e publicação", text: "Você aprova, e eu publico com Analytics, Pixel e Clarity funcionando." },
]

const faqs = [
  {
    question: "Qual a diferença entre site institucional e landing page?",
    answer:
      "O site institucional apresenta a empresa inteira: quem você é, o que vende e como falar com você. A landing page tem uma única oferta e uma única ação, e costuma receber o tráfego de anúncios. O simulador de orçamento ajuda a comparar os dois.",
  },
  {
    question: "Quanto custa um site com mais páginas?",
    answer: `O site parte de ${formatBRL(PRICES.base)} e cada página interna custa ${formatBRL(PRICES.page)}. Um site com 4 páginas internas, por exemplo, fica em ${formatBRL(PRICES.base + 4 * PRICES.page)}. Os valores são "a partir de": o total final depende do briefing.`,
  },
  {
    question: "Quem fornece os textos e as imagens?",
    answer: "Por padrão, você envia os textos e as imagens. Eu organizo o conteúdo na estrutura do site e aviso o que ainda falta.",
  },
  {
    question: "Quanto tempo leva?",
    answer:
      "Até 10 dias úteis, contados a partir do briefing fechado e do envio dos textos e das imagens. Mais páginas, integrações e demora nas aprovações podem mudar o prazo, e a data fica definida na proposta.",
  },
  {
    question: "O que não está incluído no preço?",
    answer:
      "Domínio, hospedagem, manutenção recorrente, assinaturas de ferramentas pagas, custos de mídia e planos pagos de CRM ou automação. Quando algum deles for necessário, aparece separado na proposta.",
  },
  {
    question: "Preciso do Perfil da Empresa no Google?",
    answer: `Para negócios locais, ele ajuda a aparecer nas buscas e no Google Maps. Posso configurar junto com o site por + ${formatBRL(PRICES.googleBusiness)}; você fornece os dados da empresa.`,
  },
  {
    question: "Você atende fora do Vale do Aço?",
    answer: "Sim. Atendo negócios do Vale do Aço e de todo o Brasil, de forma remota.",
  },
]

export default function CriacaoDeSitesPage() {
  return (
    <ServicePage
      title="Criação de site institucional para a sua empresa"
      intro="Eu desenho e desenvolvo um site que mostra com clareza o que a sua empresa vende, para quem e qual ação o visitante deve tomar, com WhatsApp e medição configurados desde o primeiro dia."
      priceLine={`A partir de ${formatBRL(PRICES.base)}, pagamento único. Cada página interna a mais custa ${formatBRL(PRICES.page)}.`}
      simulate={{ href: "/orcamento?tipo=site", event: "sites_cta_simular", label: "Simular o orçamento do site" }}
      whatsapp={{ href: WHATSAPP_SITES, event: "whatsapp_sites" }}
      included={included}
      optional={optional}
      steps={steps}
      stepsNote="O prazo é de até 10 dias úteis, contados a partir do briefing fechado e do envio do conteúdo."
      showProof
      faqs={faqs}
      next={{
        title: "Depois do site, os anúncios",
        text: `Com o site no ar e a medição configurada, a gestão de tráfego leva clientes até ele. A gestão parte de ${formatBRL(PRICES.trafficSingle)} por mês, com a verba dos anúncios paga por você.`,
        href: "/gestao-de-trafego",
        label: "Conhecer a gestão de tráfego",
        event: "sites_proximo_trafego",
      }}
      closing="Quer um site que explique por que escolher a sua empresa?"
    />
  )
}
