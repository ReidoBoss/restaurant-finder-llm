import { PlaceSearchSchema } from '../schema/four-square-api/place-search.schema'
import { z } from 'zod'

export {}

declare global {
  type PlaceSearchResults = z.infer<typeof PlaceSearchSchema>
}
