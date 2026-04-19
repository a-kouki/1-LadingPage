//import { auth } from '@/auth'
import { AdminTabs } from './_components/AdminTabs'
import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession() 
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <AdminTabs />
      {children}
    </div>
  )
}