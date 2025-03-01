import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "../../components/layout/header"
import Footer from "../../components/layout/footer"
import { AuthProvider } from "../../contexts/auth-context"
import { CarrinhoProvider } from "../../hooks/use-carrinho"
import { PontosProvider } from "../../contexts/pontos-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechNovaStore | Sua loja online de tecnologia",
  description: "A melhor loja para encontrar os produtos tecnológicos mais avançados",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        <AuthProvider>
          <PontosProvider>
            <CarrinhoProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CarrinhoProvider>
          </PontosProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

