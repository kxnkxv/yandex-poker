import React from 'react'

// Types
import { TProps } from './types'

const Input = React.forwardRef<HTMLInputElement, TProps>((props, ref) => {
  return (
    <>
      {!!props.label && <label className='form-label'>{props.label}</label>}
      <input {...props} ref={ref} />
      {!!props.error && <span className='text-red'>{props.error.message}</span>}
    </>
  )
})

export default Input
