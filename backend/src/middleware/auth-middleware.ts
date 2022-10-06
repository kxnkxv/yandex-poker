import { ApiError } from '../exceptions/api-error'
import { Response, NextFunction } from 'express'
import { tokenService } from '../service/token-service'

export default function (req: any, res: Response, next: NextFunction) {
  try {
    const authorizationHeaders = req.headers.authorization
    console.log('authorizationHeaders', authorizationHeaders)
    if (!authorizationHeaders) {
      console.log('authorizationHeaders')
      return next(ApiError.UnauthorizedError())
    }
    const accessToken = authorizationHeaders.split(' ')[1]
    if (!accessToken) {
      console.log('accessToken')
      return next(ApiError.UnauthorizedError())
    }
    console.log('accessToken', accessToken)
    const userData = tokenService.validateAccessToken(accessToken)
    console.log('userData', userData)
    if (!userData) {
      console.log('userData')
      return next(ApiError.UnauthorizedError())
    }
    req.User = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
