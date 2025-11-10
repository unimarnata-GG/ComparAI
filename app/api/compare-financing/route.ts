import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const results = await compareFinancing(body)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Erro ao processar comparação" }, { status: 500 })
  }
}

async function compareFinancing(data: any) {
  const BANCOS_USADOS = [
    "BCO COOPERATIVO SICREDI S.A.",
    "BCO BRADESCO S.A.",
    "BCO DO BRASIL S.A.",
    "ITAÚ UNIBANCO S.A.",
    "BANCO SICOOB S.A.",
    "CAIXA ECONOMICA FEDERAL",
    "SANTANDER SCFI S.A.",
    "BCO SAFRA S.A.",
  ]

  const BANCOS_POR_MARCA: Record<string, string> = {
    mercedes: "BCO MERCEDES-BENZ S.A.",
    bmw: "BMW FINANCEIRA S.A. - CFI",
    volvo: "BCO VOLVO BRASIL S.A.",
    hyundai: "BANCO HYUNDI CAPITAL BRASIL",
    gm: "BCO GM S.A.",
    volkswagen: "BCO VOLKSWAGEN S.A.",
    toyota: "BCO TOYOTA DO BRASIL S.A.",
    renault: "BCO RCI BRASIL S.A.",
    honda: "BCO HONDA S.A.",
    yamaha: "BCO YAMAHA MOTOR S.A.",
    citroen: "STELLANTIS FINANCIAMENTOS CFI",
    fiat: "STELLANTIS FINANCIAMENTOS CFI",
    jeep: "STELLANTIS FINANCIAMENTOS CFI",
    peugeot: "STELLANTIS FINANCIAMENTOS CFI",
    ram: "STELLANTIS FINANCIAMENTOS CFI",
    marcopolo: "BANCO MONEO S.A.",
    "new holland": "BANCO CNH INDUSTRIAL CAPITAL S.A.",
    iveco: "BANCO CNH INDUSTRIAL CAPITAL S.A.",
    "case ih": "BANCO CNH INDUSTRIAL CAPITAL S.A.",
    scania: "SCANIA BCO S.A.",
  }

  const MODALIDADES: Record<string, [string, string]> = {
    "1": ["Veículo", "401101"],
    "2": ["Imóvel (taxa de mercado)", "903101"],
    "3": ["Imóvel (taxa regulada - CEF)", "905101"],
  }

  const { financingType, vehicleType, propertyModality, assetValue, financedValue, carBrand, phone } = data

  const valorBem = Number.parseFloat(assetValue.replace(/\D/g, "")) / 100
  const valorFinanciado = Number.parseFloat(financedValue.replace(/\D/g, "")) / 100

  if (valorFinanciado > valorBem * 0.8) {
    throw new Error("Valor a financiar excede 80% do valor do bem")
  }

  const modalidade = financingType === "1" ? "1" : propertyModality
  const [modalidadeNome, codigoModalidade] = MODALIDADES[modalidade]

  // ✅ Busca real da API do Banco Central
  const taxas = await fetchRates(codigoModalidade)

  let bancosUsar = [...BANCOS_USADOS]
  if (financingType === "1" && vehicleType === "1" && carBrand) {
    const bancoDaMarca = BANCOS_POR_MARCA[carBrand.toLowerCase()]
    if (bancoDaMarca) {
      bancosUsar = [bancoDaMarca, ...BANCOS_USADOS.filter((b) => b !== bancoDaMarca)]
    }
  }

  const prazos = financingType === "1" ? [12, 24, 36] : [120, 240, 360]
  const resultados: any[] = []
  let seq = 1

  for (const prazo of prazos) {
    const taxasFiltradas = taxas.filter(t => bancosUsar.includes(t.banco)).slice(0, 3)

    for (const taxaData of taxasFiltradas) {
      const taxaMensal = taxaData.taxa
      const { parcela, iof, tac } = calcularParcela(valorFinanciado, taxaMensal, prazo, modalidade)
      const { cet, seguro, iof: iofCalc, tac: tacCalc } = calcularCET(valorFinanciado, prazo, taxaMensal, modalidade)

      const totalPago = parcela * prazo
      const jurosTotal = totalPago - valorFinanciado
      const rendimentoMin = parcela / 0.3

      resultados.push({
        Nº: seq,
        Banco: taxaData.banco,
        "Prazo (meses)": prazo,
        "Taxa ao mês (%)": Number.parseFloat((taxaMensal * 100).toFixed(2)),
        "Parcela (R$)": Number.parseFloat(parcela.toFixed(2)),
        "CET a.a. (%)": Number.parseFloat((cet * 100).toFixed(2)),
        "Total pago (R$)": Number.parseFloat(totalPago.toFixed(2)),
        "Juros (R$)": Number.parseFloat(jurosTotal.toFixed(2)),
        "IOF (R$)": Number.parseFloat(iofCalc.toFixed(2)),
        "TAC (R$)": Number.parseFloat(tacCalc.toFixed(2)),
        "Seguro (R$)": Number.parseFloat(seguro.toFixed(2)),
        "Renda sugerida (R$)": Number.parseFloat(rendimentoMin.toFixed(2)),
      })
      seq++
    }
  }

  return {
    financing_type: financingType,
    financed_value: valorFinanciado,
    phone: phone.replace(/\D/g, ""),
    modality: modalidadeNome,
    resultados,
  }
}

