"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import StepOne from "./steps/step-one"
import StepTwo from "./steps/step-two"
import StepThree from "./steps/step-three"
import StepFour from "./steps/step-four"
import ResultsStep from "./steps/results-step"
import DetailStep from "./steps/detail-step"

type FormData = {
  financingType: string
  vehicleType?: string
  propertyType?: string
  assetValue: string
  financedValue: string
  carBrand?: string
  phone: string
}

export default function CreditComparator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    financingType: "",
    assetValue: "",
    financedValue: "",
    phone: "",
  })
  const [results, setResults] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/compare-financing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setResults(data)
      setCurrentStep(5)
    } catch (error) {
      console.error("Error:", error)
    }
    setIsLoading(false)
  }

  const handleSelectOption = (optionNumber: number) => {
    setSelectedOption(optionNumber)
    setCurrentStep(6)
  }

  const handleSendWhatsApp = async () => {
    if (!selectedOption || !results) return

    const selectedData = results.resultados.find((r: any) => r["Nº"] === selectedOption)

    try {
      await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          option: selectedData,
          assetValue: formData.assetValue,
          financedValue: formData.financedValue,
        }),
      })
      alert("Detalhamento enviado por WhatsApp!")
    } catch (error) {
      console.error("Error sending WhatsApp:", error)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">COMPARAI</h1>
          <p className="text-muted-foreground text-lg">Comparador Inteligente de Crédito</p>
          <p className="text-muted-foreground text-sm mt-2">
            Encontre as melhores condições de financiamento para você
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full mx-1 transition-all ${
                  step <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">Etapa {currentStep} de 6</p>
        </div>

        {/* Form Card */}
        <Card className="p-8 shadow-lg">
          {currentStep === 1 && <StepOne formData={formData} setFormData={setFormData} onNext={handleNext} />}
          {currentStep === 2 && (
            <StepTwo formData={formData} setFormData={setFormData} onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 3 && (
            <StepThree formData={formData} setFormData={setFormData} onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 4 && (
            <StepFour
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onPrev={handlePrev}
              isLoading={isLoading}
            />
          )}
          {currentStep === 5 && results && (
            <ResultsStep results={results} onSelectOption={handleSelectOption} onPrev={handlePrev} />
          )}
          {currentStep === 6 && selectedOption && results && (
            <DetailStep
              option={results.resultados.find((r: any) => r["Nº"] === selectedOption)}
              onSendWhatsApp={handleSendWhatsApp}
              onBack={() => setCurrentStep(5)}
              assetValue={formData.assetValue}
              financedValue={formData.financedValue}
            />
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>COMPARAI © 2025 - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}
