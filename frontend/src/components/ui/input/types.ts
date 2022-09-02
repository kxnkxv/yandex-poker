import React from 'react'

export type TProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  // Дополнительные поля
  label?: string
  error?: {
    message?: string
  }
}
