import { z } from 'zod'
import { RestaurantParamsSchema } from '../schema/restaurant-finder/restaurant-params.schema'

export type RestaurantParams = z.infer<typeof RestaurantParamsSchema>
