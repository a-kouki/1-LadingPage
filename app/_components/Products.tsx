
import { getRationclass } from "../lib/ratio"
import Link from "next/link"
import Image from "next/image"
import { CarActions } from "../ui/CarActions"
import { api, baseURL } from "@/services/api"

import { CarImgCoudinary } from "../ui/CarImageCloudinary"

type Car = {
  name: string; src: string; year: string; price: string; href: string;
  info: string[]; ratio: string; description: string; public_id: string;
  brand: string; category: string; inStock: string;
}

async function load(): Promise<Car[]> {
  try {
    const res = await fetch(`${baseURL}/api/cars`, {
      next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    return [] 
  }
}

export async function Products() {
  const products = await load()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marcos Ramos - Vendedor de Veículos",
    description: "Marcos Veículos em Rondonópolis | Compra e Venda de Carros Seminovos",
    numerOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "BRL",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${product.src}`,
      },
    })),
  }

  return (
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
                <div
                  key={i}
                  className="group w-full flex flex-col rounded-3xl overflow-hidden border border-black/8 hover:border-primary/40 hover:shadow-lg transition-all duration-200 bg-white"
                >
                
                <Link
                  key={i}
                  className="flex flex-col flex-1"
                  href={`/${car.src}`}
                >
      
                  <div className={`relative w-full ${getRationclass(car.ratio)} overflow-hidden`}>
                     {/*
                     <Image
                      src={car.href}
                      alt={car.name}
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    */}
                    {car.public_id ? 
                    <CarImgCoudinary
                      public_id={car.public_id} 
                      name={car.name}
                      clas={`object-cover group-hover:scale-105 transition-transform duration-300`}
                    />
                    : 
                    <Image
                      src={`/favicon.png`}
                      alt="Marcos Veículos"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    }
                    
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
                  
                </div>
              </Link>
              <div className="px-4 pb-4">
              <CarActions
                    name={car.name}
                    year={car.year}
                    price={car.price}
                    src={car.src}
                    description={car.description}
                  />
              </div>
              </div>
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