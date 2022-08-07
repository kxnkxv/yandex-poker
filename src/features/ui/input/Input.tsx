import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div>
    <input className='shadow appearance-none border rounded py-2 px-3 m-4 leading-tight focus:outline-none focus:shadow-outline' ref={ref} {...props} />
    <span></span>
  </div>
))

export default Input
