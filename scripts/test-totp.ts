//npx tsx scripts/test-totp.ts 111111
import { authenticator } from "@otplib/preset-default"
import 'dotenv/config'

const secret = process.env.ADMIN_TOTP_SECRET!
//const secret = ""
console.log(secret)
const codigoDoApp = process.argv[2] 

if (!codigoDoApp) {
  console.log('Uso: npx tsx scripts/test-totp.ts 123456')
  process.exit(1)
}

const isValid = authenticator.verify({ token: codigoDoApp, secret })

console.log(isValid ? '✅ Código válido!' : '❌ Código inválido')