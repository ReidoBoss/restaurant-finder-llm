import { config } from 'dotenv'

config()

export const FSQR_API_KEY: string = process.env.FSQR_RESTAURANT_FINDER_KEY || ''
