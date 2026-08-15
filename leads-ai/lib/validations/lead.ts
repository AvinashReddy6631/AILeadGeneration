import { z } from 'zod'

const optionalText = z.string().trim().max(200).optional()
export const leadSchema = z.object({ name: z.string().trim().min(1).max(120), email: z.email(), phone: optionalText, company: optionalText, jobTitle: optionalText, source: z.string().trim().max(80).optional(), status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']).optional(), score: z.number().int().min(0).max(100).optional(), priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'HOT']).optional(), aiSummary: z.string().max(2000).optional(), aiRecommendation: z.string().max(2000).optional(), lastActivity: z.coerce.date().optional() })
export const leadUpdateSchema = leadSchema.partial()
