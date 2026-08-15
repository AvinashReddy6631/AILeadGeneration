"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useLeads } from '@/hooks/useLeads'
import { Loading } from '@/components/shared/Loading'
import { EmptyState } from '@/components/shared/EmptyState'

export default function LeadsPage() {
  const { leads, isLoading, error, deleteLead } = useLeads(); const [deleting, setDeleting] = useState<string | null>(null)
  if (isLoading) return <Loading />
  return <section className="space-y-6 p-6 md:p-8"><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Pipeline</p><h1 className="mt-2 text-3xl font-semibold">Leads</h1></div><Link href="/dashboard/leads/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Add lead</Link></div>{error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}{leads.length === 0 ? <EmptyState title="No leads yet" description="Add your first lead to start building your pipeline." /> : <div className="overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-border bg-muted/40"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4">Score</th><th className="p-4">Actions</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-b border-border last:border-0"><td className="p-4 font-medium">{lead.name}</td><td className="p-4 text-muted-foreground">{lead.email}</td><td className="p-4 capitalize">{lead.status}</td><td className="p-4">{lead.score ?? '—'}</td><td className="p-4"><div className="flex gap-3"><Link className="text-primary underline-offset-4 hover:underline" href={`/dashboard/leads/${lead.id}`}>View</Link><button disabled={deleting === lead.id} onClick={async () => { setDeleting(lead.id); try { await deleteLead(lead.id) } finally { setDeleting(null) } }} className="text-destructive disabled:opacity-50">{deleting === lead.id ? 'Deleting…' : 'Delete'}</button></div></td></tr>)}</tbody></table></div>}</section>
}
