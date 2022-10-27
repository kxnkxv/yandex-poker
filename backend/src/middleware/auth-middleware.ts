import { ApiError } from '../exceptions/api-error'
import { Response, NextFunction } from 'express'
import { tokenService } from '../service/token-service'

export default function (req: any, res: Response, next: NextFunction) {
  try {
    const authorizationHeaders = req.headers.authorization
    if (!authorizationHeaders) {
      return next(ApiError.UnauthorizedError())
    }
    const accessToken = authorizationHeaders.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    req.userTokens = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
