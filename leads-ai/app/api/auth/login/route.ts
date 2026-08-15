import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/lib/models/User'
import { loginSchema } from '@/lib/validations/auth'
import { createSession, safeUser, verifyPassword } from '@/lib/auth'
import { errorResponse } from '@/lib/api/response'

export async function POST(request: Request) {
  try {
    const data = loginSchema.parse(await request.json())
    await connectToDatabase()
    const user = await User.findOne({ email: data.email.toLowerCase() }).select('+passwordHash')
    if (!user || !(await verifyPassword(data.password, user.passwordHash))) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    await createSession(user._id.toString())
    return NextResponse.json({ user: safeUser(user) })
  } catch (error) { return errorResponse(error) }
}
