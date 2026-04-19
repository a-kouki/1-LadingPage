import Image from 'next/image'
import carsData from '@/app/data/info.json'
import { getRationclass } from '../lib/ratio'

import { CarActions } from './CarActions'
import { CarImgCoudinary } from './CarImageCloudinary'


const srcToIndex = Object.fromEntries(
  carsData.map((car, i) => [car.src, i])
)

export async function CarDetailNoModal({ params }: { params: Promise<{ id: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const { id } = await params
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
    
    <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row gap-6">

      <div className={`relative w-full sm:w-1/2 shrink-0 ${getRationclass(car.ratio)} rounded-2xl overflow-hidden`}>
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
          {car.price || 'Consulte o preço'}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:py-2 w-full sm:w-[45%]">
        <div>
          <p className="font-bebas text-4xl sm:text-6xl text-black leading-tight">{car.name}</p>
          <p className="text-black/40 text-sm">{car.year}</p>
        </div>

        {car.info.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {car.info.map((tag, i) => (
              <span key={i} className="text-[11px] bg-black/6 text-black/55 rounded-full px-3 py-1 border border-black/8">
                {tag}
              </span>
            ))}
          </div>
        )}

        {car.description && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-black/40 uppercase tracking-wide">Descrição</p>
            <p className="text-sm text-black/70 leading-relaxed">{car.description}</p>
          </div>
        )}

        
        <CarActions
          name={car.name}
          year={car.year}
          price={car.price}
          src={car.src}
          description={car.description}
        />
      </div>

    </div>
  )
}