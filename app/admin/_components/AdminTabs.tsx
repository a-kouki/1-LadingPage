'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from './SignOutButton'
import Image from 'next/image'

import { useState, useEffect } from 'react'


const tabs = [
  { label: 'Carros', href: '/admin/cars' },
  { label: 'Novo carro', href: '/admin/new' },
  { label: 'Mudar Senha', href: '/admin/reset' },
  
]

export function AdminTabs() {
  const pathname = usePathname()

  const [storage, setStorage] = useState<{
    usedMB: string
    availableGB: string
    maxGB: number
    percentUsed: string
  } | null>(null)

  async function loadStorage() {
    try {
      const res = await fetch('/api/storage')
      if (res.ok) setStorage(await res.json())
    } catch {
      // silencioso — não crítico
    }
  }

  useEffect(() => { 
    loadStorage() // ← carregar junto
  }, [])

  
  return (
    <>
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Painel</h1>
      <a href='/' className="flex items-center gap-2">
        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-black/10">
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
        
      </a>
      <SignOutButton />
    </div>
    {storage && (
  <div className="flex flex-col gap-1 border rounded-2xl p-4 bg-black/2">
    <div className="flex justify-between items-center">
      <p className="text-xs text-black/40">Armazenamento de imagens</p>
      <p className="text-xs text-black/40">
        {storage.usedMB}MB / {storage.maxGB}GB
      </p>
    </div>

    {/* Barra de progresso */}
    <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${
          Number(storage.percentUsed) > 80 ? 'bg-red-400' :
          Number(storage.percentUsed) > 50 ? 'bg-yellow-400' :
          'bg-green-400'
        }`}
        style={{ width: `${storage.percentUsed}%` }}
      />
    </div>

    <p className="text-xs text-black/40">
      {storage.availableGB}GB disponíveis
    </p>
  </div>
)}

    <nav className="flex gap-1 border-b">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`text-sm px-4 py-2 border-b-2 -mb-px transition-colors ${
            pathname === tab.href
              ? 'border-black text-black'
              : 'border-transparent text-black/40 hover:text-black'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
    </>
  )
}