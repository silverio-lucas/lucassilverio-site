import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link 
            href="/" 
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Lucas Silvério
          </Link>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lucas Silvério. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