// ✅ Novo fetchRates que consulta API real do Banco Central
async function fetchRates(codigo: string) {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = hoje.getMonth()
  const mesAnterior = new Date(ano, mes - 1, 1).toISOString().split("T")[0]

  const filtro = `(codigoSegmento eq '1') and (codigoModalidade eq '${codigo}') and (InicioPeriodo eq '${mesAnterior}')`
  const url = `https://www.bcb.gov.br/api/servico/sitebcb/historicotaxajurosdiario/atual?filtro=${encodeURIComponent(filtro)}`

  try {
    const resp = await fetch(url)
    const json = await resp.json()
    const conteudo = json?.conteudo || []

    return conteudo
      .map((item: any) => {
        const banco = item?.InstituicaoFinanceira
        const taxa = parseFloat(item?.TaxaJurosAoMes?.replace(",", ".")) / 100
        return banco && taxa ? { banco, taxa } : null
      })
      .filter(Boolean)
  } catch (e) {
    console.error("Erro ao buscar taxas do Banco Central:", e)
    return []
  }
}

function calcularParcela(valor: number, taxa: number, prazo: number, modalidade: string) {
  let iof = 0
  let tac = 0
  let valorAjustado = valor

  if (modalidade === "1") {
    iof = valor * 0.000082 * prazo
    tac = valor * 0.02
    valorAjustado += iof + tac
  } else {
    iof = 0
    tac = 1000
    valorAjustado += tac
  }

  let parcela: number
  if (taxa === 0) {
    parcela = valorAjustado / prazo
  } else {
    parcela = (taxa * valorAjustado) / (1 - Math.pow(1 + taxa, -prazo))
  }

  return { parcela, iof, tac }
}

function calcularCET(valor: number, prazo: number, taxaMensal: number, modalidade: string) {
  let iofTotal = 0
  let tacTotal = 0
  let seguroTotal = 0

  if (modalidade === "1") {
    const seguroAnual = 0.02
    iofTotal = valor * 0.000082 * prazo
    tacTotal = valor * 0.02
    seguroTotal = valor * seguroAnual * (prazo / 12)
  } else {
    const seguroMensal = 0.0003
    seguroTotal = valor * seguroMensal * prazo
    iofTotal = 0
    tacTotal = 1000
  }

  const jurosAA = Math.pow(1 + taxaMensal, 12) - 1
  const cetValue = valor + iofTotal + tacTotal
  const cet = jurosAA + (seguroTotal + iofTotal + tacTotal) / cetValue

  return { cet, seguro: seguroTotal, iof: iofTotal, tac: tacTotal }
}
