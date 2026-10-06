import Link from "next/link"
import { CookiePreferencesButton } from "@/components/cookie-preferences-button"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <Link 
            href="/" 
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Lucas Silvério
          </Link>

          <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/criacao-de-sites" className="transition-colors hover:text-foreground">
              Criação de sites
            </Link>
            <Link href="/landing-pages" className="transition-colors hover:text-foreground">
              Landing pages
            </Link>
            <Link href="/gestao-de-trafego" className="transition-colors hover:text-foreground">
              Gestão de tráfego
            </Link>
            <Link href="/orcamento" className="transition-colors hover:text-foreground">
              Orçamento
            </Link>
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-foreground">
              Política de privacidade
            </Link>
            <CookiePreferencesButton />
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lucas Silvério. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
