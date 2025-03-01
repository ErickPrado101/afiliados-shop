"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, Search, Package, Heart, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCarrinho } from "../../hooks/use-carrinho";
import { useAuth } from "../../contexts/auth-context";
import { usePontos } from "../../contexts/pontos-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { qtdItens } = useCarrinho();
  const { user, logout } = useAuth();
  const { pontos } = usePontos();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-blue-950/80 backdrop-blur-md border-b border-blue-500/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Seção Esquerda: Menu Mobile e Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/" className="text-xl font-bold text-white">
              TechNovaStore
            </Link>
          </div>

          {/* Seção Central: Links de Navegação */}
          <nav className="flex-1 hidden md:flex justify-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Início
            </Link>
            <Link
              href="/produtos"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/produtos" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Produtos
            </Link>
            <Link
              href="/promocoes"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/promocoes" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Promoções
            </Link>
            <Link
              href="/assinaturas"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/assinaturas" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Assinaturas
            </Link>
            <Link
              href="/comunidade"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/comunidade" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              Comunidade
            </Link>
          </nav>

          {/* Seção Direita: Busca e Ações do Usuário */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-[200px] lg:w-[300px] pl-9 bg-blue-950/40 border-blue-500/20 text-white placeholder:text-gray-400 focus-visible:ring-blue-400"
              />
            </div>
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Heart className="h-5 w-5 text-gray-300 hover:text-blue-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-blue-950 border-blue-500/20 text-white"
                  >
                    <div className="p-2 text-center">
                      <p className="text-sm font-medium">Meus Favoritos</p>
                    </div>
                    <DropdownMenuSeparator className="bg-blue-800/30" />
                    <div className="p-4 text-center text-sm">
                      Sua lista de favoritos está vazia
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative text-gray-300 hover:text-blue-400">
                      <Package className="h-5 w-5 mr-2" />
                      <span className="hidden lg:inline">{pontos}</span>
                      <span className="hidden lg:inline"> pontos</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-blue-950 border-blue-500/20 text-white"
                  >
                    <div className="p-4 text-center">
                      <p className="text-sm font-medium">Programa de Pontos</p>
                      <p className="text-2xl font-bold mt-1">{pontos} pontos</p>
                    </div>
                    <DropdownMenuSeparator className="bg-blue-800/30" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-blue-800/50">
                      <Link href="/conta/pontos" className="flex w-full">
                        Ver meus pontos e recompensas
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/carrinho">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-300 hover:text-blue-400"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {qtdItens > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-blue-600 hover:bg-blue-600 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {qtdItens}
                      </Badge>
                    )}
                    <span className="sr-only">Carrinho</span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                      size="icon"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={user.nome} />
                        <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-blue-950 border-blue-500/20 text-white"
                  >
                    <div className="p-2">
                      <p className="text-sm font-medium">{user.nome}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-blue-800/30" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-blue-800/50">
                      <Link href="/conta/perfil" className="flex w-full">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-blue-800/50">
                      <Link href="/conta/pedidos" className="flex w-full">
                        <Package className="mr-2 h-4 w-4" />
                        Meus Pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-blue-800/30" />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/conta/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-blue-400">
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/conta/cadastro">
                  <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-blue-950/95 backdrop-blur-sm overflow-y-auto z-40 md:hidden">
          <div className="container mx-auto p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full pl-9 bg-blue-950/40 border-blue-500/20 text-white placeholder:text-gray-400"
              />
            </div>
            <nav className="grid gap-2">
              <Link
                href="/"
                className={`flex items-center p-2 rounded-lg ${
                  pathname === "/" ? "bg-blue-900/40 text-blue-400" : "text-gray-300"
                }`}
                onClick={closeMenu}
              >
                Início
              </Link>
              <Link
                href="/produtos"
                className={`flex items-center p-2 rounded-lg ${
                  pathname === "/produtos" ? "bg-blue-900/40 text-blue-400" : "text-gray-300"
                }`}
                onClick={closeMenu}
              >
                Produtos
              </Link>
              <Link
                href="/promocoes"
                className={`flex items-center p-2 rounded-lg ${
                  pathname === "/promocoes" ? "bg-blue-900/40 text-blue-400" : "text-gray-300"
                }`}
                onClick={closeMenu}
              >
                Promoções
              </Link>
              <Link
                href="/assinaturas"
                className={`flex items-center p-2 rounded-lg ${
                  pathname === "/assinaturas" ? "bg-blue-900/40 text-blue-400" : "text-gray-300"
                }`}
                onClick={closeMenu}
              >
                Assinaturas
              </Link>
              <Link
                href="/comunidade"
                className={`flex items-center p-2 rounded-lg ${
                  pathname === "/comunidade" ? "bg-blue-900/40 text-blue-400" : "text-gray-300"
                }`}
                onClick={closeMenu}
              >
                Comunidade
              </Link>
            </nav>
            <div className="mt-6 border-t border-blue-800/30 pt-4">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.nome} />
                      <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">{pontos} pontos</span>
                    </div>
                    <Link href="/conta/pontos" onClick={closeMenu}>
                      <Button variant="link" className="text-blue-400 p-0 h-auto">
                        Ver recompensas
                      </Button>
                    </Link>
                  </div>
                  <div className="grid gap-1">
                    <Link
                      href="/conta/perfil"
                      className="flex items-center p-2 rounded-lg text-gray-300"
                      onClick={closeMenu}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                    <Link
                      href="/conta/pedidos"
                      className="flex items-center p-2 rounded-lg text-gray-300"
                      onClick={closeMenu}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Meus Pedidos
                    </Link>
                    <Link
                      href="/favoritos"
                      className="flex items-center p-2 rounded-lg text-gray-300"
                      onClick={closeMenu}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Favoritos
                    </Link>
                    <button
                      className="flex items-center p-2 rounded-lg text-red-400 w-full text-left"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/conta/login" onClick={closeMenu}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/conta/cadastro" onClick={closeMenu}>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    >
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
