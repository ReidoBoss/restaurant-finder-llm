import httpStatus from '../utility/http-status'
import { ApiError, GoogleGenAI } from '@google/genai'
import { GEMINI_API_KEY } from '../../config/gemeni'
import { instructions } from '../../config/gemeni/restaurant-finder-instruction'
import { RestaurantParamsSchema } from '../../schema/restaurant-finder/restaurant-params.schema'
import {
  GemeniApiError,
  GemeniApiKeyError,
  GemeniJsonParsingError,
  RestaurantParamsParsingError,
} from '../domain/entity/error/restaurant-finder-llm-error'

import type { RestaurantParams } from '../../type/restaurant-params'
import type { Response } from 'express'

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

async function create(parameter: {
  question: string
}): Promise<RestaurantParams> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'model', parts: [{ text: instructions }] },
        { role: 'user', parts: [{ text: parameter.question }] },
      ],
    })
    const { text } = response

    const convertedJson = JSON.parse(text || '')

    const safeParsedJson = RestaurantParamsSchema.safeParse(convertedJson)
    const { success, data } = safeParsedJson
    if (!success) throw new RestaurantParamsParsingError()
    return data
  } catch (error) {
    if (error instanceof SyntaxError) throw new GemeniJsonParsingError()
    if (error instanceof ApiError) throw new GemeniApiKeyError()
    throw error
  }
}

async function handleError(error: GemeniApiError, res: Response) {
  if (error instanceof GemeniApiKeyError) {
    res.json(httpStatus.UNAUTHORIZED).json({
      message: "there's an error in the API KEY, either invalid or expired",
    })
  } else if (error instanceof GemeniJsonParsingError) {
    res.json(httpStatus.UNAUTHORIZED).json({
      message: 'The data could not be read, error while parsing json',
    })
  } else if (error instanceof RestaurantParamsParsingError) {
    res.json(httpStatus.UNAUTHORIZED).json({
      message:
        'The data could not be read, error while parsing restaurant params',
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export default { create, handleError }
