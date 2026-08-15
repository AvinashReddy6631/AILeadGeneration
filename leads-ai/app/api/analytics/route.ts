import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { requireUser } from '@/lib/auth'
import { Lead } from '@/lib/models/Lead'
import { errorResponse } from '@/lib/api/response'

export async function GET() {
  try { const user = await requireUser(); await connectToDatabase(); const [total, byStatus, byPriority] = await Promise.all([Lead.countDocuments({ userId: user._id }), Lead.aggregate([{ $match: { userId: user._id } }, { $group: { _id: '$status', count: { $sum: 1 } } }]), Lead.aggregate([{ $match: { userId: user._id } }, { $group: { _id: '$priority', count: { $sum: 1 } } }])]); return NextResponse.json({ total, byStatus, byPriority }) } catch (error) { return errorResponse(error) }
}
