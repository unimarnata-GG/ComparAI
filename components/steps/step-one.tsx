"use client"

import { Button } from "@/components/ui/button"

export default function StepOne({ formData, setFormData, onNext }: any) {
  const handleSelect = (type: string) => {
    setFormData({ ...formData, financingType: type })
  }

  const isValid = formData.financingType !== ""

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Escolha o Tipo de Financiamento</h2>
        <p className="text-muted-foreground">Qual tipo de bem você deseja financiar?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect("1")}
          className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
            formData.financingType === "1"
              ? "border-primary bg-primary/10"
              : "border-muted bg-card hover:border-primary/50"
          }`}
        >
          <div className="text-3xl mb-3">🚗</div>
          <h3 className="text-lg font-semibold text-foreground">Veículo</h3>
          <p className="text-sm text-muted-foreground mt-2">Financie um veículo novo ou usado</p>
        </button>

        <button
          onClick={() => handleSelect("2")}
          className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
            formData.financingType === "2"
              ? "border-primary bg-primary/10"
              : "border-muted bg-card hover:border-primary/50"
          }`}
        >
          <div className="text-3xl mb-3">🏠</div>
          <h3 className="text-lg font-semibold text-foreground">Imóvel</h3>
          <p className="text-sm text-muted-foreground mt-2">Financie um imóvel residencial</p>
        </button>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isValid} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Continuar
        </Button>
      </div>
    </div>
  )
}
