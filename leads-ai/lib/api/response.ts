import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) return NextResponse.json({ error: 'Validation failed', details: error.flatten().fieldErrors }, { status: 400 })
  if (error instanceof Response) return NextResponse.json({ error: error.status === 401 ? 'Authentication required' : 'Request failed' }, { status: error.status })
  console.error('[v0] API error', error)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
