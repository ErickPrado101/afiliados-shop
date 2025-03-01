"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  nome: string
  email: string
  nivel: "normal" | "vip" | "premium"
  fotoPerfil?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (nome: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Simula a verificação do usuário ao iniciar
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Simula uma chamada à API para verificar a autenticação
        const savedUser = localStorage.getItem("user")

        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // Simula um login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simula uma requisição
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Essa é uma validação simulada
          if (email && password.length >= 6) {
            const newUser: User = {
              id: "usr_" + Math.random().toString(36).substr(2, 9),
              nome: email.split("@")[0],
              email,
              nivel: "normal",
            }

            setUser(newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            resolve(true)
          } else {
            resolve(false)
          }
        } catch (error) {
          console.error("Erro ao fazer login:", error)
          resolve(false)
        } finally {
          setIsLoading(false)
        }
      }, 1000) // Simula o tempo de resposta
    })
  }

  // Simula um registro
  const register = async (nome: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simula uma requisição
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Simulação de validação
          if (nome && email && password.length >= 6) {
            const newUser: User = {
              id: "usr_" + Math.random().toString(36).substr(2, 9),
              nome,
              email,
              nivel: "normal",
            }

            setUser(newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            resolve(true)
          } else {
            resolve(false)
          }
        } catch (error) {
          console.error("Erro ao registrar:", error)
          resolve(false)
        } finally {
          setIsLoading(false)
        }
      }, 1000) // Simula o tempo de resposta
    })
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

