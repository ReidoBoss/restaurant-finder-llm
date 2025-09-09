import type { Response, Request } from 'express'

const index = (req: Request, res: Response) => {
  res.json({
    message: 'healthy',
  })
}

export default {
  index,
}
