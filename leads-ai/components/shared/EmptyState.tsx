export function EmptyState({ title = 'Nothing here yet', description = 'There is no data to show.' }: { title?: string; description?: string }) {
  return <section className="rounded-xl border border-dashed border-border p-8 text-center"><h2 className="font-medium">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{description}</p></section>
}
