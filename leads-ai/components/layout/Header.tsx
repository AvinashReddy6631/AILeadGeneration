"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leads', href: '/dashboard/leads' },
  { label: 'Analytics', href: '/dashboard/analytics' },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = window.localStorage.getItem('leads-ai-theme') as 'light' | 'dark' | null
    return saved ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('leads-ai-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    window.localStorage.setItem('leads-ai-theme', next)
    document.documentElement.classList.toggle('light', next === 'light')
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  async function handleLogout() {
    await logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto flex h-[58px] w-full max-w-[1100px] items-center rounded-full border px-2 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled ? 'border-black/10 bg-white/92 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/88' : 'border-black/[0.08] bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72'}`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2 px-3 text-sm font-bold tracking-tight text-zinc-950 focus-visible:outline-none dark:text-white">
          <span className="grid size-7 place-items-center rounded-full bg-[#5227FF] text-[11px] font-bold text-white">L</span>
          LEADS AI
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link key={link.href} href={link.href} className="relative rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-white">
                {active && <motion.span layoutId="active-nav-pill" className="absolute inset-0 -z-10 rounded-full bg-zinc-100" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                <span className={active ? 'text-zinc-950 dark:text-zinc-950' : ''}>{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {user ? (
              <>
                <span className="max-w-24 truncate px-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">{user.name || user.email}</span>
                <button type="button" onClick={handleLogout} className="rounded-full px-3 py-2 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none dark:hover:bg-white/10 dark:hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-full px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:outline-none dark:text-zinc-300 dark:hover:text-white">Login</Link>
                <Link href="/register" className="rounded-full bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-none dark:bg-white dark:text-zinc-950">Get Started</Link>
              </>
            )}
          </div>
          <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className="grid size-10 place-items-center rounded-full text-zinc-600 transition-transform hover:scale-105 hover:bg-zinc-100 focus-visible:outline-none dark:text-zinc-300 dark:hover:bg-white/10">
            {theme === 'dark' ? <Sun className="size-[17px]" /> : <Moon className="size-[17px]" />}
          </button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 focus-visible:outline-none md:hidden dark:text-zinc-200 dark:hover:bg-white/10">
            {menuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className="absolute inset-x-0 top-[66px] rounded-3xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/95 md:hidden">
              <div className="flex flex-col gap-1">
                {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`rounded-2xl px-4 py-3 text-sm font-medium ${isActive(pathname, link.href) ? 'bg-zinc-100 text-zinc-950 dark:bg-white dark:text-zinc-950' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10'}`}>{link.label}</Link>)}
                <div className="my-1 h-px bg-zinc-200 dark:bg-white/10" />
                {user ? <button type="button" onClick={handleLogout} className="flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"><LogOut className="size-4" /> Logout</button> : <div className="flex gap-2 p-1"><Link href="/login" className="flex-1 rounded-2xl px-4 py-3 text-center text-sm font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10">Login</Link><Link href="/register" className="flex-1 rounded-2xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Get Started</Link></div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
