"use client"

import { useState, useCallback } from "react"

interface CPFData {
  cpf: string
  nome: string
}

interface PaymentData {
  id: string
  pixCode: string
  amount: number
  status: string
}

export const usePaymentApi = () => {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  const generatePixPayment = useCallback(async (cpfData: CPFData): Promise<PaymentData | null> => {
    try {
      setIsLoadingPayment(true)
      setPaymentError(null)

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpfData.cpf,
          nome: cpfData.nome,
        }),
      })

      const data = await response.json()

      if (response.ok && data.id && data.pixCode) {
        setPaymentData(data)
        localStorage.setItem(
          "paymentData",
          JSON.stringify({
            id: data.id,
            dadosCPF: cpfData,
          }),
        )
        return data
      } else {
        setPaymentError(data.error || "Erro ao gerar pagamento PIX")
        return null
      }
    } catch (error) {
      setPaymentError("Erro ao gerar pagamento. Tente novamente.")
      return null
    } finally {
      setIsLoadingPayment(false)
    }
  }, [])

  const verifyPayment = useCallback(async (paymentId: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: paymentId }),
      })

      const data = await response.json()
      return data.status === true
    } catch (error) {
      console.error("Erro ao verificar pagamento:", error)
      return false
    }
  }, [])

  return { generatePixPayment, verifyPayment, isLoadingPayment, paymentError, paymentData, setPaymentData }
}
