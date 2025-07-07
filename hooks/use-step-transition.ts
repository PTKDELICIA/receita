"use client"

import { useState, useCallback } from "react"

export type Step =
  | "login"
  | "processing-regularization"
  | "user-profile"
  | "processing-payment"
  | "darf-generation"
  | "loading-payment-info"
  | "pix-payment"
  | "payment-success"

export const useStepTransition = () => {
  const [currentStep, setCurrentStep] = useState<Step>("login")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionToStep = useCallback((nextStep: Step, delay = 0) => {
    setTimeout(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(nextStep)
        setIsTransitioning(false)
      }, 300)
    }, delay)
  }, [])

  return { currentStep, isTransitioning, transitionToStep }
}
