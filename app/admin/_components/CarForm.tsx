'use client'
import { useState } from 'react'
import { toast } from 'sonner'

type Car = {
  name: string
  src: string
  year: string
  info: string[]
  price: string
  href: string
  public_id: string
  ratio: string
  description: string
  brand:string
  category:string
  inStock:string
}

const empty: Car = {
  name: '', src: '', year: '', info: [],
  price: '', href: '', public_id: '',
  ratio: '4x5', description: '', brand:'', category:'', inStock:''
}

const ratios = [
  { value: '1x1',    w: 1,    h: 1  },
  { value: '4x5',    w: 4,    h: 5  },
  { value: '1.91x1', w: 1.91, h: 1  },
  { value: '9x16',   w: 9,    h: 16 },
]

export function CarForm({ initial, index, onDone }: {
  initial?: Car
  index?: number
  onDone?: () => void
}) {
  const [car, setCar] = useState<Car>(initial ?? empty)
  const [tags, setTags] = useState(initial?.info.join(', ') ?? '')
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload')
  const [imageFile, setImageFile] = useState<File | null>(null) // ← guarda o arquivo
  const [preview, setPreview] = useState<string>(initial?.href ?? '') // ← preview local
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setCar(prev => ({ ...prev, [name]: value }))

    if (name === 'name') {
      setCar(prev => ({
        ...prev,
        name: value,
        src: value.toLowerCase().trim()
          .replace(/\s+/g, '-')
          .replace(/\//g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      }))
    }
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file);

    // Validação de tamanho no frontend
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Imagem muito grande. Máximo 10MB')
      return
    }

    setImageFile(file)

    // Preview local sem fazer upload ainda
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    /*
    if (imageMode === 'upload' && !imageFile && !car.href) {
      toast.error('Selecione uma imagem')
      return
    }*/

    setLoading(true)

    try {
      // ─── Monta FormData com tudo junto ───────────────
      const formData = new FormData()

      // Dados do carro como JSON dentro do FormData
      const payload = {
        ...car,
        info: tags.split(',').map(t => t.trim()).filter(Boolean),
      }
      formData.append('data', JSON.stringify(payload))

      // Arquivo de imagem (se modo upload e arquivo selecionado)
      if (imageMode === 'upload' && imageFile) {
        formData.append('file', imageFile)
      }

      const url = index !== undefined ? `/api/cars/${index}` : '/api/cars'
      const method = index !== undefined ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: formData })
      const result = await res.json()

      if (!res.ok) {
        toast.error(result.error ?? 'Erro ao salvar')
        return
      }

      toast.success(index !== undefined ? 'Carro atualizado!' : 'Carro adicionado!')
      onDone?.()

      if (index === undefined) {
        setCar(empty)
        setTags('')
        setImageFile(null)
        setPreview('')
      }
    } catch {
      toast.error('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-2xl p-5">
      <h2 className="font-semibold">
        {index !== undefined ? 'Editar carro' : 'Novo carro'}
      </h2>

      <input name="name" placeholder="Nome" value={car.name} 
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" required maxLength={60}/>

      <input name="src" placeholder="Slug (gerado automaticamente)" value={car.src}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm text-black/40" required maxLength={60}/>

      <input name="year" placeholder="Ano (ex: 2022/23)" value={car.year}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={10}/>

      <input name="price" placeholder="Preço (ex: R$ 63.990,00)" value={car.price}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={20}/>

      <input name="brand" placeholder="Marca (Toyota, Volkswagen, Fiat, etc...)" value={car.brand}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={40}/>
      
      <input name="category" placeholder="Categoria (Híbrido, Elétrico, Suv, Sedan, etc...)" value={car.category}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={40}/>
      
      <input name="inStock" placeholder="Em Estoque/ Em breve / Não Disponível" value={car.inStock}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={20}/>

      <input placeholder="Tags separadas por vírgula (ex: motor 1.8, Flex)"
        value={tags} onChange={e => setTags(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm" maxLength={200}/>

      <input name="description" placeholder="Descrição" value={car.description}
        onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" maxLength={200}/>

      {/* Ratio */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-black/40">Formato da imagem</p>
        <div className="flex gap-3 items-end">
          {ratios.map(r => {
            const maxH = 48
            const maxW = 48
            const scale = Math.min(maxW / r.w, maxH / r.h)
            const pw = Math.round(r.w * scale)
            const ph = Math.round(r.h * scale)
            const active = car.ratio === r.value
            return (
              <button key={r.value} type="button"
                onClick={() => setCar(prev => ({ ...prev, ratio: r.value }))}
                className={`flex flex-col items-center gap-1 transition-opacity ${active ? 'opacity-100' : 'opacity-35 hover:opacity-60'}`}
              >
                <div style={{ width: pw, height: ph }}
                  className={`rounded border-2 transition-colors ${active ? 'border-black bg-black/10' : 'border-black/30'}`}
                />
                <span className={`text-[10px] ${active ? 'text-black font-semibold' : 'text-black/40'}`}>
                  {r.value}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modo de imagem */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setImageMode('upload')}
          className={`text-sm px-3 py-1 rounded-full border ${imageMode === 'upload' ? 'bg-black text-white' : ''}`}>
          Upload
        </button>
        <button type="button" onClick={() => setImageMode('url')}
          className={`text-sm px-3 py-1 rounded-full border ${imageMode === 'url' ? 'bg-black text-white' : ''}`}>
          URL
        </button>
      </div>

      {imageMode === 'upload' ? (
        <label className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-gray-400 transition-colors bg-white">
            <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded px-2.5 py-1 whitespace-nowrap shrink-0">
              Escolher arquivo
            </span>
            <span className="text-sm text-gray-400 truncate" id="file-label">
              {selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
      ) : (
        <input name="href" placeholder="URL da imagem" value={car.href}
          onChange={handleChange} className="border rounded-lg px-3 py-2 text-sm" />
      )}

      {/* Preview */}
      {preview && (
        <img src={preview} alt="preview"
          className="w-full h-40 object-cover rounded-xl" />
      )}

      <button type="submit" disabled={loading}
        className="bg-black text-white rounded-xl py-2 text-sm mt-1 disabled:opacity-50">
        {loading ? 'Salvando...' : index !== undefined ? 'Salvar alterações' : 'Adicionar carro'}
      </button>
    </form>
  )
}