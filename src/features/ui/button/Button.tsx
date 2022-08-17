import React from 'react'

type IButtonProps = React.HTMLProps<HTMLButtonElement> & {
  // Дополнительные поля
  children?: React.ReactNode
}

const Button = (props: IButtonProps) => <button className='btn-red'>{props.children}</button>

export default Button
