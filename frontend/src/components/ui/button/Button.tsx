import Loader from '@/components/loader/Loader'
import React, { FC } from 'react'

// Types
import { TProps } from './types'

const Button: FC<TProps> = ({ pending = false , children, onClick }) => {
  return (
    <button className='btn-red' disabled={pending} onClick={onClick}>
      {pending ? <Loader /> : children}
    </button>
  )
}

export default Button
