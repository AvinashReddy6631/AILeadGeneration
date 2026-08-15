import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const hasSession = Boolean(request.cookies.get('leads_ai_session')?.value)
  if (isDashboard && !hasSession) return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
