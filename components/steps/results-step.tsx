"use client"

import { Button } from "@/components/ui/button"

export default function ResultsStep({ results, onSelectOption, onPrev }: any) {
  const resultsByTerm = results.resultados.reduce((acc: any, result: any) => {
    const term = result["Prazo (meses)"]
    if (!acc[term]) {
      acc[term] = []
    }
    acc[term].push(result)
    return acc
  }, {})

  const terms = Object.keys(resultsByTerm).sort((a, b) => Number.parseInt(a) - Number.parseInt(b))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Melhores Opções de Financiamento</h2>
        <p className="text-muted-foreground">Escolha uma das opções abaixo para ver os detalhes</p>
      </div>

      <div className="space-y-6">
        {terms.map((term) => (
          <div key={term}>
            <h3 className="text-lg font-semibold text-primary mb-3">{term} Parcelas</h3>
            <div className="space-y-3">
              {resultsByTerm[term].map((option: any) => (
                <button
                  key={option["Nº"]}
                  onClick={() => onSelectOption(option["Nº"])}
                  className="w-full p-4 rounded-lg border-2 border-muted bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{option["Banco"]}</p>
                      <p className="text-sm text-muted-foreground">Opcao {option["Nº"]}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {option["Parcela (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      <p className="text-sm text-muted-foreground">{option["Taxa ao mês (%)"].toFixed(2)}% a.m.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      CET: <span className="font-semibold text-foreground">{option["CET a.a. (%)"].toFixed(2)}%</span>
                    </div>
                    <div>
                      Total:{" "}
                      <span className="font-semibold text-foreground">
                        {option["Total pago (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Voltar
        </Button>
      </div>
    </div>
  )
}
