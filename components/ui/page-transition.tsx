"use client"

import type React from "react"

import { memo } from "react"

interface PageTransitionProps {
  children: React.ReactNode
  isTransitioning: boolean
}

export const PageTransition = memo(({ children, isTransitioning }: PageTransitionProps) => (
  <div
    className={`transition-all duration-300 ease-in-out ${
      isTransitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
    }`}
  >
    {children}
  </div>
))

PageTransition.displayName = "PageTransition"
