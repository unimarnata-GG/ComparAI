import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, Eye } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">COMPARAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#diferenciais" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Diferenciais
            </a>
            <a href="#funcionamento" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </a>
            <Link
              href="/calculator"
              className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Começar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Comparação Inteligente de Crédito
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Encontre as melhores condições de financiamento para veículos e imóveis. Análise rápida, segura e totalmente
            transparente.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
          >
            Começar Comparação
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-20 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Por que escolher COMPARAI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Análise Algorítmica",
                description: "Processamento inteligente que compara múltiplas instituições em segundos",
              },
              {
                icon: Shield,
                title: "Segurança Bancária",
                description: "Proteção de dados com padrões de segurança de nível institucional",
              },
              {
                icon: Eye,
                title: "Transparência Total",
                description: "Visualize todas as taxas, juros, IOF, TAC, seguro e CET em detalhes",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="funcionamento" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Como Funciona</h2>
          <div className="space-y-8">
            {[
              {
                num: "01",
                title: "Informações",
                desc: "Preencha os dados do financiamento desejado em um único formulário",
              },
              {
                num: "02",
                title: "Análise de Mercado",
                desc: "Nossas consultas rastreiam as taxas mais recentes do Banco Central",
              },
              {
                num: "03",
                title: "Comparação Detalhada",
                desc: "Visualize todas as opções com cálculos completos de juros e custos",
              },
              {
                num: "04",
                title: "Contato Direto",
                desc: "Envie os detalhes da melhor opção diretamente para seu WhatsApp",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{item.num}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para encontrar a melhor taxa?</h2>
          <p className="text-primary-foreground/90 mb-8">
            Acesse agora nossa calculadora e comparecompare todas as opções disponíveis
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:opacity-90 transition-all"
          >
            Ir para Calculadora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">COMPARAI</span>
              </div>
              <p className="text-xs text-muted-foreground">Plataforma Inteligente de Comparação de Crédito</p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Política de Privacidade</p>
              <p>Termos de Uso</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-xs text-muted-foreground text-center">
            <p>© 2025 COMPARAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
