import healthcheckCotroller from '../controller/healthcheck-controller'
import type { Express } from 'express'

export default (app: Express) => {
  app.get('/', healthcheckCotroller.index)
}
