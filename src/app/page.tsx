import Link from "next/link"
import { ArrowRight, ShoppingCart, Star, Zap } from "lucide-react"
import FeaturedProducts from "../../components/featured-products"
import HeroCarousel from "../../components/hero-carousel"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 to-blue-950">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 backdrop-blur-md border border-blue-500/20">
                  Lançamento exclusivo
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                  TechNovaStore
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400">
                  Descubra o futuro da tecnologia hoje. Acumule pontos, ganhe recompensas e junte-se à nossa comunidade
                  de entusiastas.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/produtos">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Explorar produtos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/conta/cadastro">
                    <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                      Criar conta
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                    <span className="text-gray-300">Programa de pontos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">Produtos exclusivos</span>
                  </div>
                </div>
              </div>
              <HeroCarousel />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-950/40 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 backdrop-blur-md border border-blue-500/20">
                  Em destaque
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Produtos em Destaque</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubra nossa seleção de produtos tecnológicos de última geração com preços exclusivos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              <FeaturedProducts />
            </div>
            <div className="flex justify-center">
              <Link href="/produtos">
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  Ver todos os produtos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 backdrop-blur-md border border-blue-500/20">
                  Benefícios
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Por que escolher a TechNovaStore?
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossa plataforma oferece uma experiência de compra única com diversos benefícios.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-blue-500/20 bg-blue-950/40 backdrop-blur-md p-6">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Star className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Sistema de Pontos</h3>
                <p className="text-gray-300 text-center">
                  Acumule pontos em cada compra e troque por produtos e serviços exclusivos.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-blue-500/20 bg-blue-950/40 backdrop-blur-md p-6">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Níveis VIP</h3>
                <p className="text-gray-300 text-center">
                  Desbloqueie benefícios exclusivos à medida que sobe nos níveis VIP da plataforma.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-blue-500/20 bg-blue-950/40 backdrop-blur-md p-6">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <ShoppingCart className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Compras sem complicação</h3>
                <p className="text-gray-300 text-center">
                  Processo de compra simplificado com múltiplas opções de pagamento e entrega rápida.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

