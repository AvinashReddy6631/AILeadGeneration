"use client"

import { useCallback, useEffect, useState } from 'react'
import type { Lead } from '@/types/lead'
import { apiRequest } from './useAuth'

type LeadInput = Pick<Lead, 'name' | 'email' | 'status'> & Partial<Pick<Lead, 'score'>>
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(async () => { setLoading(true); try { const data = await apiRequest<{ leads: Lead[] }>('/api/leads'); setLeads(data.leads); setError(null) } catch (e) { setError(e instanceof Error ? e.message : 'Unable to load leads') } finally { setLoading(false) } }, [])
  useEffect(() => { const timer = window.setTimeout(() => { void load() }, 0); return () => window.clearTimeout(timer) }, [load])
  const createLead = async (input: LeadInput) => { const { lead } = await apiRequest<{ lead: Lead }>('/api/leads', { method: 'POST', body: JSON.stringify(input) }); setLeads((items) => [lead, ...items]); return lead }
  const updateLead = async (id: string, input: Partial<LeadInput>) => { const { lead } = await apiRequest<{ lead: Lead }>(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify(input) }); setLeads((items) => items.map((item) => item.id === id ? lead : item)); return lead }
  const deleteLead = async (id: string) => { await apiRequest(`/api/leads/${id}`, { method: 'DELETE' }); setLeads((items) => items.filter((item) => item.id !== id)) }
  return { leads, isLoading, error, reload: load, createLead, updateLead, deleteLead }
}
