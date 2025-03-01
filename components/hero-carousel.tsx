"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      id: 1,
      image: "/placeholder.svg?height=600&width=600",
      alt: "Smartphone de última geração",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=600&width=600",
      alt: "Notebook com design futurista",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=600&width=600",
      alt: "Smartwatch avançado",
    },
  ]

  const nextSlide = () => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, []) // Removed nextSlide from dependencies

  return (
    <div className="relative rounded-xl overflow-hidden group bg-blue-950/40 border border-blue-500/20 backdrop-blur-md">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 p-4 text-white">
        <h3 className="text-xl md:text-2xl font-bold">Produtos em destaque</h3>
        <p className="text-sm md:text-base text-gray-300">Confira nossas ofertas exclusivas por tempo limitado</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-950/60 text-white hover:bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Anterior</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-950/60 text-white hover:bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Próximo</span>
      </Button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-blue-400" : "bg-gray-400/50"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

