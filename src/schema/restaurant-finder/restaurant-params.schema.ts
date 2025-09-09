import { StringSchema, NumberSchema, BooleanSchema } from '../common.schema'
import { z } from 'zod'
import { TelFormatSchema } from './tel-format.schema'
import { SortSchema } from './sort.schema'

export const RestaurantParamsSchema = z.object({
  query: StringSchema.optional(),
  radius: NumberSchema.max(100000).optional(),
  min_price: NumberSchema.min(1).max(4).optional(),
  max_price: NumberSchema.min(1).max(4).optional(),
  open_at: StringSchema.optional(),
  open_now: BooleanSchema.optional(),
  tel_format: TelFormatSchema.optional(),
  near: StringSchema.optional(),
  sort: SortSchema.optional(),
  limit: NumberSchema.min(1).max(4).optional(),
})
