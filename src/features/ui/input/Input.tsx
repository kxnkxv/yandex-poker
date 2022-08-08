import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className='mx-14 w-full'>
    <input className='shadow appearance-none border rounded w-full p-2 my-4 font-roboto leading-tight focus:outline-none focus:shadow-outline' ref={ref} {...props} />
    <span></span>
  </div>
))

export default Input
