import { FC, ReactNode } from 'react'

export type TOwnProps = {
  onClick?: () => void
  type?: string
  className?: string
  id?: string
  children?: ReactNode | string
}

export type TProps = FC<TOwnProps>
