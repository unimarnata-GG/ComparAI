"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DetailStep({ option, onSendWhatsApp, onBack, assetValue, financedValue }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Detalhamento da Opção</h2>
        <p className="text-muted-foreground text-lg font-semibold text-primary">{option["Banco"]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Parcela Mensal</p>
          <p className="text-3xl font-bold text-primary">
            {option["Parcela (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </Card>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Taxa ao Mês</p>
          <p className="text-3xl font-bold text-accent">{option["Taxa ao mês (%)"].toFixed(2)}%</p>
        </Card>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">CET ao Ano</p>
          <p className="text-3xl font-bold text-primary">{option["CET a.a. (%)"].toFixed(2)}%</p>
        </Card>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Prazo</p>
          <p className="text-3xl font-bold text-accent">{option["Prazo (meses)"]} meses</p>
        </Card>
      </div>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold text-foreground mb-4">Resumo Financeiro</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor financiado:</span>
            <span className="font-semibold text-foreground">
              {Number.parseFloat(financedValue.replace(/\D/g, "")) / 100 > 0
                ? (Number.parseFloat(financedValue.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : financedValue}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total de juros:</span>
            <span className="font-semibold text-foreground">
              {option["Juros (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">IOF:</span>
            <span className="font-semibold text-foreground">
              {option["IOF (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">TAC:</span>
            <span className="font-semibold text-foreground">
              {option["TAC (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seguro:</span>
            <span className="font-semibold text-foreground">
              {option["Seguro (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="border-t border-border my-3" />
          <div className="flex justify-between text-base">
            <span className="font-semibold text-foreground">Total a pagar:</span>
            <span className="font-bold text-primary">
              {option["Total pago (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Renda sugerida:</span>
            <span className="font-semibold text-foreground">
              {option["Renda sugerida (R$)"].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Voltar
        </Button>
        <Button onClick={onSendWhatsApp} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          📱 Enviar por WhatsApp
        </Button>
      </div>
    </div>
  )
}
