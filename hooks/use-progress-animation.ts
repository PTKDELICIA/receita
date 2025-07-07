"use client"

import { useState, useEffect } from "react"

export const useProgressAnimation = (isActive: boolean) => {
  const [progress, setProgress] = useState(0)
  const [processingStep, setProcessingStep] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      setProcessingStep(0)
      return
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setProcessingStep((step) => (step + 1) % 3)
          return 0
        }
        return prev + 1.5
      })
    }, 30)

    return () => clearInterval(timer)
  }, [isActive])

  return { progress, processingStep }
}
