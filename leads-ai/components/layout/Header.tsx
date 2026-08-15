"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function Header() { const router = useRouter(); const { user, logout } = useAuth(); return <header className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6"><span className="font-semibold">Leads AI</span><div className="flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">{user?.name ?? user?.email ?? 'Account'}</span><button onClick={async () => { await logout(); router.push('/login'); router.refresh() }} className="text-sm text-muted-foreground hover:text-foreground">Log out</button></div></header> }
