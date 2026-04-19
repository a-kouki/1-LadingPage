'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)

  function close() {
    
    if (window.history.length > 1) {
      router.back() //Só router.back() desfaz a navegação do slot,
    } else {
      router.replace('/')
    }
   //router.push('/')
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) close()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-100
        bg-black/60 backdrop-blur-sm
        flex items-end sm:items-center justify-center
      "
    >
      <div className="
        relative bg-white w-[95%] sm:w-full max-h-[90vh] h-full sm:h-auto overflow-y-auto no-scrollbar sm:max-w-[1000px]
        sm:rounded-3xl rounded-t-3xl
        shadow-2xl p-6 pt-12 
      ">
        <button
          onClick={close}
          className="
            absolute top-4 right-4
            w-8 h-8 flex items-center justify-center
            rounded-full bg-black/8 hover:bg-black/15
            text-black/50 hover:text-black
            transition-all duration-150 font-bold
          "
          aria-label="Fechar"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}