import React from 'react'
import useDocumentTitle from 'Hooks/useDocumentTitle'

//Types
import { TProps } from './types'

const NotFound: TProps = () => {
  useDocumentTitle('Page not found')

  return (
    <div className='main-wrapper items-center gradient-bottom justify-center'>
      <h1 className='text-white'>Page not found</h1>
    </div>
  )
}

export default NotFound
