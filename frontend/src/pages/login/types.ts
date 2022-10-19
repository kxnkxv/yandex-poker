import { TUser, TUserInfoData } from '@/types/app'

export type TSignInForm = {
  login: string
  password: string
}
export interface TAuthResponse {
  accessToken: string
  refreshToken: string
  user: TUser
}
export interface TAuthInitialState {
  isPending: boolean
  // Todo:Написать типизацию для юзера
  user: TUserInfoData
}
