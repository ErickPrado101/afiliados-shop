"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCarrinho } from "../../hooks/use-carrinho"
import { formatarPreco } from "@/lib/utils"
import type { IProduto } from "../../types/produto"

interface ProductGridProps {
  products: IProduto[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { adicionarProduto } = useCarrinho()
  const [likedProducts, setLikedProducts] = useState<string[]>([])

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((produto) => (
        <div
          key={produto.id}
          className="group relative rounded-lg border border-blue-500/20 bg-blue-950/40 backdrop-blur-md overflow-hidden"
        >
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={produto.imagem || "/placeholder.svg"}
              alt={produto.nome}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={() => toggleLike(produto.id)}
            >
              <Heart className={`h-5 w-5 ${likedProducts.includes(produto.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Adicionar aos favoritos</span>
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400">
                {produto.categoria}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-3 w-3 fill-yellow-400" />
                <span className="text-xs">{produto.avaliacao.toFixed(1)}</span>
              </div>
            </div>
            <h3 className="font-medium text-white mb-1 truncate">{produto.nome}</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-bold text-white">{formatarPreco(produto.preco)}</span>
              {produto.precoAntigo && (
                <span className="text-sm line-through text-gray-400">{formatarPreco(produto.precoAntigo)}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => adicionarProduto(produto)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Comprar
              </Button>
              <Link href={`/produtos/${produto.id}`} className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  Detalhes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

