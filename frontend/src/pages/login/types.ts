export type TSignInForm = {
  login: string
  password: string
}

export interface TAuthInitialState {
  isPending: boolean
  user: any
  accessToken: string
  refreshToken: string
}
