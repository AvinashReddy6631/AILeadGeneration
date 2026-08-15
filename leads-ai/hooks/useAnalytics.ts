"use client"

import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from './useAuth'

type Analytics = { total: number; byStatus: { _id: string; count: number }[]; byPriority: { _id: string; count: number }[] }
export function useAnalytics() {
  const [data, setData] = useState<Analytics | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(async () => { setLoading(true); try { setData(await apiRequest<Analytics>('/api/analytics')); setError(null) } catch (e) { setError(e instanceof Error ? e.message : 'Unable to load analytics') } finally { setLoading(false) } }, [])
  useEffect(() => { const timer = window.setTimeout(() => { void load() }, 0); return () => window.clearTimeout(timer) }, [load])
  return { data, isLoading, error, reload: load }
}
