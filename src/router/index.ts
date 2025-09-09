import healthcheckCotroller from '../controller/healthcheck-controller'
import restaurantFinderController from '../controller/restaurant-finder-controller'
import type { Express } from 'express'

export default (app: Express) => {
  app.get('/', healthcheckCotroller.index)
  app.get('/api/execute', restaurantFinderController.find)
}
