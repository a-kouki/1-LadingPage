'use client'
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,15}$/;

export default function Reset() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [honeypot, setHoneypot] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Validação em tempo real
    const passwordsMatch = confirmPassword === '' || newPassword === confirmPassword;
    const passwordIsStrong = newPassword === '' || passwordRegex.test(newPassword);

    async function resetPassword(e: React.FormEvent) {
        e.preventDefault()

        if (!passwordRegex.test(newPassword)) {
            toast.error('A senha deve ter entre 8 e 15 caracteres, com maiúsculas, minúsculas e números.')
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error('As senhas estão diferentes.')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/resetpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword, confirmPassword, honeypot }),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error('Erro ao atualizar senha')
                return
            }

            toast.success('Senha alterada com sucesso!')
            router.push('/login')

        } catch {
            toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex  items-center justify-center">
            <div className="flex flex-col w-full max-w-sm p-6">
                <h1 className="text-xl font-semibold mb-4 text-center">Redefinir senha</h1>

                <form onSubmit={resetPassword} className="flex flex-col gap-3">

                    {/* Honeypot — invisível para humanos, bots preenchem */}
                    <input
                        type="text"
                        name="bot_field"
                        value={honeypot}
                        onChange={e => setHoneypot(e.target.value)}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                    />

                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            name="passOne"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Nova senha"
                            maxLength={15}
                            required
                            autoFocus
                            disabled={loading}
                            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
                                ${!passwordIsStrong ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-300'}`}
                        />
                        {!passwordIsStrong && (
                            <span className="text-xs text-red-500">
                                Mínimo 8 caracteres, com maiúscula, minúscula e número.
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            name="passTwo"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Confirme a nova senha"
                            required
                            maxLength={15}
                            disabled={loading}
                            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
                                ${!passwordsMatch ? 'border-red-400 focus:ring-red-300' : 'focus:ring-blue-300'}`}
                        />
                        {!passwordsMatch && (
                            <span className="text-xs text-red-500">
                                As senhas não coincidem.
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 
                                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Aguarde...' : 'Confirmar'}
                    </button>

                </form>
            </div>
        </main>
    )
}