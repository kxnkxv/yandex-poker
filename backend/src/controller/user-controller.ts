import { NextFunction, Request, Response } from 'express'
import { userService } from '../service/user-service'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error'
import { User } from '@prisma/client'
import { UserDto } from '../dtos/user-dto'

export type TEditUser = Omit<User, 'id'>
class UserController {
  // Todo: добавить типы не забыть
  async registration(req: Request, res: Response, next: NextFunction): Promise<any> {
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
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
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
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { refreshToken } = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json({ success: true })
    } catch (error) {
      next(error)
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async getUserOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      const user = await userService.getUserOne(id)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async editUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params
      const { email, login, first_name, second_name, phone, img_link, password } = req.body
      const user: TEditUser = {
        email,
        login,
        first_name,
        second_name,
        phone,
        img_link,
        password,
      }
      const userData = await userService.editUser(id, user)
      const newUserDto = new UserDto(userData)
      return res.status(200).json(newUserDto)
    } catch (error) {
      next(error)
    }
  }
}
export const userController = new UserController()
