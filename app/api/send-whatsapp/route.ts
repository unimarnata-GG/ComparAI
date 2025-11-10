import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, option, assetValue, financedValue } = body

    // Format phone number for WhatsApp
    const cleanPhone = phone.replace(/\D/g, "")
    const whatsappPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`

    // Create WhatsApp message
    const message = formatWhatsAppMessage(option, assetValue, financedValue)

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp API URL - in production, use a proper API like Twilio or WhatsApp Business API
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`

    // Return the WhatsApp link (frontend can redirect or open in new window)
    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: "Mensagem pronta para envio no WhatsApp",
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 })
  }
}

function formatWhatsAppMessage(option: any, assetValue: string, financedValue: string): string {
  const valorBem = Number.parseFloat(assetValue.replace(/\D/g, "")) / 100
  const valorFinanciado = Number.parseFloat(financedValue.replace(/\D/g, "")) / 100

  return `*DETALHAMENTO DE FINANCIAMENTO - COMPARAI*

*Banco:* ${option["Banco"]}
*Opção:* ${option["Nº"]}

*INFORMAÇÕES DO BEM*
Valor do bem: R$ ${valorBem.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

*CONDIÇÕES DO FINANCIAMENTO*
Valor financiado: R$ ${valorFinanciado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
Prazo: ${option["Prazo (meses)"]} meses
Taxa ao mês: ${option["Taxa ao mês (%)"].toFixed(2)}%
CET ao ano: ${option["CET a.a. (%)"].toFixed(2)}%

*PARCELAS E CUSTOS*
Parcela mensal: R$ ${option["Parcela (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
Total de juros: R$ ${option["Juros (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
IOF: R$ ${option["IOF (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
TAC: R$ ${option["TAC (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
Seguro: R$ ${option["Seguro (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

*RESUMO TOTAL*
Total a pagar: R$ ${option["Total pago (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
Renda sugerida: R$ ${option["Renda sugerida (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

---
Enviado por COMPARAI - Comparador Inteligente de Crédito
Acesse: https://comparai.app`
}
