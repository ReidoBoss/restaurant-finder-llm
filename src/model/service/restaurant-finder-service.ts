import foursquareApiService from './foursquare-api-service'
import restaurantFinderLLMService from './restaurant-finder-llm-service'
import httpStatus from '../utility/http-status'
import { ALLOWED_CODES } from '../../config/allowed-codes'
import { StringSchema } from '../../schema/common.schema'
import {
  RestaurantFinderCodeInvalid,
  RestaurantFinderCodeIsNotString,
  RestaurantFinderNoCodeError,
  RestaurantFinderNoMessage,
  RestaurantFinderMessageInvalid,
  RestaurantFinderError,
} from '../domain/entity/error/restaurant-finder-error'
import { FourSquareError } from '../domain/entity/error/four-square-api-error'
import { GemeniApiError } from '../domain/entity/error/restaurant-finder-llm-error'

import type { Request, Response } from 'express'

async function find(req: Request, res: Response) {
  try {
    const { query } = req
    const { code, message } = query

    /**
     * FAIL FASTS FOR code query
     */
    if (!code) throw new RestaurantFinderNoCodeError()
    const parsedCode = StringSchema.safeParse(code)
    const { success: isCodeParseSuccess, data: userCode } = parsedCode
    if (!isCodeParseSuccess) throw new RestaurantFinderCodeIsNotString()
    if (!ALLOWED_CODES.includes(userCode))
      throw new RestaurantFinderCodeInvalid()

    /**
     * FAIL FASTS FOR message query
     */
    if (!message) throw new RestaurantFinderNoMessage()
    const parsedMessage = StringSchema.safeParse(message)
    const { success: isMessageParsed, data: messageData } = parsedMessage
    if (!isMessageParsed) throw new RestaurantFinderMessageInvalid()

    const restaurantSearchQuery = await restaurantFinderLLMService.create({
      question: messageData,
    })

    const result = await foursquareApiService.get(restaurantSearchQuery)
    res.json(result)
  } catch (error) {
    if (error instanceof Error) handleError(error, res)
    else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

function handleError(error: Error, res: Response) {
  if (error instanceof FourSquareError) {
    foursquareApiService.handleError(error, res)
  } else if (error instanceof RestaurantFinderError) {
    handleFinderServiceError(error, res)
  } else if (error instanceof GemeniApiError) {
    restaurantFinderLLMService.handleError(error, res)
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

function handleFinderServiceError(error: RestaurantFinderError, res: Response) {
  if (error instanceof RestaurantFinderNoCodeError) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'No code given. please give your code',
    })
  } else if (error instanceof RestaurantFinderCodeIsNotString) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'The code is not string, please give valid code',
    })
  } else if (error instanceof RestaurantFinderCodeInvalid) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'The code you gave was invalid. please try a valid one',
    })
  } else if (error instanceof RestaurantFinderMessageInvalid) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'The message you gave was invalid, please give a valid message',
    })
  } else if (error instanceof RestaurantFinderNoMessage) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'message query is needed, please provide it',
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export default { find }
