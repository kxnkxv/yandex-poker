export type TSignInForm = {
  login: string
  password: string
}

export interface TAuthInitialState {
  isPending: boolean
  // Todo:Написать типизацию для юзера
  user: any
}
