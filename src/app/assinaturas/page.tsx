import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const subscriptionPlans = [
  {
    name: "Básico",
    price: 29.99,
    features: ["Acesso a ofertas exclusivas", "Frete grátis em compras acima de R$ 200", "Suporte por email"],
  },
  {
    name: "Premium",
    price: 59.99,
    features: [
      "Todas as vantagens do plano Básico",
      "Frete grátis em todas as compras",
      "Cashback de 2% em todas as compras",
      "Acesso antecipado a novos produtos",
      "Suporte prioritário 24/7",
    ],
  },
  {
    name: "VIP",
    price: 99.99,
    features: [
      "Todas as vantagens do plano Premium",
      "Cashback de 5% em todas as compras",
      "Descontos exclusivos em lançamentos",
      "Convites para eventos especiais",
      "Atendimento personalizado",
    ],
  },
]

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Planos de Assinatura</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className="border border-blue-500/20 rounded-lg p-6 bg-blue-950/40 backdrop-blur-md flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6 text-blue-400">
              R$ {plan.price.toFixed(2)}
              <span className="text-sm font-normal text-gray-400">/mês</span>
            </p>
            <ul className="mb-6 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2 text-gray-300">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Assinar Agora</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

