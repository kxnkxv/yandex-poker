declare module '*.png'

declare module '*.svg' {
  const content: any
  export default content
}

declare type IErrorPayload = {
  reason?: string
}
declare type ISignInForm = {
  login: string
  password: string
}

declare type IUserInfoData = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  avatar: string | null
  email: string
  login: string
  phone: string
}

declare type IAuthInitialState = {
  isPending: boolean
  user: IUserInfoData | null
}

declare type Nullable<T> = T | null
