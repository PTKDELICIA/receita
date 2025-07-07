"use client"

import { memo } from "react"
import { Bell } from "lucide-react"

interface CPFData {
  cpf: string
  nome: string
}

interface HeaderProps {
  cpfData?: CPFData | null
}

export const Header = memo(({ cpfData }: HeaderProps) => (
  <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold transition-transform hover:scale-105">
              <span className="text-blue-600">g</span>
              <span className="text-yellow-500">o</span>
              <span className="text-green-600">v</span>
              <span className="text-blue-600">.</span>
              <span className="text-blue-600">b</span>
              <span className="text-red-500">r</span>
            </div>
          </div>
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-lg font-semibold text-gray-900">Meu Imposto de Renda</h1>
            <p className="text-sm text-gray-600">Receita Federal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-900">{cpfData?.nome || "USUARIO NAME"}</p>
            <p className="text-xs text-gray-600">CPF: {cpfData?.cpf || "114.859.804-96"}</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-lg">
            <span className="text-white text-sm font-bold">
              {cpfData?.nome
                ? cpfData.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                : "UN"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
))

Header.displayName = "Header"
