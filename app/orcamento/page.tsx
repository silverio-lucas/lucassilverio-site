import { Navbar } from "@/components/navbar"
import { BudgetSimulator } from "@/components/budget-simulator"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/site-content"

export const metadata = pageMetadata({
  title: "Monte seu orçamento | Lucas Silvério — Posicionamento Digital",
  description:
    "Simule o orçamento do seu site, da sua landing page ou da gestão de tráfego e envie o pedido de proposta pelo WhatsApp.",
  path: "/orcamento",
})

export default function OrcamentoPage() {
  return (
    <main id="conteudo" className="min-h-screen">
      <Navbar />
      <BudgetSimulator standalone />
      <Footer />
    </main>
  )
}
