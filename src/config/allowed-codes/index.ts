import { config } from 'dotenv'

config()

const allowedCodesString: string = process.env.ALLOWED_CODES || ''
export const ALLOWED_CODES: Array<string> = allowedCodesString.split(',')
