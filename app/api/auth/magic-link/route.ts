import { NextRequest, NextResponse } from 'next/server'
import { magicLinkRateLimit, redis } from '@/app/utils/redis'
import { createClient } from '@/app/utils/supabase/server'

const admin_email = process.env.ADMIN_EMAIL ?? ''

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'

  // ── 1. Blacklist ─────────────────────────────────────────────
  if (await redis.get(`blacklist:${ip}`)) {
    return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
  }

  // ── 2. Rate limit específico para Magic Link ──────────────────
  //    Mais restritivo — evita spam de e-mails
  const { success } = await magicLinkRateLimit.limit(ip)
  if (!success) {
    return NextResponse.json(
      { error: 'Muitas solicitações. Aguarde.' },
      { status: 429 }
    )
  }

  // ── 3. E-mail vem do ambiente, não do cliente ────────────────
  if (!admin_email) {
    return NextResponse.json({ error: 'Erro de configuração.' }, { status: 500 })
  }

  // ── 4. Envia Magic Link ───────────────────────────────────────
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email: admin_email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: 'Erro ao enviar o Link.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
