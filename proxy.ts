import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { protectAdmin } from "./app/lib/protect-admin";


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(15, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
  enableProtection: true,
});

export default async function proxy(
  request: NextRequest,
  context: NextFetchEvent,
): Promise<Response | undefined> {

  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    const protection = await protectAdmin(request) // ← await aqui
    if (protection) return protection;
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  const { success, limit, remaining, pending } = await ratelimit.limit(ip)
  await pending;
  context.waitUntil(pending);

  const res = success
    ? NextResponse.next()
    : new NextResponse("Too Many Requests", { status: 429 });

  res.headers.set("X-RateLimit-Success", success.toString());
  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|api/auth|api/next-auth).*)",
  ],
}