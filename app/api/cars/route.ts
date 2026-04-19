import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@/app/utils/supabase/server'


const limits: Record<string, number> = {
  name: 60,
  src: 60,
  year: 10,
  price: 20,
  brand: 40,
  category: 40,
  inStock: 20,
  description: 200,
}


const filePath = join(process.cwd(), '/app/data/info.json')

function readCars() {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

function writeCars(cars: unknown[]) {
  writeFileSync(filePath, JSON.stringify(cars, null, 2))
}

export async function GET() {
  return Response.json(readCars())
}

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_USAGE_GB = 2


export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Não autorizado' }, { status: 401 })

  const formData = await req.formData()
  const data = formData.get('data') as string
  const file = formData.get('file') as File | null

  if (!data) return Response.json({ error: 'Dados inválidos' }, { status: 400 })

  const car = JSON.parse(data)

  if(!car.name || !car.src) return Response.json({ error: 'Dados inválidos' }, { status: 400 })
  
  for (const [field, max] of Object.entries(limits)) {
    if (typeof car[field] === 'string' && car[field].length > max) {
      return Response.json({ error: `Dados inválidos` }, { status: 400 })
    }
  }

  // info separado pois é array
  if (!Array.isArray(car.info) || car.info.length > 10) {
    return Response.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  if (file) {
    const usage = await cloudinary.api.usage()
    const usedGB = usage.storage.usage / (1024 * 1024 * 1024)
    if (usedGB >= MAX_USAGE_GB) {
      return Response.json({ error: `Limite de ${MAX_USAGE_GB}GB atingido` }, { status: 413 })
    }

    // Verificar tamanho
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'Imagem muito grande. Máximo 10MB' }, { status: 413 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'marcos-veiculos',
          /*
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
          */
          eager: [
          {
            quality: 'auto:low',
            fetch_format: 'webp',
            width: 1200,
            crop: 'limit',        // nunca aumenta, só reduz
          }
          ],
          eager_async: false,       // aguarda a transformação antes de retornar
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    //car.href = result.secure_url
    car.public_id = result.public_id
  }

  const cars = readCars()
  cars.push(car)
  writeCars(cars)

  return Response.json({ ok: true })
}