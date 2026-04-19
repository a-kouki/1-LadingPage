import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@/app/utils/supabase/server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const filePath = join(process.cwd(), 'app/data/info.json')

function readCars() {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

function writeCars(cars: unknown[]) {
  writeFileSync(filePath, JSON.stringify(cars, null, 2))
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Não autorizado' }, { status: 401 })

  const formData = await req.formData()
  const data = formData.get('data') as string
  const file = formData.get('file') as File | null

  if (!data) return Response.json({ error: 'Dados inválidos' }, { status: 400 })

  const updated = JSON.parse(data)
  const { id } = await params
  const cars = readCars()
  const existing = cars[parseInt(id)]

  if (file) {
    // Deletar imagem antiga do Cloudinary
    if (existing?.public_id) {
      await cloudinary.uploader.destroy(existing.public_id)
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'marcos-veiculos',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    updated.public_id = result.public_id
  }

  cars[parseInt(id)] = updated
  writeCars(cars)

  return Response.json({ ok: true })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const {data: user} = await supabase.auth.getUser()
  if(!user) return Response.json({error: 'Não autorizado'}, {status: 401})
    
  let public_id = ''
  try {
    const body = await req.json()
    public_id = body.public_id ?? ''
  } catch {
    // body vazio ou inválido — ignora
  }

  if (public_id) {
    await cloudinary.uploader.destroy(public_id)
  }

  const { id } = await params
  const cars = readCars()
  cars.splice(parseInt(id), 1)
  writeCars(cars)

  return Response.json({ ok: true })
}