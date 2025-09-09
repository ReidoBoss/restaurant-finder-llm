import { z } from 'zod'
import { StringSchema } from '../common.schema'

export const LocationSchema = z.object({
  address: StringSchema.optional(),
  locality: StringSchema.optional(),
  region: StringSchema.optional(),
  postcode: StringSchema.optional(),
  admin_region: StringSchema.optional(),
  post_town: StringSchema.optional(),
  po_box: StringSchema.optional(),
  country: StringSchema.optional(),
  formatted_address: StringSchema.optional(),
})
