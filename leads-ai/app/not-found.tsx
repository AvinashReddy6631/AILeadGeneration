import Link from 'next/link'

export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center"><h1 className="text-4xl font-semibold">Page not found</h1><p className="text-muted-foreground">This Leads AI route has not been implemented yet.</p><Link className="text-primary underline underline-offset-4" href="/">Return home</Link></main>
}
