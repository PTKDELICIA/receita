"use client"

import { memo } from "react"
import { AlertTriangle, Download, FileText, Printer, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"

interface CPFData {
  cpf: string
  nome: string
}

interface DarfGenerationStepProps {
  onGenerateDarf: () => void
  cpfData: CPFData | null // Adicionado cpfData
}

export const DarfGenerationStep = memo(({ onGenerateDarf, cpfData }: DarfGenerationStepProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 font-medium shadow-lg">
      <div className="flex items-center justify-center space-x-2">
        <FileText className="w-5 h-5" />
        <span>DARF - Documento de Arrecadação de Receitas Federais</span>
      </div>
    </div>
    <main className="max-w-4xl mx-auto px-4 py-8">
      <AnimatedWrapper direction="down">
        <Card className="mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-1">DARF</h1>
                <p className="text-blue-100">Documento de Arrecadação de Receitas Federais</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Protocolo</p>
                <p className="font-bold text-xl">RF180389</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <AnimatedWrapper direction="left" delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Nome do Contribuinte</p>
                  <p className="font-semibold text-lg">{cpfData?.nome || "USUARIO NAME"}</p>
                  <p className="text-sm text-gray-500">CPF: {cpfData?.cpf || "000.000.000-00"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Período de Apuração</p>
                  <p className="font-semibold text-lg">18/11/2024</p>
                  <p className="text-sm text-gray-600 mt-2">Data de Vencimento</p>
                  <p className="font-semibold text-red-600 text-lg">02/07/2025</p>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper direction="right" delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Código da Receita</p>
                  <p className="font-semibold text-lg">5952</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Número de Referência</p>
                  <p className="font-semibold text-lg">RF180389</p>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper direction="up" delay={600}>
              <Card className="mb-6 border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Discriminação dos Valores</span>
                  </h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { label: "Valor Principal", value: "R$ 145,63", color: "text-gray-900" },
                      { label: "Multa", value: "R$ 28,04", color: "text-orange-600" },
                      { label: "Juros", value: "R$ 11,52", color: "text-orange-600" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.label}</span>
                        <span className={`font-bold text-lg ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                        <span className="text-xl font-bold">VALOR A PAGAR</span>
                        <span className="text-2xl font-bold text-blue-600">R$ 185,19</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            <AnimatedWrapper direction="left" delay={800}>
              <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-800 mb-3 text-lg">
                        Atenção: O não pagamento até a data de vencimento resultará em:
                      </p>
                      <ul className="text-sm text-yellow-700 space-y-2">
                        {[
                          "Acréscimo de multa de 20% sobre o valor total",
                          "Juros de mora calculados com base na taxa SELIC",
                          "Inscrição em Dívida Ativa da União",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            <AnimatedWrapper direction="up" delay={1000}>
              <div className="text-center space-y-3 p-6 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Documento gerado eletronicamente</p>
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Código de Autenticação: dbGisMaHZf</span>
                </div>
              </div>
            </AnimatedWrapper>
          </CardContent>
        </Card>
      </AnimatedWrapper>

      <AnimatedWrapper direction="up" delay={1200}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 py-3 hover:bg-blue-50 transition-all duration-300 bg-transparent"
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 py-3 hover:bg-green-50 transition-all duration-300 bg-transparent"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 py-3 hover:bg-purple-50 transition-all duration-300 bg-transparent"
          >
            <FileText className="w-4 h-4" />
            <span>Enviar Email</span>
          </Button>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper direction="up" delay={1400}>
        <Button
          onClick={onGenerateDarf}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>GERAR DARF DE PAGAMENTO</span>
          </div>
        </Button>
      </AnimatedWrapper>
    </main>
  </div>
))

DarfGenerationStep.displayName = "DarfGenerationStep"
