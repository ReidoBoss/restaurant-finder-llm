import restaurantFinderService from '../model/service/restaurant-finder-service'
import type { Response, Request } from 'express'

const find = (req: Request, res: Response) => {
  restaurantFinderService.find(req, res)
}

export default { find }
