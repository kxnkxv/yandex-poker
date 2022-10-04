export type TSignInForm = {
  login: string
  password: string
}

export type TAuthInitialState = {
  isPending: boolean
  user: any
  accessToken: string
  refreshToken: string
}
