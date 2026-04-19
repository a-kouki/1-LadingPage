import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {data: session} = await supabase.auth.getSession()

  if(!session) return redirect('/login')
  return <>{children}</>
}