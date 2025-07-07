"use client"

import { memo } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"

export const PaymentSuccessStep = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-100">
    <main className="flex items-center justify-center min-h-screen px-4 py-12">
      <AnimatedWrapper direction="up">
        <Card className="w-full max-w-2xl bg-white shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pagamento Realizado com Sucesso!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Sua regularização fiscal foi processada e seu CPF será reativado em até 24 horas.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">Próximos passos:</h3>
              <ul className="text-green-700 text-left space-y-2">
                <li>• Aguarde a confirmação por email</li>
                <li>• Seu CPF será reativado automaticamente</li>
                <li>• Você pode acompanhar o status no portal gov.br</li>
              </ul>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-medium rounded-lg"
            >
              Finalizar
            </Button>
          </CardContent>
        </Card>
      </AnimatedWrapper>
    </main>
  </div>
))

PaymentSuccessStep.displayName = "PaymentSuccessStep"
