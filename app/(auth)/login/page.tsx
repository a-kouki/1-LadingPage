'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/app/utils/supabase/client'

export default function AdminLogin() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [magicEmail, setMagicEmail] = useState('')
  const [totpCode, setTotpCode]   = useState('')
  const [honeypot, setHoneypot]   = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isBlocked, setIsBlocked] = useState(false)
  const [step, setStep]           = useState<'login' | 'totp'>('login')

  const router   = useRouter()
  const supabase = createClient()

  // ── Verificação inicial de IP/blacklist ──────────────────────
  useEffect(() => {
    async function initialCheck() {
      try {
        const res = await fetch('/api/auth/pre-check', { method: 'GET' })
        if (!res.ok) setIsBlocked(true)
      } finally {
        setIsLoading(false)
      }
    }
    initialCheck()
  }, [])

  // ── 1. Login com senha ───────────────────────────────────────
  async function handleCredentials(e: React.FormEvent) {
  e.preventDefault()

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, honeypot }),
    })

    const data = await res.json()

    if (res.status === 403 && data.mustUseMagicLink) {
      toast.info('IP desconhecido. Enviamos um Magic Link para seu e-mail.')
      await sendMagicLink()
      return
    }

    if (!res.ok) {
      if (res.status === 403) setIsBlocked(true)
      toast.error('Erro ao fazer login.')
      return
    }

    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
      setStep('totp')
      return
    }

    toast.success('Login feito com sucesso!')
    router.refresh()
    router.push('/admin/cars')

  } catch {
    toast.error('Erro de conexão.')
  }
}

/*
  // ── 2. Verificar TOTP ────────────────────────────────────────
  async function handleTOTP(e: React.FormEvent) {
    e.preventDefault()

    const { data: factors } = await supabase.auth.mfa.listFactors()
    const totpFactor = factors?.totp?.[0]

    if (!totpFactor) {
      toast.error('Nenhum fator TOTP cadastrado.')
      return
    }

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId: totpFactor.id })

    if (challengeError) {
      toast.error('Erro ao criar challenge TOTP.')
      return
    }

    const { error } = await supabase.auth.mfa.verify({
      factorId:    totpFactor.id,
      challengeId: challenge.id,
      code:        totpCode,
    })

    if (error) {
      toast.error('Código 2FA inválido.')
      return
    }

    toast.success('Login feito com sucesso!')
    router.push('/admin/cars')
  }
*/

  // ── 3. Magic Link ────────────────────────────────────────────
  async function sendMagicLink() {
    try{
      const res = await fetch('/api/auth/magic-link', {method: 'POST'})
      const data = await res.json()

      if(!res.ok){
        toast.error('Erro ao enviar o Link.')
        return
      }
      toast.success('Link enviado! Verifique seu e-mail.')
    }
    catch{
      toast.error('Erro de conexão.')
    }

  }


  // ── Tela de bloqueio ─────────────────────────────────────────
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-400">Verificando acesso...</p>
      </main>
    )
  }

  if (isBlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="text-center p-8 border border-red-200 rounded-xl bg-white shadow-lg">
          <h1 className="text-xl font-bold text-red-600">Acesso Restrito</h1>
          <p className="text-gray-600 mt-2">
            Este dispositivo foi bloqueado por múltiplas tentativas falhas ou atividade suspeita.
          </p>
          <p className="text-sm text-gray-400 mt-4">Contate o administrador do sistema.</p>
        </div>
      </main>
    )
  }

  // ── UI principal ─────────────────────────────────────────────
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-6 w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold">Acesso admin</h1>

        {step === 'login' && (
          <>
            {/* Formulário de senha */}
            <form onSubmit={handleCredentials} className="flex flex-col gap-3">

              {/* Honeypot — invisível para humanos, bots preenchem */}
              <input
                type="text"
                name="bot_field"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded-lg px-4 py-2"
                required
              />
              <button type="submit" className="bg-black text-white rounded-lg py-2 hover:cursor-pointer">
                Entrar
              </button>
            </form>

            <div className="text-center text-sm text-gray-400">ou</div>

            {/* Formulário de Magic Link */}
              <button
                onClick={sendMagicLink}
                type="submit"
                className="w-ful rounded-lg py-2 hover:cursor-pointer"
              >
                Entrar com Link
              </button>
          </>
        )}

        
        {/* Formulário de TOTP */}
        {/*step === 'totp' && (
          <form onSubmit={handleTOTP} className="flex flex-col gap-3">
            <p className="text-sm text-gray-500">
              Digite o código do seu app autenticador:
            </p>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Código 6 dígitos"
              value={totpCode}
              onChange={e => setTotpCode(e.target.value)}
              className="border rounded-lg px-4 py-2"
              maxLength={6}
              autoFocus
              required
            />
            <button type="submit" className="bg-black text-white rounded-lg py-2">
              Verificar
            </button>
            <button
              type="button"
              onClick={() => setStep('login')}
              className="text-sm text-gray-400 underline"
            >
              Voltar
            </button>
          </form>
        )*/}
        
        
      </div>
    </main>
  )
}