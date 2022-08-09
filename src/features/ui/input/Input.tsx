import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  //Дополнительные поля
  label?: string
  error?: {
    message?: string
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      {!!props.label && <label className='form-label'>{props.label} </label>}
      <input {...props} ref={ref} />
      {!!props.error && <p className='text-red'>{props.error.message}</p>}
    </>
  )
})

export default Input