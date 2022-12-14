import { NextFunction, Request, Response } from 'express'
import { userService } from '../service/user-service'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error'
import { UserDto } from '../dtos/user-dto'
import jwt from 'jsonwebtoken'
class UserController {
  async registrationOauth(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, first_name, last_name, default_email, default_phone, id } = req.body
      const { systemName } = req.params
      const dataOauth = {
        login,
        first_name,
        last_name,
        default_email,
        default_phone,
        systemName,
        id,
      }
      const userData = await userService.registrationOauth(dataOauth)
      res.cookie('refreshToken', userData!.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json({ user: userData.user, accessToken: userData.accessToken })
    } catch (error) {
      next(error)
    }
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { email, password, login, first_name, second_name, phone } = req.body
      const userData = await userService.registration(
        login,
        password,
        email,
        first_name,
        second_name,
        phone,
      )
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json({ user: userData.user, accessToken: userData.accessToken })
    } catch (error) {
      next(error)
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { login, password } = req.body
      const userData = await userService.login(login, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json({ user: userData.user, accessToken: userData.accessToken })
    } catch (error) {
      next(error)
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json({ success: true })
    } catch (error) {
      next(error)
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json({ user: userData.user, accessToken: userData.accessToken })
    } catch (error) {
      next(error)
    }
  }
  async getUserOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userTokens
      const user = await userService.getUserOne(id)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userTokens
      const userData = await userService.editUser({ ...req.body, id })
      const newUserDto = new UserDto(userData)
      return res.status(200).json(newUserDto)
    } catch (error) {
      next(error)
    }
  }
  async getUserAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers()
      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
}
export const userController = new UserController()
