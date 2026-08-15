import { z } from 'zod'

export const automationSchema = z.object({
  name: z.string().min(1),
})
