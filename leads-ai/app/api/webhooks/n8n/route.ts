import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'n8n webhook placeholder' }, { status: 501 })
}
