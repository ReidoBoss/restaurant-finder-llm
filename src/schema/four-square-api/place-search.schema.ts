import { z } from "zod"
import { PlaceSchema } from "./place.schema"

export const PlaceSearchSchema = z.object({
  results: PlaceSchema.array(),
})
