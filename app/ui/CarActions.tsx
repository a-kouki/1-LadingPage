// components/CarActions.tsx
'use client'

type Props = { name: string; year: string; price: string; src: string; description: string }

export function CarActions({ name, year, price, src, description }: Props) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  return (
    <div className="flex items-center justify-center gap-3 z-100 w-full">
      <a
        href={`https://wa.me/556699333085?text=${encodeURIComponent(
          `Olá! Tenho interesse nesse veículo:\n\n*${name}*\n${year} • ${price}\n\n${baseURL}/${src}`
        )}`}
        target="_blank"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2 text-[13px] font-semibold mt-1"
      >
        Tenho interesse
      </a>

      {/* Botão Compartilhar */}
    <div 
        onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            navigator.share({ title: name, url: src, text: description })
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
  )
}