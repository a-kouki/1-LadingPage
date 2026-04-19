import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit, redis } from '@/app/utils/redis'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'
  const isBlacklisted = await redis.get(`blacklist:${ip}`)
  if (isBlacklisted) {
    return NextResponse.json({ blocked: true }, { status: 403 })
  }

  const { success } = await loginRateLimit.limit(ip)
  if (!success) {
    return NextResponse.json({ blocked: true }, { status: 429 })
  }

  return NextResponse.json({ ok: true })
}