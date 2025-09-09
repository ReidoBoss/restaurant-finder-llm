import { config } from 'dotenv'

config()

export const FSQR_API_KEY: string = process.env.FSQR_RESTAURANT_FINDER_KEY || ''
export const X_PLACES_API_VERSION = '2025-06-17'
