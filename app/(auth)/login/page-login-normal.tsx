'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function page() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn('credentials', {
      password,
      redirect: false,
    })

    if (res?.error) {
      toast.error("Erro ao Logar")
      setError(true)
      return
    }

    toast.success("Login feito com sucesso")
    window.location.href = '/admin/cars'
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold">Acesso admin</h1>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        {/*error && <p className="text-red-500 text-sm">Senha incorreta</p>*/}
        <button
          type="submit"
          className="bg-black text-white rounded-lg py-2"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
