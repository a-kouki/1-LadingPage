import Image from 'next/image'
import carsData from '@/app/data/info.json'
import { getRationclass } from '../lib/ratio'
import { Metadata } from "next";

import { CarActions } from './CarActions';
import { CarImgCoudinary } from './CarImageCloudinary';


type Car = {
  name: string
  year: string
  info: string[]
  price: string
  href: string
  ratio: string
  description: string
}

// Monta o mapa uma vez (O(n) só na inicialização)
const srcToIndex = Object.fromEntries(
  carsData.map((car, i) => [car.src, i])
)

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function CarDetail({ params }: { params: Promise<{id: string}> }) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const { id } = await params
  // Na busca: O(1) — igual ao acesso por índice numérico
  const index = srcToIndex[id]
  const car = carsData[index]

  if (!car || !car?.name) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-5xl">🚗</p>
        <h2 className="text-xl font-semibold">Veículo não encontrado</h2>
        <p className="text-black/50 text-sm">
          O veículo que você procura não existe ou foi removido.
        </p>
      </div>
    )
  }
  
    return (
  <div className="flex flex-col gap-4">
    {/* Layout: lado a lado no desktop, vertical no mobile */}
    <div className="flex flex-col sm:flex-row gap-4">

      {/* Imagem — esquerda no desktop */}
      <div className={`relative w-full sm:w-[45%]  shrink-0 ${getRationclass(car.ratio)} rounded-2xl overflow-hidden`}>
        
        {car.public_id ? 
        <CarImgCoudinary
          public_id={car.public_id} 
          name={car.name}
          clas={`object-cover`}
        />
        : 
        <Image
          src={`/favicon.png`}
          alt="Marcos Veículos"
          loading="lazy"
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className="absolute bottom-3 left-4 text-white font-bebas text-3xl leading-none">
          {car.price} 
        </p>
      </div>

      {/* Info — direita no desktop */}
      <div className="flex flex-col w-full sm:w-[45%] gap-3">

        <div>
          <p className="font-bebas text-3xl sm:text-6xl text-black leading-tight">{car.name}</p>
          <p className="text-black/40 text-sm">{car.year}</p>
        </div>

        {car.info.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {car.info.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] bg-black/6 text-black/55 rounded-full px-3 py-1 border border-black/8"
              >
                {tag}
              </span>
            ))}
          </div>
        )}


        {car.description ? 
        <>
        <div>Descrição</div>
        <p>{car.description}</p>
        </> : <></>}

        <CarActions
          name={car.name}
          year={car.year}
          price={car.price}
          src={car.src}
          description={car.description}
        />

      </div>
    </div>
  </div>
)
}