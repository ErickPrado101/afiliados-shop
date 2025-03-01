"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { IProduto } from "../types/produto"

interface ItemCarrinho {
  produto: IProduto
  quantidade: number
}

interface CarrinhoContextType {
  itens: ItemCarrinho[]
  qtdItens: number
  subtotal: number
  adicionarProduto: (produto: IProduto) => void
  removerProduto: (id: string) => void
  atualizarQuantidade: (id: string, quantidade: number) => void
  limparCarrinho: () => void
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho")
    if (carrinhoSalvo) {
      try {
        setItens(JSON.parse(carrinhoSalvo))
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
        localStorage.removeItem("carrinho")
      }
    }
  }, [])

  // Salvar no localStorage quando itens muda
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  const adicionarProduto = (produto: IProduto) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((item) => item.produto.id === produto.id)

      if (itemExistente) {
        // Produto já existe no carrinho, atualiza a quantidade
        return prevItens.map((item) =>
          item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        )
      } else {
        // Produto novo no carrinho
        return [...prevItens, { produto, quantidade: 1 }]
      }
    })
  }

  const removerProduto = (id: string) => {
    setItens((prevItens) => prevItens.filter((item) => item.produto.id !== id))
  }

  const atualizarQuantidade = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerProduto(id)
      return
    }

    setItens((prevItens) => prevItens.map((item) => (item.produto.id === id ? { ...item, quantidade } : item)))
  }

  const limparCarrinho = () => {
    setItens([])
  }

  // Calculando a quantidade total de itens
  const qtdItens = itens.reduce((total, item) => total + item.quantidade, 0)

  // Calculando o subtotal
  const subtotal = itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0)

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        qtdItens,
        subtotal,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext)
  if (context === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider")
  }
  return context
}

