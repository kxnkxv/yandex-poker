import { PrismaClient, User } from '@prisma/client'
import argon2 from 'argon2'
import { UserDto } from '../dtos/user-dto'
import { tokenService } from './token-service'
import { ApiError } from '../exceptions/api-error'
const prisma = new PrismaClient()
class UserService {
  async registrationOauth(dataOauth: {
    login: string
    first_name: string
    last_name: string
    default_email: string
    default_phone: { id: number; number: 'string' }
    systemName: string
    id: string
  }) {
    if (Object.values(dataOauth).some((dataOauth) => dataOauth === undefined)) {
      throw ApiError.BadRequest('Fill in the data!')
    }
    let user
    const candidate = await prisma.oAuth_Data.findUnique({
      where: {
        serviceName_userServiceId: {
          serviceName: dataOauth.systemName,
          userServiceId: dataOauth.id,
        },
      },
    })
    if (!candidate) {
      user = await prisma.user.create({
        data: {
          login: dataOauth.login,
          first_name: dataOauth.first_name,
          second_name: dataOauth.last_name,
          phone: dataOauth.default_phone.number,
          email: dataOauth.default_email,
        },
      })
      await this.oauthUserSave(dataOauth.systemName, user.id, dataOauth.id)
    } else {
      user = await prisma.user.findUnique({
        where: {
          id: candidate.userId,
        },
      })
    }
    const userDto = new UserDto(user!)
    const tokens = await tokenService.generateTokens({ id: userDto.id, login: userDto.login })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
  async registration(
    login: string,
    password: string,
    email: string,
    first_name: string,
    second_name: string,
    phone: string,
  ) {
    const candidate = await prisma.user.findUnique({
      where: {
        login: login,
      },
    })
    if (candidate) {
      throw ApiError.BadRequest('User already exists')
    }
    const hashedPassword = await argon2.hash(password)
    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        email,
        first_name,
        second_name,
        phone,
      },
    })
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ id: userDto.id, login: userDto.login })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
  async oauthUserSave(serviceName: string, userId: string, userServiceId: string) {
    const userOauth = await prisma.oAuth_Data.create({
      data: {
        serviceName,
        userId,
        userServiceId,
      },
    })
    return userOauth
  }
  async login(login: string, password: string) {
    if (!login || !password) {
      throw ApiError.BadRequest('Error! The login and password fields must not be empty')
    }

    const user = await prisma.user.findUnique({
      where: {
        login,
      },
    })
    if (!user) {
      throw ApiError.BadRequest('User not found')
    }
    const isPassEquals = await argon2.verify(user.password, password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password')
    }
    const userDto = new UserDto(user)

    const tokens = await tokenService.generateTokens({ id: userDto.id, login: userDto.login })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    })
    if (!user) {
      throw ApiError.BadRequest('Error update token')
    }
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ id: userDto.id, login: userDto.login })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async getUserOne(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    const userDto = new UserDto(user as User)
    return userDto
  }
  //Продумать ошибки по которым если мы не найдем пользователя
  async editUser(user: User) {
    const { email, login, first_name, second_name, phone, img_link, id } = user
    if (!email || !login || !first_name || !second_name || !phone || !img_link) {
      throw ApiError.BadRequest('Values should not be empty!')
    }
    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        login,
        first_name,
        second_name,
        phone,
        img_link,
      },
    })
    return newUser
  }
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        login: true,
        first_name: true,
        second_name: true,
        phone: true,
        img_link: true,
        balance: true,
      },
    })
    return users
  }
}

export const userService = new UserService()
