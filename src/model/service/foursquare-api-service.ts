import foursquarePlaces from '@api/fsq-developers-places'
import { FSQR_API_KEY, X_PLACES_API_VERSION } from '../../config/frsqr'
import { PlaceSearchSchema } from '../../schema/four-square-api/place-search.schema'
import {
  FourPlaceApiBadRequestError,
  FourPlaceApiJsonParsingError,
  FourPlaceApiUnauthorizedError,
} from '../domain/entity/error/four-square-api-error'
import { RestaurantParams } from '../../type/restaurant-params'

foursquarePlaces.auth(FSQR_API_KEY)

async function get(params: RestaurantParams) {
  try {
    const result = await foursquarePlaces.placeSearch({
      'X-Places-Api-Version': X_PLACES_API_VERSION,
      ...params,
    })
    const { data, res } = result

    if (res.status === 400) throw new FourPlaceApiBadRequestError()
    if (res.status === 401) throw new FourPlaceApiUnauthorizedError()

    const parsedData = PlaceSearchSchema.safeParse(data)
    const { success, data: placeSearchResults } = parsedData

    if (!success) throw new FourPlaceApiJsonParsingError()
    return placeSearchResults
  } catch (error) {
    throw error
  }
}

export default {
  get,
}
