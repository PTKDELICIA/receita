"use client"

import { memo } from "react"
import { CheckCircle, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"

interface ProcessingStepProps {
  title: string
  subtitle: string
  description: string
  progress: number
  processingStep: number
  steps: Array<{
    icon: any
    title: string
    description: string
    color: string
  }>
  gradientFrom: string
  gradientTo: string
}

export const ProcessingStep = memo(
  ({
    title,
    subtitle,
    description,
    progress,
    processingStep,
    steps,
    gradientFrom,
    gradientTo,
  }: ProcessingStepProps) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
      <main className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl text-center space-y-8">
          <AnimatedWrapper direction="down">
            <div className="relative">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center mx-auto shadow-lg`}
              >
                <div className="w-4 h-4 bg-white rounded-full animate-ping" />
              </div>
              <div
                className={`absolute inset-0 w-20 h-20 ${gradientFrom.split(" ")[1]} rounded-full mx-auto animate-pulse opacity-20`}
              />
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper direction="up" delay={200}>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600 mb-2">{subtitle}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper direction="up" delay={400}>
            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full transition-all duration-300 ease-out`}
                  style={{ width: `${progress}%` }}
                />
              </Progress>
              <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% concluído</p>
            </div>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {steps.map((step, index) => (
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
                    <div className="mt-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    </div>
                  )}
                </Card>
              </AnimatedWrapper>
            ))}
          </div>

          <AnimatedWrapper direction="up" delay={1200}>
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
              <div className="flex items-center justify-center space-x-2 text-blue-800 mb-2">
                <Lock className="w-5 h-5" />
                <span className="font-medium">Conexão Segura</span>
              </div>
              <p className="text-sm text-blue-700">
                Seus dados estão sendo processados com segurança através de conexão criptografada.
              </p>
            </Card>
          </AnimatedWrapper>
        </div>
      </main>
    </div>
  ),
)

ProcessingStep.displayName = "ProcessingStep"
