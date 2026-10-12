import { PRICES, TRAFFIC_MIN_MONTHS, formatBRL } from "@/lib/pricing"
import { SITE_URL, WHATSAPP_PHONE } from "@/lib/site-content"

// Resumo do site em texto simples para assistentes de IA (llms.txt). Os preços vêm de lib/pricing.ts.
export const dynamic = "force-static"

export function GET() {
  const body = `# Lucas Silvério — Posicionamento Digital

> Sites, landing pages e gestão de tráfego pago para negócios locais. Atendimento presencial no Vale do Aço (Ipatinga, MG) e remoto em todo o Brasil. Trabalho solo, direto com o dono do negócio.

Contato: WhatsApp ${WHATSAPP_PHONE}. Responsável: Lucas Silvério, web designer e gestor de tráfego.

## Serviços

- [Criação de sites institucionais](${SITE_URL}/criacao-de-sites): a partir de ${formatBRL(PRICES.base)}, pagamento único; cada página interna custa ${formatBRL(PRICES.page)}. Prazo de até 10 dias úteis. Inclui WhatsApp integrado, Google Analytics, Meta Pixel, Microsoft Clarity, SEO técnico e sitemap.
- [Landing pages](${SITE_URL}/landing-pages): a partir de ${formatBRL(PRICES.landingPage)}, pagamento único, para campanhas e captação.
- [Gestão de tráfego](${SITE_URL}/gestao-de-trafego): campanhas no Meta e no Google. A partir de ${formatBRL(PRICES.trafficSingle)}/mês com um canal e ${formatBRL(PRICES.trafficCombined)}/mês com Meta e Google. Verba dos anúncios paga à parte, direto às plataformas. Compromisso mínimo de ${TRAFFIC_MIN_MONTHS} meses. Sem promessa de número de vendas ou contatos.
- [Perfil da Empresa no Google](${SITE_URL}/google-meu-negocio): a partir de ${formatBRL(PRICES.googleBusiness)} de instalação e ${formatBRL(PRICES.googleBusinessMonthly)}/mês de gestão, com compromisso mínimo de 6 meses.

## Ferramentas

- [Simulador de orçamento](${SITE_URL}/orcamento): estima o valor de site, landing page ou gestão de tráfego e envia o pedido por WhatsApp.

## Observações

- Os projetos da seção "Sites no ar" são conceituais (sem cliente real) e estão identificados como tal.
- [Política de privacidade](${SITE_URL}/politica-de-privacidade)
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
