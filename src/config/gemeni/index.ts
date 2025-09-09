import { config } from 'dotenv'

config()

export const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY || 'No key'
