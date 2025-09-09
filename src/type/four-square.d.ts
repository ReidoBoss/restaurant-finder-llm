import { PlaceSearchSchema } from '../schema/four-square-api/place-search.schema'
import { z } from 'zod'

export type PlaceSearchResults = z.infer<typeof PlaceSearchSchema>
