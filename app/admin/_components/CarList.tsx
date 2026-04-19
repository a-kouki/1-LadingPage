'use client'
import { useEffect, useState } from 'react'
import { CarForm } from './CarForm'
import { ConfirmModal } from './ConfirmExcluseModal'
import { toast } from 'sonner'
import { refresh } from 'next/cache'

import { CarImgCoudinary } from '@/app/ui/CarImageCloudinary'

type Car = { 
  name: string; 
  src: string; 
  year: string; 
  price: string; 
  href: string; 
  info: string[], 
  ratio: string, 
  description: string, 
  public_id:string,
  brand:string,
  category:string,
  inStock:string,
}

export function CarList() {
  const [cars, setCars] = useState<Car[]>([])
  const [editing, setEditing] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/cars')
      if (!res.ok) throw new Error()
      setCars(await res.json())
    } catch {
      toast.error('Erro ao carregar carros.')
    } finally {
      setLoading(false)
    }
  }

  async function deleteCar(index: number) {
    setConfirmIndex(null)
    setDeleting(index)
    try {
      const res = await fetch(`/api/cars/${index}`, 
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: cars[index]?.public_id ?? '' }),
         }
      )
      if (!res.ok) throw new Error()
      toast.success('Carro excluído.')
      //refresh()
      //await load()
    } catch {
      toast.error('Erro ao excluir.')
    } finally {
      setDeleting(null)
    }
  }

  useEffect(() => { load() }, [])

  if (loading && cars.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Carros cadastrados</h2>
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 border rounded-2xl p-3 animate-pulse">
              <div className="w-16 h-12 bg-black/8 rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 bg-black/8 rounded w-2/3" />
                <div className="h-3 bg-black/8 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {confirmIndex !== null && (
        <ConfirmModal
          message={`Excluir "${cars[confirmIndex]?.name}"? Essa ação não pode ser desfeita.`}
          onConfirm={() => deleteCar(confirmIndex)}
          onCancel={() => setConfirmIndex(null)}
        />
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Carros cadastrados</h2>
          {loading && <span className="text-xs text-black/40">Atualizando...</span>}
        </div>

        {cars.length === 0 && (
          <p className="text-sm text-black/40 py-4 text-center">Nenhum carro cadastrado.</p>
        )}

        {cars.map((car, i) => (
          <div key={i}>
            {editing === i ? (
              <CarForm initial={car} index={i} onDone={() => { setEditing(null); load() }} />
            ) : (
              <div className="flex justify-between gap-3 border rounded-2xl p-3">
                <div onClick={() => setEditing(i)}  className="flex items-center gap-3">

                    {car.public_id ? 
                         <div className="relative w-16 h-12 shrink-0">
                        <CarImgCoudinary
                          public_id={car.public_id} 
                          name={car.name}
                          clas={`w-16 h-12 object-cover rounded-lg shrink-0`}
                        />
                        </div>
                        : 
                        <img
                          src={`/favicon.png`}
                          alt="Marcos Veículos Rondonópolis"
                          loading="lazy"
                          className="w-16 h-12 object-cover rounded-lg shrink-0"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    }
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{car.name}</p>
                    <p className="text-xs text-black/40">{car.year} · {car.price || 'Sem preço'}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <button
                    onClick={() => setEditing(i)}
                    className="text-xs text-black/40 hover:text-black px-2 shrink-0 hover:cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setConfirmIndex(i)}
                    disabled={deleting === i}
                    className="text-xs text-red-400 hover:text-red-600 px-2 shrink-0 disabled:opacity-50 hover:cursor-pointer"
                  >
                    {deleting === i ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}