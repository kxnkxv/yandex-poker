import React, { FC } from 'react'
import './loader.css'

const Loader: FC = (props) => {
  return (
    <div>
      <div className='spinner-border ${className}' role='status'>
        <span className='sr-only'>Loading</span>
      </div>
      <span className='mb-5 ml-2'>Loading...</span>
    </div>
  )
}

export default Loader
