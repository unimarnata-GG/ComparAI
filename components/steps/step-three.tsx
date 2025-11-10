"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function StepThree({ formData, setFormData, onNext, onPrev }: any) {
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, assetValue: value })
    setError("")
  }

  const formatCurrency = (value: string) => {
    const numValue = value.replace(/\D/g, "")
    if (!numValue) return ""
    return (Number.parseInt(numValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const isValid = formData.assetValue && Number.parseFloat(formData.assetValue.replace(/\D/g, "")) > 0

  const handleNext = () => {
    if (isValid) {
      onNext()
    } else {
      setError("Digite um valor válido")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Valor do Bem</h2>
        <p className="text-muted-foreground">Qual é o valor total do bem que deseja financiar?</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="assetValue" className="text-foreground font-semibold">
          Valor do Bem
        </Label>
        <div className="flex items-center gap-2 px-4 py-3 border-2 border-primary/30 rounded-lg bg-card focus-within:border-primary">
          <span className="text-primary font-semibold">R$</span>
          <input
            id="assetValue"
            type="text"
            placeholder="0,00"
            value={formData.assetValue}
            onChange={handleInputChange}
            className="flex-1 bg-transparent text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none"
          />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Você poderá financiar até <span className="font-semibold text-foreground">80%</span> do valor total do bem
        </p>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
