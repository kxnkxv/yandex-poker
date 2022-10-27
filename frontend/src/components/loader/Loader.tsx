import React, { FC } from 'react'
import './loader.css'

const Loader: FC = (props) => {
  return (
    <div>
      <div className='spinner-border ${className}' role='status'>
      </div>
      <span className='whitespace-nowrap m-3'>Loading...</span>
    </div>
  )
}

export default Loader
