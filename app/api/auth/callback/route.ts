import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit, redis } from '@/app/utils/redis'


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    await supabase.auth.exchangeCodeForSession(code)

    
    //Gemini: salvar o novo ip
    const ip = request.headers.get('x-forwarded-for')
    const session = await supabase.auth.getSession()
    const email =  session.data.session?.user.email

    if (email) {
      await redis.sadd(`known_ips:${email}`, ip)
    }
  }

  return NextResponse.redirect(new URL('/admin/cars', request.url))
}