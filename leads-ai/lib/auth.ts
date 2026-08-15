import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import { connectToDatabase } from './db'
import { User, type UserDocument } from './models/User'

function getKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not configured')
  return new TextEncoder().encode(secret)
}
const cookieName = 'leads_ai_session'

export async function hashPassword(password: string) { return bcrypt.hash(password, 12) }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash) }

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(getKey())
  const store = await cookies()
  store.set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
}

export async function clearSession() {
  const store = await cookies()
  store.set(cookieName, '', { httpOnly: true, expires: new Date(0), path: '/' })
}

export async function getCurrentUser(): Promise<UserDocument | null> {
  const token = (await cookies()).get(cookieName)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getKey())
    if (!payload.sub || !Types.ObjectId.isValid(payload.sub)) return null
    await connectToDatabase()
    return User.findById(payload.sub).select('+passwordHash')
  } catch { return null }
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) throw new Response('Unauthorized', { status: 401 })
  return user
}

export function safeUser(user: UserDocument) {
  return { id: user._id.toString(), name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt }
}
