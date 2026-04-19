'use client'

import { useRef } from "react"

type Props = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onCancel()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
        <p className="text-sm text-black/70">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="text-sm px-4 py-2 rounded-xl border hover:bg-black/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="text-sm px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}