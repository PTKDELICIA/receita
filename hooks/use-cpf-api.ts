"use client"

import { useState, useCallback } from "react"

interface CPFData {
  cpf: string
  nome: string
  sexo: string
  dataNascimento: string
}

export const useCPFApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCPFData = useCallback(async (cpfNumber: string): Promise<CPFData | null> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/cpf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: cpfNumber }),
      })

      const data = await response.json()

      if (data.status === "ok" && data.dadosCPF) {
        return data.dadosCPF
      } else {
        setError("CPF não encontrado ou inválido")
        return null
      }
    } catch (error) {
      setError("Erro ao consultar CPF. Tente novamente.")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { fetchCPFData, isLoading, error }
}
