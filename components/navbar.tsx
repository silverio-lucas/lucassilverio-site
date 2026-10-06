"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_URL } from "@/lib/site-content"
import { track } from "@/lib/track"

// Links com "/#" apontam para seções da home e funcionam de qualquer página. Os demais são páginas.
const navLinks = [
  { href: "/#processo", label: "Processo" },
  { href: "/#planos", label: "Serviços" },
  { href: "/gestao-de-trafego", label: "Tráfego" },
  { href: "/orcamento", label: "Orçamento" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#sobre", label: "Sobre" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const pathname = usePathname()

  // Seções da home destacam pela rolagem; páginas destacam pelo endereço.
  const isActiveLink = (href: string) => (href.startsWith("/#") ? pathname === "/" && active === href : pathname === href)

  // Fundo translúcido só depois de rolar; no topo, o header fica limpo sobre o hero.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (window.scrollY < 200) setActive("")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Destaca no menu a seção que está no meio da tela.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const sections = navLinks
      .filter((link) => link.href.startsWith("/#"))
      .map((link) => document.querySelector(link.href.slice(1)))
      .filter((section): section is Element => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Menu mobile: fecha com Esc, trava a rolagem da página e fecha ao voltar para a tela grande.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onChange = () => desktop.matches && setIsOpen(false)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onChange)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onChange)
    }
  }, [isOpen])

  const onNavigate = (href: string) => {
    track("nav_click", { secao: href.replace(/^\/#?/, "") })
    setIsOpen(false)
  }

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300 ${
          scrolled || isOpen
            ? "border-border/50 bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Lucas Silvério<span className="text-accent">.</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => onNavigate(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:block">
            <Button asChild>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_navbar")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile: WhatsApp sempre à mão + menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild size="icon" variant="outline" aria-label="Chamar no WhatsApp">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_navbar_mobile")}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="menu-mobile"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border/50 lg:hidden"
            >
              <div className="px-6 pt-2 pb-6">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => onNavigate(link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between border-b border-border/50 py-4 text-base transition-colors hover:text-foreground ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </Link>
                  )
                })}
                <Button asChild size="lg" className="mt-6 w-full">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      track("whatsapp_navbar_mobile")
                      setIsOpen(false)
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Toque fora do menu fecha */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Fechar menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
