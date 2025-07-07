import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

const gateway = {
  tokenPrivado: "sk_live_utzFnl15CLYABZopbPNscoaR101EkEwNZi3XEYsFirC2Qoax", // Substitua pelo valo real
}

const endpoint = "https://api.payevo.com.br/functions/v1/transactions"
const postbackUrl = "https://seusite.com/api/pix/webhook" 
const amount = 185.19

export async function POST(request: NextRequest) {
  try {
    const { cpf, nome } = await request.json()

    if (!cpf || !nome) {
      return NextResponse.json({ error: "CPF e nome são obrigatórios" }, { status: 400 })
    }

    const payload = {
      currency: "BRL",
      customer: {
        name: nome,
        email: "email@cliente.com", // Opcional: substitua ou remova
        phone: "11999999999",        // Opcional: substitua ou remova
        document: {
          number: cpf,
          type: "CPF",
        },
      },
      paymentMethod: "PIX",
      items: [
        {
          title: "Depósito",
          unitPrice: amount * 100, // Em centavos
          quantity: 1,
          tangible: false,
        },
      ],
      pix: {
        expiresInDays: 1,
      },
      amount: amount * 100,
      postbackUrl,
    }

    const response = await axios.post(endpoint, payload, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`x:${gateway.tokenPrivado}`).toString("base64"),
        "Content-Type": "application/json",
      },
    })

    const data = response.data
    const transactionId = data.id
    const pixCode = data.pix.qrcode

    return NextResponse.json({
      id: transactionId,
      pixCode,
      amount,
      status: "pending",
    })
  } catch (error: any) {
    console.error("Erro na API de pagamento:", error?.response?.data || error.message)
    return NextResponse.json(
      { error: "Erro interno ao criar transação" },
      { status: 500 }
    )
  }
}

