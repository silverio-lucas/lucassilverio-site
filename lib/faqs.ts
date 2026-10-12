import { PRICES, TRAFFIC_MIN_MONTHS, formatBRL } from "@/lib/pricing"

// Perguntas da home: usadas na seção de FAQ e no JSON-LD FAQPage.
export const faqs = [
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
