import { z } from 'zod'

export const TelFormatSchema = z.enum(['NATIONAL', 'E164'])
