import Loader from '@/components/loader/Loader'
import React, { FC } from 'react'

// Types
import { TProps } from './types'

const Button: FC<TProps> = (props) => {
  const pending = props.pending
  return (
    <button className='btn-red' disabled={pending}>
      {pending ? <Loader /> : props.children}
    </button>
  )
}

export default Button
