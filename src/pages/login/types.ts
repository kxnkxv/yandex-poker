import { FC } from 'react'

export type TSignInForm = {
  login: string
  password: string
}

export type TAuthInitialState = {
  isPending: boolean
  user: any
}

export type TProps = FC
