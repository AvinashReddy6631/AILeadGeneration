import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/lib/models/User'
import { registerSchema } from '@/lib/validations/auth'
import { createSession, hashPassword, safeUser } from '@/lib/auth'
import { errorResponse } from '@/lib/api/response'

export async function POST(request: Request) {
  try {
    const data = registerSchema.parse(await request.json())
    await connectToDatabase()
    const exists = await User.exists({ email: data.email.toLowerCase() })
    if (exists) return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    const user = await User.create({ ...data, email: data.email.toLowerCase(), passwordHash: await hashPassword(data.password) })
    await createSession(user._id.toString())
    return NextResponse.json({ user: safeUser(user) }, { status: 201 })
  } catch (error) { return errorResponse(error) }
}
