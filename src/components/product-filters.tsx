"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  "Smartphones",
  "Notebooks",
  "Wearables",
  "Áudio",
  "TVs",
  "Games",
  "Tablets",
  "Fotografia",
  "Drones",
  "PCs",
  "Monitores",
  "Periféricos",
  "Acessórios",
  "Escritório",
  "Redes",
  "Armazenamento",
]

interface ProductFiltersProps {
  onSearch: (searchTerm: string) => void
  onPriceChange: (priceRange: number[]) => void
  onCategoryChange: (categories: string[]) => void
}

export default function ProductFilters({ onSearch, onPriceChange, onCategoryChange }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 25000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange)
    onPriceChange(newPriceRange)
  }

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(updatedCategories)
    onCategoryChange(updatedCategories)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Buscar Produtos</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-blue-950/40 border-blue-500/20 text-white placeholder:text-gray-400"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            Buscar
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Preço</h3>
        <Slider min={0} max={25000} step={100} value={priceRange} onValueChange={handlePriceChange} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Categorias</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="ml-2 text-sm text-gray-300">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

