import { config } from "dotenv"

config()

export const gemeniApiKey: string = process.env.GEMINI_API_KEY || "No key"
