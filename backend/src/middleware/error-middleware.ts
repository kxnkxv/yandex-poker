import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import consola, { Consola } from 'consola'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  const logger: Consola = consola
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  logger.error({ error: err })
  return res.status(500).json({ message: 'Unexpected error' })
}
