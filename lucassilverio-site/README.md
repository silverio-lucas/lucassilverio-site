# Lucas Silvério — Posicionamento Digital

Site comercial com Next.js, React, TypeScript e Tailwind CSS.

## Instalação

```bash
npm install
# ou
pnpm install
```

## Desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Deploy

Para fazer deploy no Vercel:

```bash
npx vercel
```

Você será guiado pelo processo de autenticação e deploy.

## Estrutura

- `app/` — App router do Next.js
  - `layout.tsx` — Layout raiz
  - `page.tsx` — Home page
  - `globals.css` — Estilos globais
- `public/` — Arquivos estáticos
- `package.json` — Dependências e scripts
- `tsconfig.json` — Configuração TypeScript
- `tailwind.config.js` — Configuração Tailwind
- `next.config.js` — Configuração Next.js

## Stack

- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Radix UI** — Componentes
- **Lucide Icons** — Ícones

## Customização

### Hero
Edite a seção hero em `app/page.tsx` (linhas ~25-50).

### Serviços
Edite os cards de serviços em `app/page.tsx` (linhas ~120-200).

### Cores
Customize as cores em `app/globals.css` (CSS variables do Tailwind).

## Próximos Passos

1. Adicionar componentes reutilizáveis em `components/`
2. Integrar simulador de orçamento
3. Conectar formulários e WhatsApp
4. Adicionar Analytics, Pixel e Clarity

## Licença

Privado — Lucas Silvério
