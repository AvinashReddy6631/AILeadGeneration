import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { requireUser } from '@/lib/auth'
import { Lead } from '@/lib/models/Lead'
import { leadSchema } from '@/lib/validations/lead'
import { errorResponse } from '@/lib/api/response'

export async function GET() {
  try { const user = await requireUser(); await connectToDatabase(); const leads = await Lead.find({ userId: user._id }).sort({ createdAt: -1 }).lean(); return NextResponse.json({ leads: leads.map((lead) => { const safeLead = { ...lead }; delete safeLead.userId; return { ...safeLead, id: lead._id.toString() } }) }) } catch (error) { return errorResponse(error) }
}

export async function POST(request: Request) {
  try { const user = await requireUser(); const data = leadSchema.parse(await request.json()); await connectToDatabase(); const lead = await Lead.create({ ...data, userId: user._id }); const result = lead.toObject(); return NextResponse.json({ lead: { ...result, id: lead._id.toString(), userId: undefined } }, { status: 201 }) } catch (error) { return errorResponse(error) }
}
