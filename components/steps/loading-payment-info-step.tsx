"use client"

import { memo } from "react"
import { CheckCircle, CreditCard, BarChart3, Smartphone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"

interface LoadingPaymentInfoStepProps {
  progress: number
  processingStep: number
}

export const LoadingPaymentInfoStep = memo(({ progress, processingStep }: LoadingPaymentInfoStepProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
    <main className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-4xl text-center space-y-8">
        <AnimatedWrapper direction="down">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-purple-600 rounded-full mx-auto animate-pulse opacity-20" />
          </div>
        </AnimatedWrapper>
        <AnimatedWrapper direction="up" delay={200}>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Carregando Informações de Pagamento</h1>
            <p className="text-gray-600 mb-2">Preparando método de pagamento...</p>
            <p className="text-sm text-gray-500">Aguarde alguns instantes</p>
          </div>
        </AnimatedWrapper>
        <AnimatedWrapper direction="up" delay={400}>
          <div className="w-full max-w-md mx-auto">
            <Progress value={progress} className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </Progress>
            <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% concluído</p>
          </div>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
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
            { icon: Smartphone, title: "Gerando PIX", description: "Preparando pagamento", color: "green" },
          ].map((step, index) => (
            <AnimatedWrapper key={index} direction="up" delay={600 + index * 200}>
              <Card
                className={`p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  processingStep >= index ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 bg-${step.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    processingStep >= index ? "scale-110" : ""
                  }`}
                >
                  <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
                {processingStep >= index && (
                  <div className="mt-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </div>
                )}
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
        <AnimatedWrapper direction="up" delay={1200}>
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-green-800 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-bold text-lg">Ambiente Seguro</span>
            </div>
            <p className="text-green-700 leading-relaxed">
              Seus dados estão sendo processados com segurança através de conexão criptografada. O pagamento será gerado
              via PIX para facilitar sua regularização fiscal.
            </p>
          </Card>
        </AnimatedWrapper>
      </div>
    </main>
  </div>
))

LoadingPaymentInfoStep.displayName = "LoadingPaymentInfoStep"
