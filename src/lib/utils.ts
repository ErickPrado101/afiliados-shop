import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função utilitária para formatar preço
export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco)
}

// Função utilitária para formatar data
export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data)
}

// Gerar ID aleatório
export function gerarId(prefixo = "id"): string {
  return `${prefixo}_${Math.random().toString(36).substring(2, 9)}`
}

// Truncar texto
export function truncarTexto(texto: string, maxCaracteres: number): string {
  if (texto.length <= maxCaracteres) return texto
  return texto.slice(0, maxCaracteres) + "..."
}

// Calcular desconto
export function calcularDesconto(precoAtual: number, precoAntigo: number): number {
  if (!precoAntigo || precoAntigo <= precoAtual) return 0
  return Math.round(((precoAntigo - precoAtual) / precoAntigo) * 100)
}

