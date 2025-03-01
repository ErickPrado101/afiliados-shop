import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-blue-950/40 backdrop-blur-md border-t border-blue-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">TechNovaStore</h3>
            <p className="text-gray-400 mb-4">
              A sua loja de tecnologia com produtos inovadores, sistema de pontos e benefícios exclusivos.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link href="/assinaturas" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Assinaturas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link href="/devolucao" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Av. Tecnológica, 1000
                  <br />
                  São Paulo, SP 01234-567
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">(11) 3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">contato@technovastore.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-2">Inscreva-se para novidades</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Seu email"
                  className="bg-blue-950/40 border-blue-500/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Assinar</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800/30 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TechNovaStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

