// scripts/generate-totp.ts
//npm install @otplib/preset-default
//npx tsx scripts/generate-totp.ts
import { authenticator } from "@otplib/preset-default"

const secret = authenticator.generateSecret()
const uri = authenticator.keyuri('koukitech5@gmail.com', 'MeuApp Admin', secret)

console.log('Secret:', secret)
console.log('URI para QR Code:', uri)