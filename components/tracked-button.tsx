"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { track } from "@/lib/track"

interface TrackedButtonProps {
  href: string
  event: string
  children: ReactNode
  variant?: "default" | "outline"
  external?: boolean
  params?: Record<string, unknown>
}

/** Botão de chamada para ação que registra o clique no GA4 e no Meta Pixel. */
export function TrackedButton({ href, event, children, variant = "default", external = false, params }: TrackedButtonProps) {
  return (
    <Button asChild size="lg" variant={variant}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track(event, params)}>
          {children}
        </a>
      ) : (
        <Link href={href} onClick={() => track(event, params)}>
          {children}
        </Link>
      )}
    </Button>
  )
}
