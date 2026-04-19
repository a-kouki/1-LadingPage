// scripts/delete-mfa.ts
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function deleteMFA() {
  const { data: users } = await supabase.auth.admin.listUsers()

  for (const user of users.users) {
    console.log('Usuário:', user.email, '| ID:', user.id)
    console.log('Fatores:', user.factors)

    for (const factor of user.factors || []) {
      console.log(`Deletando fator ${factor.id}...`)

      // Usar fetch direto na API REST
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/admin/users/${user.id}/factors/${factor.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            apikey: SERVICE_ROLE_KEY,
          },
        }
      )

      console.log(res.ok ? '✅ Deletado!' : `❌ Erro: ${res.status} ${await res.text()}`)
    }
  }
}

deleteMFA()