export interface IProduto {
    id: string
    nome: string
    descricao: string
    preco: number
    precoAntigo: number | null
    estoque: number
    categoria: string
    avaliacao: number
    imagem: string
    caracteristicas: string[]
    destaque: boolean
    fabricante: string
    pontos: number
  }
  
  