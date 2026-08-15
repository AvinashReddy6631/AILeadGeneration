export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <main className="p-8"><h1 className="text-3xl font-semibold">Lead details</h1><p className="mt-3 text-muted-foreground">Placeholder for lead {id}.</p></main>
}
