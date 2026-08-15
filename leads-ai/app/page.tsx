import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">Leads AI</p>
        <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">A structured foundation for intelligent lead operations.</h1>
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">The application scaffold is ready for product workflows, secure APIs, and n8n orchestration.</p>
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground" href="/dashboard">Open dashboard</Link>
          <Link className="rounded-lg border border-border px-5 py-3 text-sm font-medium" href="/features">Explore architecture</Link>
        </div>
      </div>
    </main>
  )
}
