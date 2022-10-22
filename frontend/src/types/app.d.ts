// STORE
export type TUserInfoData = TUser
export type TUser = {
  id: string
  first_name: string
  second_name: string
  img_link: number
  email: string
  login: string
  phone: string
}

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
