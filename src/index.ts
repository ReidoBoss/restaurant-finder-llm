import express from 'express'

import { z } from 'zod'
import { config } from 'dotenv'

import router from './router'

/**
 * Needed to initialize environment variables
 * do not remove
 */
config()

/**
 * SETUP PORT
 */
const portFromEnv = parseInt(process.env.PORT || '')
const parsePort = z.number().safeParse(portFromEnv)
const { success, data: portData } = parsePort
const PORT: number = success ? portData : 3000

const app = express()

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
