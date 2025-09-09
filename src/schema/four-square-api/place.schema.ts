import { z } from 'zod'
import { StringSchema } from '../common.schema'
import { LocationSchema } from './location.schema'
import { CategorySchema } from './category.schema'
import { RatingSchema } from './rating.schema'
import { HourSchema } from './hours.schema'
import { PriceSchema } from './price.schema'

const NameSchema = StringSchema.brand('PlaceName')

export const PlaceSchema = z.object({
  name: NameSchema,
  location: LocationSchema,
  categories: CategorySchema.array(),
  rating: RatingSchema.nullish(),
  price: PriceSchema.nullish(),
  hours: HourSchema.nullish(),
})
