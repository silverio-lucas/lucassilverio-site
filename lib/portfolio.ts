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
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "luana-queiroz",
    name: "Luana Queiroz",
    segment: "Copywriter e estrategista de SaaS",
    type: "Site profissional",
    description:
      "Site para apresentar o trabalho e os serviços de uma copywriter, com chamadas diretas para conversar pelo WhatsApp.",
    url: "https://luanacopywriter.com.br",
    host: "luanacopywriter.com.br",
  },
]
