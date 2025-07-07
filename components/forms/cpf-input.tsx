"use client"

import type React from "react"

import { memo, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"

interface CPFInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string | null
}

export const CPFInput = memo(({ value, onChange, disabled = false, error }: CPFInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const formatCPF = useCallback((cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, "$1.$2")
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target
      const inputValue = input.value
      const cursorPosition = input.selectionStart || 0

      // Remove non-digits
      const numbersOnly = inputValue.replace(/\D/g, "")

      // Limit to 11 digits
      if (numbersOnly.length > 11) return

      // Format the value
      const formatted = formatCPF(numbersOnly)

      // Calculate new cursor position
      const diff = formatted.length - inputValue.length
      const newCursorPosition = Math.max(0, cursorPosition + diff)

      onChange(formatted)

      // Restore cursor position
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
        }
      })
    },
    [formatCPF, onChange],
  )

  return (
    <div className="space-y-2">
      <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
        Digite seu CPF para acessar
      </label>
      <Input
        ref={inputRef}
        id="cpf"
        type="text"
        placeholder="000.000.000-00"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        maxLength={14}
        disabled={disabled}
        inputMode="numeric"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
})

CPFInput.displayName = "CPFInput"
