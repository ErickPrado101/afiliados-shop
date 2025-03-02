import { produtos } from "../../../data/produtos"
import ProductGrid from "@/components/product-grid"

export default function PromotionsPage() {
  const promotionalProducts = produtos.filter((product) => product.precoAntigo !== null).slice(0, 10)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Promoções</h1>
      <ProductGrid products={promotionalProducts} />
    </div>
  )
}

