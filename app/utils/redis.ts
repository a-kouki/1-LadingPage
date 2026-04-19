import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Criar um limitador que permite 5 tentativas por 15 minutos
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: 'ratelimit:login',
})

// Magic Link: máx 3 envios por hora por IP
export const magicLinkRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1h'),
  prefix: 'ratelimit:magic',  // chave separada do loginRateLimit
})

export const resetPasswordRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: 'ratelimit:resetPassword',
})