import { StringSchema, NumberSchema, BooleanSchema } from '../common.schema'
import { z } from 'zod'
import { TelFormatSchema } from './tel-format.schema'
import { SortSchema } from './sort.schema'

export const RestaurantParamsSchema = z.object({
  query: StringSchema.nullish(),
  radius: NumberSchema.max(100000).nullish(),
  min_price: NumberSchema.min(1).max(4).nullish(),
  max_price: NumberSchema.min(1).max(4).nullish(),
  open_at: StringSchema.nullish(),
  open_now: BooleanSchema.nullish(),
  tel_format: TelFormatSchema.nullish(),
  near: StringSchema.nullish(),
  sort: SortSchema.nullish(),
  limit: NumberSchema.min(1).max(4).nullish(),
})
