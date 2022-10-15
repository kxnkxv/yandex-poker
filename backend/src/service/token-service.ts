import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class TokenService {
  async generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      return userData
    } catch (error) {
      return null
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
      return userData
    } catch (error) {
      return null
    }
  }
  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await prisma.token.findUnique({
      where: {
        userId: userId,
      },
    })
    if (tokenData) {
      const tokenData = await prisma.token.update({
        where: {
          userId: userId,
        },
        data: {
          refreshToken,
        },
      })
      return tokenData
    }
    const token = await prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    })
    return token
  }
  async removeToken(refreshToken: string) {
    const tokenData = await prisma.token.delete({
      where: {
        refreshToken: refreshToken,
      },
    })
    return tokenData
  }
  async findToken(refreshToken: string) {
    const tokenData = await prisma.token.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    })
    return tokenData
  }
}

export const tokenService = new TokenService()
