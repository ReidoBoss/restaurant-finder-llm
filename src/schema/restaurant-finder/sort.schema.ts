import { z } from 'zod'

export const SortSchema = z.enum([
  'RELEVANCE',
  'RATING',
  'DISTANCE',
  'POPULARITY',
])
