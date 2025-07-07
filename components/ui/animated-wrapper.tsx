"use client"

import type React from "react"

import { memo } from "react"

interface AnimatedWrapperProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export const AnimatedWrapper = memo(
  ({ children, direction = "up", delay = 0, className = "" }: AnimatedWrapperProps) => {
    return (
      <div
        className={`animate-slide-in-${direction} ${className}`}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: "600ms",
          animationFillMode: "both",
        }}
      >
        {children}
      </div>
    )
  },
)

AnimatedWrapper.displayName = "AnimatedWrapper"
