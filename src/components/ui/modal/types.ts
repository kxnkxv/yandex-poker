import { ReactNode } from 'react'

export type TProps = {
  children?: ReactNode | string
  open?: boolean
  title?: string
  closeHandle?: () => void
}
