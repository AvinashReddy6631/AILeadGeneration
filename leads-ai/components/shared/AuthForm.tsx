"use client"

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function AuthForm({ mode, showSuccess = false }: { mode: 'login' | 'register'; showSuccess?: boolean }) {
  const router = useRouter()
  const auth = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setPending(true)
    try {
      if (mode === 'login') {
        await auth.login(email, password)
        router.push('/dashboard')
        router.refresh()
      } else {
        await auth.register(name, email, password)
        router.push('/login?registered=1')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to authenticate')
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Leads AI</p>
          <h1 className="mt-2 text-3xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        </div>

        {showSuccess && <p role="status" className="text-sm text-primary">Account created successfully. Please log in.</p>}
        {mode === 'register' && (
          <label className="block text-sm">
            Name
            <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2" />
          </label>
        )}
        <label className="block text-sm">
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2" />
        </label>
        <label className="block text-sm">
          Password
          <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2" />
        </label>
        {mode === 'register' && (
          <label className="block text-sm">
            Confirm Password
            <input required minLength={8} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2" />
          </label>
        )}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button disabled={pending} className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-60">
          {pending ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? (
            <>Don&apos;t have an account? <Link href="/register" className="font-medium text-primary hover:underline">Create account</Link></>
          ) : (
            <>Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link></>
          )}
        </p>
      </form>
    </main>
  )
}
