"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { produtos } from "../../../data/produtos"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import type { IProduto } from "../../../types/produto"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<IProduto[]>(produtos)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 25000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  useEffect(() => {
    const filtered = produtos.filter((product) => {
      const matchesSearch =
        product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = product.preco >= priceRange[0] && product.preco <= priceRange[1]
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoria)
      return matchesSearch && matchesPrice && matchesCategory
    })
    setFilteredProducts(filtered)
  }, [searchTerm, priceRange, selectedCategories])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handlePriceChange = (range: number[]) => {
    setPriceRange(range)
  }

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Nossos Produtos</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <ProductFilters
            onSearch={handleSearch}
            onPriceChange={handlePriceChange}
            onCategoryChange={handleCategoryChange}
          />
        </aside>
        <main className="w-full md:w-3/4">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  )
}

