import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function DashboardShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background"><div className="flex min-h-screen"><Sidebar /><div className="min-w-0 flex-1"><Header /><main className="pt-24">{children}</main></div></div></div>
}
