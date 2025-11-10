"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function StepFour({ formData, setFormData, onSubmit, onPrev, isLoading }: any) {
  const [error, setError] = useState("")
  const [carBrandError, setCarBrandError] = useState("")

  const isNewVehicle = () => formData.financingType === "1" && formData.vehicleType === "1"

  const maxFinancing = (Number.parseFloat(formData.assetValue.replace(/\D/g, "")) * 0.8) / 100

  const handleFinancedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = Number.parseFloat(value.replace(/\D/g, "")) / 100

    if (numValue > maxFinancing) {
      setError(
        `Valor máximo permitido: R$ ${maxFinancing.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      )
      setFormData({ ...formData, financedValue: "" })
    } else if (numValue <= 0) {
      setError("")
      setFormData({ ...formData, financedValue: value })
    } else {
      setError("")
      setFormData({ ...formData, financedValue: value })
    }
  }

  const handleCarBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarBrandError("")
    setFormData({ ...formData, carBrand: e.target.value })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 11) {
      setFormData({ ...formData, phone: value })
    }
  }

  const isValid =
    formData.financedValue &&
    Number.parseFloat(formData.financedValue.replace(/\D/g, "")) > 0 &&
    formData.phone.length === 11 &&
    (!isNewVehicle() || formData.carBrand)

  const handleSubmit = () => {
    if (!formData.carBrand && isNewVehicle()) {
      setCarBrandError("Informe a marca do veículo")
      return
    }
    onSubmit()
  }

  const formatPhone = (value: string) => {
    if (value.length <= 2) return value
    if (value.length <= 7) return `(${value.slice(0, 2)}) ${value.slice(2)}`
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados Finais</h2>
        <p className="text-muted-foreground">Complete as informações para comparar as melhores taxas</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="financedValue" className="text-foreground font-semibold">
            Valor a Financiar
          </Label>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-primary/30 rounded-lg bg-card focus-within:border-primary mt-2">
            <span className="text-primary font-semibold">R$</span>
            <input
              id="financedValue"
              type="text"
              placeholder="0,00"
              value={formData.financedValue}
              onChange={handleFinancedValueChange}
              className="flex-1 bg-transparent text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none"
            />
          </div>
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          <p className="text-xs text-muted-foreground mt-2">
            Máximo: R$ {maxFinancing.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>

        {isNewVehicle() && (
          <div>
            <Label htmlFor="carBrand" className="text-foreground font-semibold">
              Marca do Veículo
            </Label>
            <Input
              id="carBrand"
              placeholder="Ex: BMW, Mercedes, Hyundai..."
              value={formData.carBrand || ""}
              onChange={handleCarBrandChange}
              className="mt-2 border-primary/30 focus:border-primary"
            />
            {carBrandError && <p className="text-destructive text-sm mt-1">{carBrandError}</p>}
          </div>
        )}

        <div>
          <Label htmlFor="phone" className="text-foreground font-semibold">
            Telefone (WhatsApp)
          </Label>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-primary/30 rounded-lg bg-card focus-within:border-primary mt-2">
            <span className="text-muted-foreground">🇧🇷</span>
            <input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formatPhone(formData.phone)}
              onChange={handlePhoneChange}
              className="flex-1 bg-transparent text-lg font-semibold text-foreground placeholder-muted-foreground focus:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Será usado para enviar o detalhamento por WhatsApp</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? "Comparando..." : "Ver Comparação"}
        </Button>
      </div>
    </div>
  )
}
