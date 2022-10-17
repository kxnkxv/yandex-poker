import { ReactNode } from 'react'

export type TProps = {
  onClick?: () => void
  type?: string
  className?: string
  pending?: boolean
  children?: ReactNode | string
}
