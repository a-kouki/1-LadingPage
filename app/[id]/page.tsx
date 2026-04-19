// app/@modal/(.)carros/[id]/page.tsx
import { Modal } from '@/app/ui/Modal'
import { CarDetailNoModal } from '../ui/CarDetailNoModal'
import carsData from '@/app/data/info.json'
import { Metadata } from 'next'

import { Nav } from '../_components/Nav'
import { Products } from '../_components/Products'
import { Contact } from '../_components/Contact'

import { LoadingSkeleton } from './loading'
import { Suspense } from 'react'

const srcToIndex = Object.fromEntries(
  carsData.map((car, i) => [car.src, i])
)

const baseUrl = process.env.NEXTAUTH_URL

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const index = srcToIndex[id]
  const product = carsData[index]

  if (!product) {
    return {
      title: "Veículo Não Encontrado - Marcos Veículos",
      description: "O veículo solicitado não foi encontrado.",
      alternates: { canonical: baseUrl },
    }
  }

  return {
    title: `${product.name} - ${product.brand} | Marcos Veículos`,
    description: `${product.description} Preço: $${product.price}.`,
    keywords: [
      product.category,
      product.brand,
      product.name.toLowerCase(),
      "Marcos Veículos",
      "vendedor de carros em Rondonópolis",
      "carros seminovos Rondonópolis",
      "comprar carro em Rondonópolis",
      "Marcos Souza vendedor",
      "Fiat Strada",
      "Volkswagen Polo",
      "Chevrolet Onix",
      "carros usados MT",
      "financiamento de veículos",
      "compra e venda de carros"
    ],
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      type: "website",
      images: product.href ? [product.href] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
    alternates: {
      canonical: `${baseUrl}/${product.src}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <>
      <Nav/>
        <div className=" bg-bg-primary flex justify-center pt-0 sm:pt-5 pb-10 px-2 md:px-pxGloabl">
          <Suspense fallback={<LoadingSkeleton/>}>
            <CarDetailNoModal params={params} />
          </Suspense>
        </div>
      <Products/>
      <Contact/>
    </>
  )
}