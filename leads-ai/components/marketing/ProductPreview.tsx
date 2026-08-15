"use client"

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, BarChart3, CheckCircle2, CircleAlert, Inbox, RefreshCw, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLeads } from '@/hooks/useLeads'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Skeleton } from '@/components/ui/skeleton'

function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center"><span className="grid size-11 place-items-center rounded-full border border-border bg-muted text-muted-foreground"><Inbox /></span><p className="font-medium">{title}</p><p className="max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>{action}</div>
}

export function ProductPreview() {
  const { user, isLoading: authLoading } = useAuth()
  const { leads, isLoading: leadsLoading, error: leadsError, reload: reloadLeads } = useLeads()
  const { data: analytics, isLoading: analyticsLoading, error: analyticsError, reload: reloadAnalytics } = useAnalytics()
  const isLoading = authLoading || leadsLoading || analyticsLoading
  const error = leadsError || analyticsError

  if (authLoading) return <div className="surface grid gap-4 rounded-2xl p-5 md:p-7"><Skeleton className="h-5 w-32" /><Skeleton className="h-10 w-56" /><Skeleton className="h-32 w-full" /></div>
  if (!user) return <div className="surface relative overflow-hidden rounded-2xl p-5 md:p-7"><div className="flex items-center justify-between border-b border-border pb-5"><div><p className="font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Workspace preview</p><p className="mt-2 text-lg font-semibold">Your pipeline, in focus.</p></div><Sparkles className="text-accent" /></div><EmptyState title="Your pipeline is ready." description="Sign in to see your personalized leads, analytics, and workspace activity." action={<Link href="/login" className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Log in <ArrowRight className="size-4" /></Link>} /></div>
  if (error) return <div className="surface rounded-2xl p-7"><div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center"><CircleAlert className="text-destructive" /><p className="font-medium">Something went wrong.</p><p className="text-sm text-muted-foreground">Unable to load your pipeline right now.</p><button onClick={() => { void reloadLeads(); void reloadAnalytics() }} className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm hover:bg-muted"><RefreshCw className="size-4" /> Try again</button></div></div>
  if (isLoading) return <div className="surface grid gap-4 rounded-2xl p-5 md:p-7"><Skeleton className="h-5 w-32" /><Skeleton className="h-10 w-56" /><Skeleton className="h-32 w-full" /></div>
  return <div className="surface overflow-hidden rounded-2xl"><div className="flex items-center justify-between border-b border-border p-5 md:p-7"><div><p className="font-mono text-xs uppercase tracking-[.18em] text-accent">Welcome back, {user.name.split(' ')[0]}</p><p className="mt-2 text-lg font-semibold">Here&apos;s what&apos;s happening in your pipeline.</p></div><Link href="/dashboard" className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:flex">Open workspace <ArrowRight className="size-4" /></Link></div>{leads.length === 0 ? <EmptyState title="Your workspace is ready." description="Add your first lead to start building your pipeline." action={<Link href="/dashboard/leads/new" className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Add your first lead <ArrowRight className="size-4" /></Link>} /> : <><div className="grid gap-px border-b border-border bg-border sm:grid-cols-3"><div className="bg-card p-5"><p className="text-sm text-muted-foreground">Total leads</p><p className="mt-2 text-3xl font-semibold">{analytics?.total ?? leads.length}</p></div><div className="bg-card p-5"><p className="text-sm text-muted-foreground">Statuses tracked</p><p className="mt-2 text-3xl font-semibold">{analytics?.byStatus.length ?? 0}</p></div><div className="bg-card p-5"><p className="text-sm text-muted-foreground">Priorities tracked</p><p className="mt-2 text-3xl font-semibold">{analytics?.byPriority.length ?? 0}</p></div></div><div className="p-5 md:p-7"><div className="mb-4 flex items-center justify-between"><p className="font-medium">Recent leads</p><BarChart3 className="size-4 text-muted-foreground" /></div><div className="grid gap-2">{leads.slice(0, 4).map((lead) => <div key={lead.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{lead.name}</p><p className="truncate text-xs text-muted-foreground">{lead.email}</p></div><span className="ml-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="size-3.5 text-accent" /> {lead.status}</span></div>)}</div></div></>}</div>
}

export default ProductPreview
