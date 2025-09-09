import { z } from 'zod'
import { StringSchema } from '../common.schema'

const CategoryName = StringSchema.brand('CategoryName')

export const CategorySchema = z.object({
  name: CategoryName,
})
