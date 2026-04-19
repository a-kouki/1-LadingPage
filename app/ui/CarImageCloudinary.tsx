'use client'
import { CldImage } from 'next-cloudinary'

export function CarImgCoudinary({ public_id, name, clas, }: { public_id: string, name: string, clas:string }) {
    return (
    <CldImage
      src={public_id}
      fill
      className={clas}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
      alt={name}
    />
  )
}