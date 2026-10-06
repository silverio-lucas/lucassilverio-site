// Área de portfólio. Para incluir um novo projeto, basta acrescentar um item em PROJECTS.
export const PORTFOLIO_URL = "https://portfolio.lucassilverio.dev"

export interface PortfolioProject {
  id: string
  name: string
  segment: string
  type: string
  description: string
  url: string
  host: string
  /** Projeto criado para demonstrar o trabalho, sem cliente real. É identificado como tal no site. */
  conceptual?: boolean
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "clara-odontologia",
    name: "Clara Odontologia",
    segment: "Clínica odontológica fictícia",
    type: "Site institucional",
    description:
      "Site conceitual de uma clínica odontológica, com tratamentos, o passo a passo da primeira visita, perguntas frequentes e agendamento demonstrativo.",
    url: "https://clara-odontologia.vercel.app",
    host: "clara-odontologia.vercel.app",
    conceptual: true,
  },
]
