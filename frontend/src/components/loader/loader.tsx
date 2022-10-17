import React, { FC } from 'react'
import './Loader.css'
import { TLoaderProps } from './types'

const Loader: FC<TLoaderProps> = (props) => {
  return (
    <div className='spinner-border ${className}' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Loader
