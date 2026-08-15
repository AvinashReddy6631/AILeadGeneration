import mongoose, { Schema, type Model } from 'mongoose'

export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'] as const
export const LEAD_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'HOT'] as const

export interface LeadDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  name: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  source?: string
  status: typeof LEAD_STATUSES[number]
  score?: number
  priority: typeof LEAD_PRIORITIES[number]
  aiSummary?: string
  aiRecommendation?: string
  lastActivity?: Date
  createdAt: Date
  updatedAt: Date
}

const leadSchema = new Schema<LeadDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true, maxlength: 40 },
  company: { type: String, trim: true, maxlength: 120 },
  jobTitle: { type: String, trim: true, maxlength: 120 },
  source: { type: String, trim: true, maxlength: 80 },
  status: { type: String, enum: LEAD_STATUSES, default: 'NEW' },
  score: { type: Number, min: 0, max: 100 },
  priority: { type: String, enum: LEAD_PRIORITIES, default: 'MEDIUM' },
  aiSummary: { type: String, maxlength: 2000 },
  aiRecommendation: { type: String, maxlength: 2000 },
  lastActivity: Date,
}, { timestamps: true })

leadSchema.index({ userId: 1, createdAt: -1 })

export const Lead = (mongoose.models.Lead as Model<LeadDocument>) || mongoose.model<LeadDocument>('Lead', leadSchema)
