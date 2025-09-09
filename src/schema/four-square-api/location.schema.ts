import { z } from "zod"
import { StringSchema } from "../schema/common.schema"

export const LocationSchema = z.object({
  address: StringSchema,
  locality: StringSchema,
  region: StringSchema,
  postcode: StringSchema,
  admin_region: StringSchema,
  post_town: StringSchema,
  po_box: StringSchema,
  country: StringSchema,
  formatted_address: StringSchema,
})
