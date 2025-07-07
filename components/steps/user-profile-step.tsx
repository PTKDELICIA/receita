"use client"

import type React from "react"

import { memo, useEffect } from "react"
import { AlertTriangle, FileText, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"

interface CPFData {
  cpf: string
  nome: string
  sexo: string
  dataNascimento: string
}

interface UserProfileStepProps {
  cpfData: CPFData | null
  onRegularize: () => void
  countdown: { hours: number; minutes: number; seconds: number }
  setCountdown: React.Dispatch<React.SetStateAction<{ hours: number; minutes: number; seconds: number }>>
}

export const UserProfileStep = memo(({ cpfData, onRegularize, countdown, setCountdown }: UserProfileStepProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [setCountdown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 font-medium shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          <span>STATUS CRÍTICO: REGULARIZAÇÃO NECESSÁRIA</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatedWrapper direction="down">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
              <span className="text-white text-3xl font-bold">
                {cpfData?.nome
                  ? cpfData.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                  : "UN"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{cpfData?.nome || "USUARIO NAME"}</h1>
          </div>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnimatedWrapper direction="left" delay={200}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data de Nascimento</p>
                    <p className="font-semibold text-lg">{cpfData?.dataNascimento || "01/03/2002"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Declaração IR 2023</p>
                    <p className="font-semibold text-lg text-red-600">NÃO ENTREGUE</p>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedWrapper>

          <AnimatedWrapper direction="right" delay={400}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Situação Cadastral</p>
                    <p className="font-semibold text-lg text-red-600">IRREGULAR</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
                    <span className="font-medium text-red-800">CPF (SUSPENSO)</span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedWrapper>
        </div>

        <AnimatedWrapper direction="up" delay={600}>
          <Card className="mb-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Protocolo</p>
                  <p className="font-bold text-blue-600 text-lg">CTPS180389</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Prazo Final</p>
                  <p className="font-bold text-red-600 text-lg">02/07/2025</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="font-bold text-red-600 text-lg">CRÍTICO</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnimatedWrapper direction="left" delay={800}>
            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Irregularidade Detectada</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Identificamos problemas graves na sua <strong>Declaração do Imposto de Renda 2023</strong>.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                        <span>Dados inconsistentes na declaração</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                        <span>Atraso na entrega obrigatória</span>
                      </li>
                    </ul>
                    <p className="text-sm text-orange-600 mt-3 font-medium">Base Legal: Art. 1º da Lei nº 9.430/1996</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedWrapper>

          <AnimatedWrapper direction="right" delay={1000}>
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Consequências Imediatas</h3>
                    <div className="space-y-2">
                      {[
                        "Multa até 150%",
                        "Bloqueio completo do CPF",
                        "Suspensão de benefícios",
                        "Restrições bancárias",
                        "Bloqueio de documentos",
                        "Inclusão no SERASA",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>

        <AnimatedWrapper direction="up" delay={1200}>
          <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                <Clock className="w-6 h-6 text-red-600" />
                <span>Tempo Restante para Regularização</span>
              </h3>
              <div className="flex justify-center space-x-8">
                {[
                  { value: countdown.hours, label: "Horas" },
                  { value: countdown.minutes, label: "Minutos" },
                  { value: countdown.seconds, label: "Segundos" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">{item.value.toString().padStart(2, "0")}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedWrapper>

        <AnimatedWrapper direction="up" delay={1400}>
          <Button
            onClick={onRegularize}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>REGULARIZAR AGORA</span>
            </div>
          </Button>
        </AnimatedWrapper>
      </main>
    </div>
  )
})

UserProfileStep.displayName = "UserProfileStep"
