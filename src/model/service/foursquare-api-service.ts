import foursquarePlaces from '@api/fsq-developers-places'
import httpStatus from '../utility/http-status'
import { FSQR_API_KEY, X_PLACES_API_VERSION } from '../../config/frsqr'
import { PlaceSearchSchema } from '../../schema/four-square-api/place-search.schema'
import {
  FourSquareApiBadRequestError,
  FourSquareApiJsonParsingError,
  FourSquareApiUnauthorizedError,
  FourSquareError,
} from '../domain/entity/error/four-square-api-error'
import type { RestaurantParams } from '../../type/restaurant-params'
import type { PlaceSearchResults } from '../../type/four-square'
import type { Response } from 'express'

/**
 * Sets up the API KEY
 */
foursquarePlaces.auth(FSQR_API_KEY)

/**
 *
 * @param params the parameter of how to choose a restuarant place
 * @returns
 */
async function get(params: RestaurantParams): Promise<PlaceSearchResults> {
  try {
    const result = await foursquarePlaces.placeSearch({
      'X-Places-Api-Version': X_PLACES_API_VERSION,
      ...params,
    })
    const { data, res } = result

    if (res.status === 400) throw new FourSquareApiBadRequestError()
    if (res.status === 401) throw new FourSquareApiUnauthorizedError()

    const parsedData = PlaceSearchSchema.safeParse(data)
    const { success, data: placeSearchResults } = parsedData

    if (!success) throw new FourSquareApiJsonParsingError()
    return placeSearchResults
  } catch (error) {
    throw error
  }
}

async function handleError(error: FourSquareError, res: Response) {
  if (error instanceof FourSquareApiBadRequestError) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "it's a bad request!",
    })
  } else if (error instanceof FourSquareApiUnauthorizedError) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: `
        Unauthorized access, make sure you have an API key!,
        refer to this documentation:
        https://docs.foursquare.com/fsq-developers-places/reference/place-search
      `,
    })
  } else if (error instanceof FourSquareApiJsonParsingError) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: `The data could not be read. there's an error while parsing`,
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export default {
  get,
  handleError,
}
