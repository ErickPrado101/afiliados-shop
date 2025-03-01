"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface Recompensa {
  id: string
  nome: string
  descricao: string
  pontosNecessarios: number
  imagem: string
  tipo: "produto" | "desconto" | "servico"
}

interface PontosContextType {
  pontos: number
  adicionarPontos: (quantidade: number) => void
  resgatar: (recompensaId: string) => Promise<boolean>
  historico: Array<{
    id: string
    data: Date
    tipo: "aquisicao" | "resgate"
    quantidade: number
    descricao: string
  }>
  recompensasDisponiveis: Recompensa[]
}

const PontosContext = createContext<PontosContextType | undefined>(undefined)

// Dados simulados de recompensas
const recompensasSimuladas: Recompensa[] = [
  {
    id: "rec_1",
    nome: "Frete Grátis por 30 dias",
    descricao: "Receba frete grátis em todas as suas compras por 30 dias.",
    pontosNecessarios: 1000,
    imagem: "/placeholder.svg?height=200&width=200",
    tipo: "servico",
  },
  {
    id: "rec_2",
    nome: "Cupom de 10% de desconto",
    descricao: "Ganhe 10% de desconto em qualquer produto da loja.",
    pontosNecessarios: 500,
    imagem: "/placeholder.svg?height=200&width=200",
    tipo: "desconto",
  },
  {
    id: "rec_3",
    nome: "Upgrade para VIP por 60 dias",
    descricao: "Torne-se um cliente VIP e desfrute de benefícios exclusivos.",
    pontosNecessarios: 2000,
    imagem: "/placeholder.svg?height=200&width=200",
    tipo: "servico",
  },
  {
    id: "rec_4",
    nome: "Case para Smartphone",
    descricao: "Case premium para smartphone com design exclusivo.",
    pontosNecessarios: 800,
    imagem: "/placeholder.svg?height=200&width=200",
    tipo: "produto",
  },
  {
    id: "rec_5",
    nome: "Fones de Ouvido Bluetooth",
    descricao: "Fones de ouvido bluetooth com excelente qualidade de som.",
    pontosNecessarios: 3000,
    imagem: "/placeholder.svg?height=200&width=200",
    tipo: "produto",
  },
]

export function PontosProvider({ children }: { children: ReactNode }) {
  const [pontos, setPontos] = useState(0)
  const [historico, setHistorico] = useState<PontosContextType["historico"]>([])
  const { user } = useAuth()

  // Carregar pontos e histórico do localStorage quando o usuário logar
  useEffect(() => {
    if (user) {
      const pontosUsuario = localStorage.getItem(`pontos_${user.id}`)
      const historicoUsuario = localStorage.getItem(`historico_pontos_${user.id}`)

      if (pontosUsuario) {
        setPontos(Number(pontosUsuario))
      } else {
        // Usuário novo, definir pontos iniciais
        setPontos(100)
        localStorage.setItem(`pontos_${user.id}`, "100")

        // Adicionar ao histórico
        const historicoInicial = [
          {
            id: `hist_${Date.now()}`,
            data: new Date(),
            tipo: "aquisicao" as const,
            quantidade: 100,
            descricao: "Bônus de boas-vindas",
          },
        ]

        setHistorico(historicoInicial)
        localStorage.setItem(`historico_pontos_${user.id}`, JSON.stringify(historicoInicial))
      }

      if (historicoUsuario) {
        try {
          const historicoParseado = JSON.parse(historicoUsuario)
          // Converter as strings de data para objetos Date
          const historicoFormatado = historicoParseado.map(
            (item: {
              id: string
              data: string
              tipo: "aquisicao" | "resgate"
              quantidade: number
              descricao: string
            }) => ({
              ...item,
              data: new Date(item.data),
            }),
          )
          setHistorico(historicoFormatado)
        } catch (error) {
          console.error("Erro ao carregar histórico de pontos:", error)
        }
      }
    } else {
      // Usuário deslogado, resetar estado
      setPontos(0)
      setHistorico([])
    }
  }, [user])

  // Função para adicionar pontos
  const adicionarPontos = (quantidade: number) => {
    if (!user) return

    const novoPontos = pontos + quantidade
    setPontos(novoPontos)
    localStorage.setItem(`pontos_${user.id}`, novoPontos.toString())

    const novoHistorico = {
      id: `hist_${Date.now()}`,
      data: new Date(),
      tipo: "aquisicao" as const,
      quantidade,
      descricao: "Pontos adicionados",
    }

    const historicoAtualizado = [novoHistorico, ...historico]
    setHistorico(historicoAtualizado)
    localStorage.setItem(`historico_pontos_${user.id}`, JSON.stringify(historicoAtualizado))
  }

  // Função para resgatar recompensas
  const resgatar = async (recompensaId: string): Promise<boolean> => {
    if (!user) return false

    const recompensa = recompensasSimuladas.find((r) => r.id === recompensaId)
    if (!recompensa) return false

    if (pontos < recompensa.pontosNecessarios) return false

    const novoPontos = pontos - recompensa.pontosNecessarios
    setPontos(novoPontos)
    localStorage.setItem(`pontos_${user.id}`, novoPontos.toString())

    const novoHistorico = {
      id: `hist_${Date.now()}`,
      data: new Date(),
      tipo: "resgate" as const,
      quantidade: recompensa.pontosNecessarios,
      descricao: `Resgate: ${recompensa.nome}`,
    }

    const historicoAtualizado = [novoHistorico, ...historico]
    setHistorico(historicoAtualizado)
    localStorage.setItem(`historico_pontos_${user.id}`, JSON.stringify(historicoAtualizado))

    return true
  }

  return (
    <PontosContext.Provider
      value={{
        pontos,
        adicionarPontos,
        resgatar,
        historico,
        recompensasDisponiveis: recompensasSimuladas,
      }}
    >
      {children}
    </PontosContext.Provider>
  )
}

export function usePontos() {
  const context = useContext(PontosContext)
  if (context === undefined) {
    throw new Error("usePontos deve ser usado dentro de um PontosProvider")
  }
  return context
}

