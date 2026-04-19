// scripts/check-mfa.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://qhhgryokquvpyrqjvdbd.supabase.co"
const SERVICE_ROLE_KEY = "sb_publishable_6NOQheoJmoxkNqIrbtco7w_y4rHwl3S"

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function checkMFA() {
  const { data: users } = await supabase.auth.admin.listUsers()

  for (const user of users.users) {
    console.log('─────────────────────────')
    console.log('Email:', user.email)
    console.log('ID:', user.id)
    console.log('Fatores:', JSON.stringify(user.factors, null, 2))
  }
}

checkMFA()