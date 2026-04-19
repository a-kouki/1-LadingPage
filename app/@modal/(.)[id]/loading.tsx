// loading.tsx

import { Modal } from "@/app/ui/Modal"

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">

        {/* Imagem */}
        <div className="relative w-full sm:w-[45%] aspect-[4/3] rounded-2xl bg-black/8 shrink-0" />

        {/* Info */}
        <div className="flex flex-col w-full sm:w-[45%] gap-3">

          {/* Nome + ano */}
          <div>
            <div className="h-10 sm:h-14 w-3/4 rounded-lg bg-black/8 mb-2" />
            <div className="h-3.5 w-1/4 rounded bg-black/6" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {[80, 96, 72, 88, 64].map((w, i) => (
              <div key={i} className={`h-6 w-[${w}px] rounded-full bg-black/6`} />
            ))}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <div className="h-3.5 w-1/3 rounded bg-black/8" />
            <div className="h-3.5 w-full rounded bg-black/6" />
            <div className="h-3.5 w-[90%] rounded bg-black/6" />
            <div className="h-3.5 w-[75%] rounded bg-black/6" />
          </div>

          {/* CarActions */}
          <div className="flex gap-2 mt-auto pt-2">
            <div className="h-10 flex-1 rounded-full bg-black/8" />
            <div className="h-10 flex-1 rounded-full bg-black/6" />
          </div>

        </div>
      </div>
    </div>
  )
}

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      fixed inset-0 z-100
      bg-black/60 backdrop-blur-sm
      flex items-end sm:items-center justify-center
    ">
      <div className="
        relative bg-white w-[95%] sm:w-full max-h-[90vh] h-full sm:h-auto overflow-y-auto no-scrollbar sm:max-w-[1000px]
        sm:rounded-3xl rounded-t-3xl
        shadow-2xl p-6 pt-12
      ">
        {children}
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    
    <ModalShell>
      <LoadingSkeleton />
    </ModalShell>
  )
}