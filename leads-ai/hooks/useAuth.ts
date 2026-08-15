"use client"

import { useCallback, useEffect, useState } from 'react'
import type { User } from '@/types/user'

type AuthState = { user: User | null; isLoading: boolean; error: string | null }

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) } })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error ?? 'Something went wrong')
  return body
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true, error: null })
  const refresh = useCallback(async () => {
    try { const { user } = await request<{ user: User }>('/api/auth/me'); setState({ user, isLoading: false, error: null }) }
    catch { setState({ user: null, isLoading: false, error: null }) }
  }, [])
  useEffect(() => { const timer = window.setTimeout(() => { void refresh() }, 0); return () => window.clearTimeout(timer) }, [refresh])
  const login = async (email: string, password: string) => { const { user } = await request<{ user: User }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setState({ user, isLoading: false, error: null }); return user }
  const register = async (name: string, email: string, password: string) => { const { user } = await request<{ user: User }>('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }); setState({ user, isLoading: false, error: null }); return user }
  const logout = async () => { await request('/api/auth/logout', { method: 'POST' }); setState({ user: null, isLoading: false, error: null }) }
  return { ...state, refresh, login, register, logout }
}

export async function apiRequest<T>(url: string, options?: RequestInit) { return request<T>(url, options) }
