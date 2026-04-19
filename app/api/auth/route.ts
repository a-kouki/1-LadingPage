/*
import SignJWT from 'jose'
import { cookies } from 'next/headers'

export async function POST(req:Request){
    const {password} = await req.json()

    if (password !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    const token = await new SignJWT({})
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime('7d')
        .sign(new TextEncoder().encode(process.env.JWT_SCRETE!))
    
     const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
        })

    return Response.json({ ok: true })   
}
    */