import { User, Token } from 'prisma'
export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
  login: string
}
declare module 'express-serve-static-core' {
  interface Request {
    user: User
    token: Token
    userTokens: UserIDJwtPayload
  }
  interface Response {
    user: User
    token: Token
  }
}
