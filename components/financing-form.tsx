"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"

const MARCAS_VEICULOS = {
  mercedes: "Mercedes",
  bmw: "BMW",
  volvo: "Volvo",
  hyundai: "Hyundai",
  gm: "General Motors",
  volkswagen: "Volkswagen",
  toyota: "Toyota",
  renault: "Renault",
  honda: "Honda",
  yamaha: "Yamaha",
  citroen: "Citroën",
  fiat: "Fiat",
  jeep: "Jeep",
  peugeot: "Peugeot",
  ram: "Ram",
  marcopolo: "Marcopolo",
  "new holland": "New Holland",
  iveco: "Iveco",
  "case ih": "Case IH",
  scania: "Scania",
}

export default function FinancingForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    financingType: "1",
    vehicleType: "1",
    propertyModality: "2",
    assetValue: "",
    financedValue: "",
    carBrand: "",
    phone: "",
  })

  const [errors, setErrors] = useState({})
  const [showBrandSelect, setShowBrandSelect] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.assetValue || Number.parseFloat(formData.assetValue.replace(/\D/g, "")) <= 0) {
      newErrors.assetValue = "Valor do bem obrigatório"
    }
    if (!formData.financedValue || Number.parseFloat(formData.financedValue.replace(/\D/g, "")) <= 0) {
      newErrors.financedValue = "Valor a financiar obrigatório"
    }
    if (formData.financingType === "1" && formData.vehicleType === "1" && !formData.carBrand) {
      newErrors.carBrand = "Selecione a marca do veículo"
    }
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        financingType: formData.financingType,
        vehicleType: formData.vehicleType,
        propertyModality: formData.propertyModality,
        assetValue: formData.assetValue,
        financedValue: formData.financedValue,
        carBrand: formData.carBrand,
        phone: formData.phone,
      })
    }
  }

  const assetValue = Number.parseFloat(formData.assetValue.replace(/\D/g, "")) / 100 || 0
  const maxFinanced = assetValue * 0.8

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tipo de Financiamento */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Financiamento</label>
          <select
            value={formData.financingType}
            onChange={(e) => {
              setFormData({ ...formData, financingType: e.target.value })
              setShowBrandSelect(false)
            }}
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">Veículo</option>
            <option value="2">Imóvel</option>
          </select>
        </div>

        {/* Tipo de Veículo ou Modalidade Imóvel */}
        {formData.financingType === "1" ? (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Veículo</label>
            <select
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="1">Novo</option>
              <option value="2">Usado</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Modalidade do Imóvel</label>
            <select
              value={formData.propertyModality}
              onChange={(e) => setFormData({ ...formData, propertyModality: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="2">Taxa de Mercado</option>
              <option value="3">Programa Minha Casa Minha Vida</option>
            </select>
          </div>
        )}
      </div>

      {/* Marca do Veículo (aparece apenas se veículo novo) */}
      {formData.financingType === "1" && formData.vehicleType === "1" && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Marca do Veículo</label>
          <select
            value={formData.carBrand}
            onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
            className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.carBrand ? "border-destructive" : "border-border"
            }`}
          >
            <option value="">Selecione a marca</option>
            {Object.entries(MARCAS_VEICULOS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.carBrand && <p className="text-xs text-destructive mt-1">{errors.carBrand}</p>}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Valor do Bem */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Valor do Bem
          </label>
          <input
            type="text"
            placeholder="R$ 0,00"
            value={formData.assetValue}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              if (value) {
                const numValue = Number.parseInt(value)
                const formatted = new Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(numValue / 100)
                setFormData({ ...formData, assetValue: formatted })
              } else {
                setFormData({ ...formData, assetValue: "" })
              }
            }}
            className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.assetValue ? "border-destructive" : "border-border"
            }`}
          />
          {errors.assetValue && <p className="text-xs text-destructive mt-1">{errors.assetValue}</p>}
        </div>

        {/* Valor a Financiar */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Valor a Financiar
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="R$ 0,00"
              value={formData.financedValue}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                if (value) {
                  const numValue = Number.parseInt(value)
                  if (numValue <= assetValue * 100) {
                    const formatted = new Intl.NumberFormat("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(numValue / 100)
                    setFormData({ ...formData, financedValue: formatted })
                  }
                } else {
                  setFormData({ ...formData, financedValue: "" })
                }
              }}
              className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.financedValue ? "border-destructive" : "border-border"
              }`}
            />
            {maxFinanced > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Máximo: R$ {maxFinanced.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            )}
          </div>
          {errors.financedValue && <p className="text-xs text-destructive mt-1">{errors.financedValue}</p>}
        </div>
      </div>

      {/* Telefone WhatsApp */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          Número do WhatsApp
        </label>
        <input
          type="tel"
          placeholder="Ex: (11) 99999-9999"
          value={formData.phone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "")
            if (value.length <= 11) {
              if (value.length >= 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
              } else if (value.length > 0) {
                value = `(${value}`
              }
              setFormData({ ...formData, phone: value })
            }
          }}
          className={`w-full px-4 py-2.5 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? "border-destructive" : "border-border"
          }`}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? "Analisando..." : "Comparar Opções de Financiamento"}
      </button>
    </form>
  )
}
