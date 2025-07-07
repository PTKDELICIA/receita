"use client"

import { memo } from "react"

interface LoadingSpinnerProps {
  size?: string
  color?: string
}

export const LoadingSpinner = memo(({ size = "w-4 h-4", color = "border-blue-600" }: LoadingSpinnerProps) => (
  <div className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`} />
))

LoadingSpinner.displayName = "LoadingSpinner"
