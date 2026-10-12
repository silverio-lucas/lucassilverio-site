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
  /** URL da imagem thumbnail do projeto. Se não fornecida, usa o Thumb placeholder. */
  thumbnail?: string
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
    thumbnail: "/clara-odontologia-thumb.webp",
    conceptual: true,
  },
  {
    id: "sorriso-studio",
    name: "Sorriso Studio",
    segment: "Clínica odontológica fictícia",
    type: "Landing page",
    description:
      "Landing page conceitual de uma clínica odontológica premium, com visual claro, tratamentos em destaque e chamada direta para agendamento.",
    url: "https://sorriso-studio-seven.vercel.app",
    host: "sorriso-studio-seven.vercel.app",
    conceptual: true,
  },
  {
    id: "monteiro-vasconcelos",
    name: "Monteiro & Vasconcelos",
    segment: "Escritório de advocacia fictício",
    type: "Landing page",
    description:
      "Landing page conceitual de um escritório de advocacia, em tema escuro com detalhes dourados, áreas de atuação e contato para consulta.",
    url: "https://monteiro-vasconcelos.vercel.app",
    host: "monteiro-vasconcelos.vercel.app",
    conceptual: true,
  },
]
