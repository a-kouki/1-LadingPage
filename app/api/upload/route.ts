import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
//import { auth } from '@/auth'

import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@/app/utils/supabase/server'

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const MAX_USAGE_GB = 2

export async function POST(req: Request) {
  const supabase = await createClient()
  const {data: {user}}  = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Não autorizado' }, { status: 401 })

  const usage = await cloudinary.api.usage()
  const usedGB = usage.storage.usage / (1024 * 1024 * 1024)

  if(usedGB >= MAX_USAGE_GB) {
    return Response.json(
      {error : `Limite de ${MAX_USAGE_GB}GB atingido`},
      {status: 413}
    )
  }
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) return Response.json({ error: 'Nenhum arquivo' }, { status: 400 })
  
  const MAX_FILE_SIZE_MB = 10
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return Response.json(
      { error: `Imagem muito grande. Máximo ${MAX_FILE_SIZE_MB}MB` },
      { status: 413 }
    )
  }

  // Converter para buffer e fazer upload
  const byt = await file.arrayBuffer()
  const buffer = Buffer.from(byt)

   const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'marcos-veiculos',          
        transformation: [
          { quality: 'auto' },    // compressão automática
          { fetch_format: 'auto' } // converte para WebP automaticamente
        ]
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })

  // garante que a pasta existe
  /*
  const dir = join(process.cwd(), 'public/cars')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const ext = extname(file.name)
  const filename = `${Date.now()}${ext}`
  const bytes = await file.arrayBuffer()

  writeFileSync(join(dir, filename), Buffer.from(bytes))

  return Response.json({ href: `/cars/${filename}` })
  */

  return Response.json({
    //url: result.secure_url,
    public_id: result.public_id,
    usedGB: usedGB.toFixed(2)
  })
}


export async function DELETE(req: Request){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const {public_id} = await req.json()
  await cloudinary.uploader.destroy(public_id)

  return Response.json({ok: true})
}