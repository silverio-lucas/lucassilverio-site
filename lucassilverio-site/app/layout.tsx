import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lucas Silvério — Posicionamento Digital",
  description: "Sites estratégicos, landing pages focadas em conversão e gestão de tráfego pago",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
