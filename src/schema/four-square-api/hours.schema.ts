import { z } from 'zod'
import { BooleanSchema, NumberSchema, StringSchema } from '../common.schema'

// "hours": {
//   "display": "string",
//   "is_local_holiday": true,
//   "open_now": true,
//   "regular": [
//     {
//       "close": "string",
//       "day": 0,
//       "open": "string"
//     }
//   ]
// },

export const RegularOperatingHours = z.object({
  close: StringSchema,
  day: NumberSchema,
  open: StringSchema,
})

export const HourSchema = z.object({
  display: StringSchema,
  is_local_holiday: BooleanSchema,
  open_now: BooleanSchema,
  regular: RegularOperatingHours.array(),
})
