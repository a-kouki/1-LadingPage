// /[id]/not-found.tsx
//usa como notFound() importado como import { notFound } from 'next/navigation'

export default function NotFound() {
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