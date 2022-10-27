import React, { FC } from 'react'
import 'components/loader/loader.css'

// Types
import { TProps } from './types'

const Button: FC<TProps> = ({ className, pending = false, children, onClick }) => {
  return (
    <button className={className} disabled={pending} onClick={onClick}>
      {pending ? (
        <div>
          <i className='spinner-border'></i>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
