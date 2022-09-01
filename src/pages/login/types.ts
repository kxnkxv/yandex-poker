export type TSignInForm = {
  login: string
  password: string
}

export type TAuthInitialState = {
  isPending: boolean | null
  user: any
}
