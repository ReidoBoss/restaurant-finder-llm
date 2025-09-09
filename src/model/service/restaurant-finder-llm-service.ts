import { ApiError, GoogleGenAI } from '@google/genai'
import { GEMINI_API_KEY } from '../../config/gemeni'
import { instructions } from '../../config/gemeni/restaurant-finder-instruction'
import { RestaurantParamsSchema } from '../../schema/restaurant-finder/restaurant-params.schema'
import {
  GemeniApiKeyError,
  GemeniJsonParsingError,
  RestaurantParamsParsingError,
} from '../domain/entity/error/restaurant-finder-llm-error'

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

export async function ask(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'model', parts: [{ text: instructions }] },
        { role: 'user', parts: [{ text: question }] },
      ],
    })
    const { text } = response

    const convertedJson = JSON.parse(text || '')

    const parsedJson = RestaurantParamsSchema.safeParse(convertedJson)
    const { success, data } = parsedJson
    if (!success) throw new RestaurantParamsParsingError()
    return data
  } catch (error) {
    if (error instanceof SyntaxError) throw new GemeniJsonParsingError()
    if (error instanceof ApiError) throw new GemeniApiKeyError()
    throw error
  }
}
