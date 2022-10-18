import React, { FC } from 'react'
import './loader.css'

const Loader: FC = (props) => {
  return (
    <div className='spinner-border ${className}' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Loader
