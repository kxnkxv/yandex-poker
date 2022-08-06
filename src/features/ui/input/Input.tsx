import React from 'react'
import './Input.css'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div>
    <input className='input' ref={ref} {...props} />
    <span></span>
  </div>
))

export default Input
