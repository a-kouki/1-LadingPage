import { Modal } from '@/app/ui/Modal'
import { CarDetail } from '@/app/ui/CarDetail'
import carsData from '@/app/data/info.json'
import { Metadata } from 'next'

import { Suspense } from 'react'
import { LoadingSkeleton } from './loading'

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

export default async function Page({params}:{params:Promise<{id: string}>}) {

  return (
      <Modal>
          <Suspense fallback={<LoadingSkeleton />}>
            <CarDetail params={params}/>
          </Suspense>
      </Modal>
  )
}