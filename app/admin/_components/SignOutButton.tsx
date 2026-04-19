'use client'
import { signOut } from './actions'

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-sm text-black/40 hover:text-black hover:cursor-pointer"
      >
        Sair
      </button>
    </form>
  )
}