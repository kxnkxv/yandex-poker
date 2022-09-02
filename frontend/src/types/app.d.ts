export type Nullable<T> = T | null

// STORE
export type TUserInfoData = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  avatar: string | null
  email: string
  login: string
  phone: string
} | null

export type TState = {
  auth: {
    user: TUserInfoData
  }
  registration: {
    newReg: boolean
  }
}

// HTTP REQUESTS
export type TErrorPayload = {
  reason?: string
}
