"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, AlertCircle, Copy, Check } from "lucide-react"
import FinancingForm from "@/components/financing-form"

export default function CalculatorPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState(null)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setError("")
    setResults(null)

    try {
      const response = await fetch("/api/compare-financing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar comparação")
      }

      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>
          <span className="text-sm font-medium text-foreground">Calculadora de Financiamento</span>
        </div>
      </header>

      {/* Main */}
      <main className="pt-8 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Comparar Financiamento</h1>
            <p className="text-muted-foreground">
              Preencha o formulário abaixo para encontrar as melhores opções do mercado
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm text-destructive">{error}</div>
            </div>
          )}

          {!results ? (
            <FinancingForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <ResultsDisplay results={results} onReset={() => setResults(null)} />
          )}
        </div>
      </main>
    </div>
  )
}

function ResultsDisplay({ results, onReset }) {
  const [selectedOption, setSelectedOption] = useState(0)
  const [sendingWhatsapp, setSendingWhatsapp] = useState(false)
  const [copied, setCopied] = useState(false)

  const groupedByTerm = {}
  results.resultados.forEach((r) => {
    const term = r["Prazo (meses)"]
    if (!groupedByTerm[term]) {
      groupedByTerm[term] = []
    }
    groupedByTerm[term].push(r)
  })

  const option = results.resultados[selectedOption]

  const handleSendWhatsapp = () => {
    setSendingWhatsapp(true)
    try {
      const message = `Olá! Gostaria de mais informações sobre a seguinte opção de financiamento:

DETALHAMENTO
Banco: ${option.Banco}
Modalidade: ${results.financing_type === "1" ? "Veículo" : "Imóvel"}
Prazo: ${option["Prazo (meses)"]} meses
Taxa ao mês: ${option["Taxa ao mês (%)"].toFixed(2)}%
CET a.a.: ${option["CET a.a. (%)"].toFixed(2)}%

VALORES
Valor financiado: R$ ${results.financed_value
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
Parcela mensal: R$ ${option["Parcela (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
Total a pagar: R$ ${option["Total pago (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

CUSTOS
Juros total: R$ ${option["Juros (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
IOF: R$ ${option["IOF (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
TAC: R$ ${option["TAC (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
Seguro: R$ ${option["Seguro (R$)"]
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

Pode me contatar para mais informações?`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${results.phone}?text=${encodedMessage}`
      window.open(whatsappUrl, "_blank")
    } finally {
      setSendingWhatsapp(false)
    }
  }

  const handleCopyDetails = () => {
    const text = `${option.Banco}
Prazo: ${option["Prazo (meses)"]} meses
Taxa: ${option["Taxa ao mês (%)"].toFixed(2)}% a.m.
CET: ${option["CET a.a. (%)"].toFixed(2)}% a.a.
Parcela: R$ ${option["Parcela (R$)"].toFixed(2)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Resumo por prazo */}
      {Object.keys(groupedByTerm)
        .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
        .map((term) => {
          const termo = Number.parseInt(term)
          const grupo = groupedByTerm[term]
          const rendimentoMin = Math.max(...grupo.map((r) => r["Renda sugerida (R$)"]))

          return (
            <div key={term} className="bg-card border border-border rounded-xl p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-lg">{termo} Parcelas</h3>
                <p className="text-sm text-muted-foreground">
                  Renda sugerida a partir de R$ {rendimentoMin.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="space-y-2">
                {grupo.map((op, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(results.resultados.indexOf(op))}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedOption === results.resultados.indexOf(op)
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{op.Banco}</p>
                        <p className="text-xs text-muted-foreground">Taxa: {op["Taxa ao mês (%)"].toFixed(2)}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          R$ {op["Parcela (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-muted-foreground">mensais</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}

      {/* Detalhes da opção selecionada */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Detalhes da Opção</h2>
          <button
            onClick={handleCopyDetails}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copiar
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Instituição Financeira</p>
            <p className="font-semibold text-foreground text-lg">{option.Banco}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Taxa ao Mês</p>
              <p className="text-2xl font-bold text-primary">{option["Taxa ao mês (%)"].toFixed(2)}%</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">CET Anual</p>
              <p className="text-2xl font-bold text-primary">{option["CET a.a. (%)"].toFixed(2)}%</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Prazo</p>
              <p className="text-2xl font-bold text-primary">{option["Prazo (meses)"]} meses</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Valores</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Valor Financiado</p>
                <p className="font-semibold text-foreground">
                  R$ {results.financed_value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Parcela Mensal</p>
                <p className="font-semibold text-foreground">
                  R$ {option["Parcela (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total a Pagar</p>
                <p className="font-semibold text-foreground">
                  R$ {option["Total pago (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Juros Total</p>
                <p className="font-semibold text-foreground">
                  R$ {option["Juros (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Custos Adicionais</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">IOF (Imposto)</p>
                <p className="font-semibold text-foreground">
                  R$ {option["IOF (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TAC (Taxa de Abertura)</p>
                <p className="font-semibold text-foreground">
                  R$ {option["TAC (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seguro Total</p>
                <p className="font-semibold text-foreground">
                  R$ {option["Seguro (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Renda Sugerida</p>
                <p className="font-semibold text-foreground">
                  R$ {option["Renda sugerida (R$)"].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Receber Detalhes por WhatsApp</h2>
        <p className="text-sm text-muted-foreground mb-6">Envie a proposta completa desta opção para seu WhatsApp</p>
        <button
          onClick={handleSendWhatsapp}
          disabled={sendingWhatsapp}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {sendingWhatsapp ? "Abrindo WhatsApp..." : "Enviar pelo WhatsApp"}
        </button>
      </div>

      {/* Nova Simulação */}
      <button
        onClick={onReset}
        className="w-full py-3 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
      >
        Nova Simulação
      </button>
    </div>
  )
}
