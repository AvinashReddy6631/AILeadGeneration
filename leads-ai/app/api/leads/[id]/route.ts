import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { connectToDatabase } from '@/lib/db'
import { requireUser } from '@/lib/auth'
import { Lead } from '@/lib/models/Lead'
import { leadUpdateSchema } from '@/lib/validations/lead'
import { errorResponse } from '@/lib/api/response'

type Context = { params: Promise<{ id: string }> }
async function findOwned(id: string, userId: unknown) { if (!Types.ObjectId.isValid(id)) return null; await connectToDatabase(); return Lead.findOne({ _id: id, userId }) }

export async function GET(_: Request, { params }: Context) { try { const user = await requireUser(); const { id } = await params; const lead = await findOwned(id, user._id); if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 }); const result = lead.toObject(); return NextResponse.json({ lead: { ...result, id: lead._id.toString(), userId: undefined } }) } catch (error) { return errorResponse(error) } }
export async function PUT(request: Request, { params }: Context) { try { const user = await requireUser(); const { id } = await params; const data = leadUpdateSchema.parse(await request.json()); const lead = await findOwned(id, user._id); if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 }); Object.assign(lead, data); await lead.save(); const result = lead.toObject(); return NextResponse.json({ lead: { ...result, id: lead._id.toString(), userId: undefined } }) } catch (error) { return errorResponse(error) } }
export async function DELETE(_: Request, { params }: Context) { try { const user = await requireUser(); const { id } = await params; const result = await Lead.deleteOne({ _id: id, userId: user._id }); if (!result.deletedCount) return NextResponse.json({ error: 'Lead not found' }, { status: 404 }); return NextResponse.json({ success: true }) } catch (error) { return errorResponse(error) } }
