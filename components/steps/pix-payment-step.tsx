"use client"

import { memo, useEffect, useState } from "react" // Adicionado useState
import { Clock, FileText, RefreshCw, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { QRCodeSVG } from "qrcode.react"

interface CPFData {
  cpf: string
  nome: string
}

interface PaymentData {
  id: string
  pixCode: string
}

interface PixPaymentStepProps {
  cpfData: CPFData | null
  paymentData: PaymentData | null
  verifyPayment: () => Promise<boolean>
  copyPixCode: () => void
  onPaymentSuccess: () => void
}

export const PixPaymentStep = memo(
  ({ cpfData, paymentData, verifyPayment, copyPixCode, onPaymentSuccess }: PixPaymentStepProps) => {
    const [showCopiedNotification, setShowCopiedNotification] = useState(false) // Novo estado para notificação

    useEffect(() => {
      if (paymentData?.id) {
        const interval = setInterval(async () => {
          const isPaid = await verifyPayment()
          if (isPaid) {
            onPaymentSuccess()
            clearInterval(interval)
          }
        }, 30000) // Check every 30 seconds

        return () => clearInterval(interval)
      }
    }, [paymentData, verifyPayment, onPaymentSuccess])

    const handleCopyPixCode = () => {
      copyPixCode()
      setShowCopiedNotification(true)
      setTimeout(() => {
        setShowCopiedNotification(false)
      }, 2000) // Notificação desaparece após 2 segundos
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 font-medium shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 animate-pulse" />
            <span>Tempo restante para pagamento: 14:59</span>
          </div>
        </div>
        <main className="max-w-6xl mx-auto px-4 py-8">
          <AnimatedWrapper direction="down">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Nome", value: cpfData?.nome || "USUARIO NAME" },
                { label: "CPF", value: cpfData?.cpf || "114.859.804-96" },
                { label: "Protocolo", value: "RF180389", color: "text-blue-600" },
              ].map((item, index) => (
                <AnimatedWrapper key={index} direction="up" delay={index * 200}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <p className="text-sm text-gray-600 mb-1">{item.label}:</p>
                    <p className={`font-semibold text-lg ${item.color || "text-gray-900"}`}>{item.value}</p>
                  </Card>
                </AnimatedWrapper>
              ))}
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper direction="up" delay={800}>
            <Card className="mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pagamento via PIX</h2>
                <p className="text-gray-600">Escaneie o QR Code ou copie o código PIX abaixo</p>
              </CardHeader>
              <CardContent className="p-8 text-center space-y-8">
                <AnimatedWrapper direction="up" delay={1000}>
                  <div className="flex justify-center">
                    <div className="p-6 bg-white rounded-2xl shadow-lg">
                      {paymentData?.pixCode ? (
                        <QRCodeSVG value={paymentData.pixCode} size={256} level="M" includeMargin={true} />
                      ) : (
                        <div className="w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <LoadingSpinner size="w-8 h-8" />
                            <p className="text-sm text-gray-500 mt-2">Gerando QR Code...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedWrapper>

                {paymentData?.pixCode && (
                  <AnimatedWrapper direction="up" delay={1200}>
                    <div className="space-y-4">
                      <p className="font-semibold text-gray-700 text-lg">Código PIX:</p>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 shadow-inner">
                        <code className="text-sm text-gray-800 break-all font-mono leading-relaxed">
                          {paymentData.pixCode}
                        </code>
                      </div>
                    </div>
                  </AnimatedWrapper>
                )}

                <AnimatedWrapper direction="up" delay={1600}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center space-x-2 py-3 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Gerar DARF</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={verifyPayment}
                      className="flex items-center justify-center space-x-2 py-3 hover:bg-green-50 transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Verificar</span>
                    </Button>
                    <Button
                      onClick={handleCopyPixCode} // Usar a nova função
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center justify-center space-x-2 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar PIX</span>
                    </Button>
                  </div>
                </AnimatedWrapper>

                {showCopiedNotification && ( // Notificação condicional
                  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-md animate-slide-in-up">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Código PIX copiado!</span>
                    </div>
                  </div>
                )}

                <AnimatedWrapper direction="up" delay={1800}>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center space-x-2 text-green-700 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Verificação automática a cada 30 segundos</span>
                    </div>
                    <p className="text-sm text-green-600">Última verificação: {new Date().toLocaleTimeString()}</p>
                  </div>
                </AnimatedWrapper>
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </main>
      </div>
    )
  },
)

PixPaymentStep.displayName = "PixPaymentStep"
