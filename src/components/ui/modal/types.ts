import { FC, ReactNode } from 'react'

export type TOwnProps = {
  children?: ReactNode | string
  open?: boolean
  title?: string
  closeHandle?: () => void
}

export type TProps = FC<TOwnProps>
