import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

const gateway = {
  tokenPrivado: "sk_42c2283d5119bc013b67375d6a115477c499646b", // Substitua com seu token real
}

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID do pagamento é obrigatório" }, { status: 400 })
    }

    const endpoint = `https://api.fastsoftbrasil.com/api/user/transactions/${id}`

    const response = await axios.get(endpoint, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`x:${gateway.tokenPrivado}`).toString("base64"),
        "Content-Type": "application/json",
      },
    })

    const transaction = response.data.data
    const status = transaction.status
    const isPaymentCompleted = status?.toLowerCase() === "paid"

    return NextResponse.json({
      paymentId: id,
      status,
      isPaymentCompleted,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Erro na verificação de pagamento:", error?.response?.data || error.message)
    return NextResponse.json(
      { error: "Erro ao consultar status da transação" },
      { status: 500 }
    )
  }
}
