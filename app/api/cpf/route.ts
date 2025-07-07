import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cpf } = await request.json()

    if (!cpf || cpf.length !== 11) {
      return NextResponse.json({ error: "CPF deve conter 11 dígitos" }, { status: 400 })
    }

    // Make request to external API
    const response = await fetch(`http://102.165.46.244:3000/base/${cpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API de CPF:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
