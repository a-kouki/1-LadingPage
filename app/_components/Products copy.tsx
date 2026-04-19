'use client'
import type { Metadata } from "next";
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getRationclass } from "../lib/ratio";
import Link from "next/link";
import Image from "next/image"

import { baseURL } from "@/services/api";

//JSON-LD Schema para o produto metodo para codificar dados estruturados usando formato json

type Car = { 
    name: string; 
    src: string; 
    year: string; 
    price: string; 
    href: string; 
    info: string[]; 
    ratio: string;
    description: string; 
    public_id:string;
    brand:string;
    category:string;
    inStock:string;
}


export function Products(){
    const [products, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(false)

     async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/cars',{cache: 'force-cache'})
        if (!res.ok) throw new Error()
        setCars(await res.json())
      } catch {
        toast.error('Erro ao carregar carros.')
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => { load() }, [])
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Marcos Ramos - Vendedor de Veículos",
        description: "Marcos Veículos em Rondonópolis | Compra e Venda de Carros Seminovos",
        numerOfItems: products.length,
        itemListElement: products.map((product, index) => ({
        "@type": "ListItem", // Cada item da lista
        position: index + 1, // Posição na lista (importante para ordenação)
        item: {
            "@type": "Product", // Tipo: produto individual
            name: product.name, // Nome do produto (usado em rich snippets)
            description: product.description, // Descrição do produto
            brand: product.brand, // Marca (importante para e-commerce)
            category: product.category, // Categoria (ajuda na organização)
            offers: {
            "@type": "Offer", // Informações de oferta/preço
            price: product.price, // Preço numérico (necessário para rich snippets de preço)
            priceCurrency: "USD", // Moeda (padrão ISO 4217)
            availability: product.inStock
                ? "https://schema.org/InStock" // URL Schema.org para disponibilidade
                : "https://schema.org/OutOfStock", // Importante para Google Shopping
            },
            /*
            aggregateRating: {
            "@type": "AggregateRating", // Avaliações agregadas
            ratingValue: product.rating, // Nota média (1-5)
            reviewCount: product.reviews, // Quantidade de avaliações (aumenta credibilidade)
            },
            */
            url: `${baseURL}/${product.src}`, // URL do produto (importante para indexação)
        },
    })),
  };
    
    return(
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
            }}
        />
        <div className="flex justify-center bg-bg-primary text-black" id="veiculos">
        <div className="px-2 pb-10 md:px-pxGloabl max-w-widthGlobal w-full">
          <h2 className="font-bebas text-5xl text-primary">Destaques</h2>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full">
              {products.length === 0 && (
                <p className="text-sm text-black/40 py-4 text-center">Nenhum carro cadastrado.</p>
              )}
              {products.map((car, i) => (
                <Link
                  key={i}
                  className="group w-full flex flex-col hover:cursor-pointer rounded-3xl overflow-hidden border border-black/8 hover:border-primary/40 hover:shadow-lg transition-all duration-200 bg-white"
                  href={`/${car.src}`}
                >
                  <div className={`relative w-full ${getRationclass(car.ratio)} overflow-hidden`}>
                    <Image
                      src={car.href}
                      alt={car.name}
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  {/* gradiente na base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
 
                  {/* preço sobreposto */}
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <p className="text-white font-bebas text-2xl leading-none">
                      {car.price}
                    </p>
                    <p className="text-white/70 text-[11px]">{car.year}</p>
                  </div>
                </div>
 
                {/* Info estilo post */}
                <div className="flex flex-col gap-2 p-4 bg-white">
 
                  {/* cabeçalho: avatar + vendedor + status */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-black/10">
                      <Image
                        src="/favicon.png"
                        alt="logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[12px] font-semibold text-black/70">
                      Marcos Souza
                    </span>
                    <span className="ml-auto text-[11px] text-black/30">
                        {car.inStock}
                    </span>
                  </div>
 
                  {/* nome do veículo */}
                  <p className="font-bold text-[16px] leading-tight">
                    {car.name}
                  </p>

                  <p className="font-bold text-[16px] leading-tight">
                    {car.brand} - {car.category}
                  </p>

                  {/* tags de especificação */}
                  {car.info.length > 0 && car.info[0] !== "" && (
                    <div className="flex flex-wrap gap-1">
                      {car.info.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[11px] bg-black/6 text-black/55 rounded-full px-2 py-0.5 border border-black/6"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
 
                  {/* CTA WhatsApp */}
                  <div className="flex items-center justify-center gap-3 z-100">
                        {/* Botão Tenho Interesse */}
                        <a 
                            href={`https://wa.me/556699333085?text=${encodeURIComponent(`Olá! Tenho interesse nesse veículo:\n\n*${car.name}*\n${car.year} • ${car.price}\n\n${baseURL}/${car.src}`)}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2 text-[13px] font-semibold mt-1 cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.71 19.79 19.79 0 0 1 1.61 1.1 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Tenho interesse
                        </a>

                        {/* Botão Compartilhar */}
                        <div 
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                navigator.share({ title: car.name, url: car.src, text: car.description })
                            }}
                            className="flex items-center justify-center bg-gray-100 text-gray-600 rounded-xl px-4 py-2 mt-1 cursor-pointer hover:bg-gray-200">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                        </div>
                        </div>
                  </div>
              </Link>
            ))}
          </div>
          
            <a href="https://www.pokonemultimarcas.com.br/" className="flex justify-center items-center bg-primary h-10 w-full mx-auto max-w-[300px] px-10 text-white rounded-2xl mt-10"> 
              Veja muito mais
            </a>
        </div>
        </div>
        </>
    )
}