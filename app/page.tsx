import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Solution } from "@/components/solution"
import { Process } from "@/components/process"
import { Pricing } from "@/components/pricing"
import { BudgetSimulator } from "@/components/budget-simulator"
import { Portfolio } from "@/components/portfolio"
import { Niches } from "@/components/niches"
import { FAQ } from "@/components/faq"
import { About } from "@/components/about"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="conteudo" className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Pricing />
      <BudgetSimulator />
      <Portfolio />
      <Niches />
      <FAQ />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}
