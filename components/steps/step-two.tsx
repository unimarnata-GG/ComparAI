"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function StepTwo({ formData, setFormData, onNext, onPrev }: any) {
  const [showPropertyTypes, setShowPropertyTypes] = useState(false)

  const handleSelect = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value })
    if (field === "vehicleType") {
      onNext()
    }
  }

  const handlePropertySelect = (value: string) => {
    setFormData({ ...formData, propertyType: value })
    setShowPropertyTypes(false)
    onNext()
  }

  const isVehicle = formData.financingType === "1"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isVehicle ? "Tipo de Veículo" : "Modalidade de Imóvel"}
        </h2>
        <p className="text-muted-foreground">
          {isVehicle ? "É um veículo novo ou usado?" : "Escolha a modalidade de financiamento"}
        </p>
      </div>

      {isVehicle ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect("1", "vehicleType")}
            className="p-6 rounded-lg border-2 border-muted bg-card hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-foreground">Novo</h3>
            <p className="text-sm text-muted-foreground mt-2">Veículo 0km</p>
          </button>

          <button
            onClick={() => handleSelect("2", "vehicleType")}
            className="p-6 rounded-lg border-2 border-muted bg-card hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold text-foreground">Usado</h3>
            <p className="text-sm text-muted-foreground mt-2">Veículo com uso</p>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handlePropertySelect("2")}
            className="p-6 rounded-lg border-2 border-muted bg-card hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-foreground">Taxa de Mercado</h3>
            <p className="text-sm text-muted-foreground mt-2">Conforme condições atuais</p>
          </button>

          <button
            onClick={() => handlePropertySelect("3")}
            className="p-6 rounded-lg border-2 border-muted bg-card hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="text-lg font-semibold text-foreground">Minha Casa Minha Vida</h3>
            <p className="text-sm text-muted-foreground mt-2">Programa governamental</p>
          </button>
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Voltar
        </Button>
      </div>
    </div>
  )
}
