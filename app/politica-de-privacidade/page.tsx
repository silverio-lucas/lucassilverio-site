import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { pageMetadata, whatsappUrl } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Política de privacidade | Lucas Silvério — Posicionamento Digital",
  description:
    "Como este site trata dados pessoais: o que o simulador de orçamento guarda, quais ferramentas de medição são usadas, cookies e como exercer seus direitos pela LGPD.",
  path: "/politica-de-privacidade",
})

const WHATSAPP_PRIVACIDADE = whatsappUrl("Olá, Lucas! Tenho uma solicitação sobre os meus dados pessoais.")

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main id="conteudo" className="min-h-screen">
      <Navbar />

      <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Política de privacidade
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: 5 de outubro de 2026.</p>
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          Esta política explica como o site lucassilverio.dev trata dados pessoais, de acordo com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). O responsável pelo tratamento é Lucas Silvério, que atua como Lucas Silvério — Posicionamento Digital, em Ipatinga (MG).
        </p>

        <div className="mt-12 space-y-12">
          <Section title="1. Quais dados são tratados">
            <p>
              <strong className="font-medium text-foreground">Dados que você informa no simulador de orçamento.</strong>{" "}
              Nome, WhatsApp ou e-mail, empresa, segmento, objetivo, prazo e observações. Esses dados ficam no seu navegador e entram no texto do pedido que você revisa. Nada é enviado automaticamente: o pedido só chega a mim se você escolher enviá-lo pelo WhatsApp.
            </p>
            <p>
              <strong className="font-medium text-foreground">Opções do orçamento.</strong> O tipo de projeto e os itens que você marca ficam salvos no seu navegador para você retomar a simulação depois. Nome, contato e observações nunca são salvos.
            </p>
            <p>
              <strong className="font-medium text-foreground">Dados de navegação.</strong> Páginas visitadas, cliques nos botões de contato, tipo de dispositivo e de navegador, origem do acesso (por exemplo, um anúncio), localização aproximada e identificadores de cookies, coletados pelas ferramentas de medição descritas abaixo.
            </p>
            <p>
              <strong className="font-medium text-foreground">Conversas no WhatsApp.</strong> Se você me chamar, o que enviar fica na conversa, que também segue as regras do próprio WhatsApp.
            </p>
          </Section>

          <Section title="2. Ferramentas de medição e cookies">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-foreground">Google Analytics 4 (Google):</strong> mede visitas e uso do site.
              </li>
              <li>
                <strong className="font-medium text-foreground">Meta Pixel (Meta):</strong> mede o desempenho de anúncios no Instagram e no Facebook e permite criar públicos para anunciar.
              </li>
              <li>
                <strong className="font-medium text-foreground">Microsoft Clarity (Microsoft):</strong> gera mapas de calor e gravações da navegação para entender como o site é usado.
              </li>
              <li>
                <strong className="font-medium text-foreground">Vercel Web Analytics (Vercel):</strong> mede visitas de forma agregada, sem cookies.
              </li>
            </ul>
            <p>
              Google Analytics, Meta Pixel e Microsoft Clarity só são ativados depois que você clica em &quot;Aceitar&quot; no aviso de cookies. Se você recusar, eles não carregam e o site funciona do mesmo jeito. Você pode mudar a escolha a qualquer momento em &quot;Preferências de cookies&quot;, no rodapé de qualquer página. Também é possível apagar os cookies pelas configurações do seu navegador.
            </p>
          </Section>

          <Section title="3. Para que os dados são usados">
            <ul className="list-disc space-y-2 pl-5">
              <li>Responder pedidos de orçamento e conversar sobre projetos.</li>
              <li>Entender como o site é usado e melhorá-lo.</li>
              <li>Medir e otimizar anúncios.</li>
            </ul>
          </Section>

          <Section title="4. Bases legais">
            <p>
              O tratamento se apoia no seu consentimento (cookies de medição e publicidade), na execução de procedimentos preliminares a um contrato, a pedido seu (atender um pedido de orçamento) e no legítimo interesse (segurança e melhoria do site), sempre respeitando seus direitos. Referência: LGPD, art. 7º, incisos I, V e IX.
            </p>
          </Section>

          <Section title="5. Compartilhamento">
            <p>
              Os dados de navegação são tratados pelas empresas das ferramentas listadas acima (Google, Meta, Microsoft e Vercel), conforme as políticas de cada uma. Algumas delas podem armazenar dados fora do Brasil. Eu não vendo dados pessoais.
            </p>
          </Section>

          <Section title="6. Por quanto tempo os dados ficam guardados">
            <p>
              Dados de medição ficam pelo período configurado em cada ferramenta. Conversas e propostas ficam pelo tempo necessário para atender você e cumprir obrigações legais.
            </p>
          </Section>

          <Section title="7. Seus direitos">
            <p>
              Pela LGPD (art. 18), você pode pedir confirmação de que seus dados são tratados, acesso, correção, anonimização, bloqueio ou eliminação, portabilidade, informação sobre com quem os dados são compartilhados e a revogação do consentimento, a qualquer momento.
            </p>
            <p>
              Para exercer qualquer um desses direitos, fale comigo pelo{" "}
              <a
                href={WHATSAPP_PRIVACIDADE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                WhatsApp, no (31) 98763-8437
              </a>
              . Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </Section>

          <Section title="8. Segurança">
            <p>
              O site é servido por conexão segura (HTTPS) e os dados que você digita no simulador não são enviados a nenhum servidor meu. Ainda assim, nenhum sistema é totalmente livre de riscos.
            </p>
          </Section>

          <Section title="9. Mudanças nesta política">
            <p>
              Esta política pode ser atualizada. A data no topo da página indica a última revisão.
            </p>
          </Section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
