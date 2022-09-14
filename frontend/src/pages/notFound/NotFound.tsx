import React, { FC } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

const NotFound: FC = () => {
  useDocumentTitle('Page not found')

  return (
    <div className='main-wrapper items-center gradient-bottom justify-center'>
      <h1 className='text-white'>Page not found</h1>
    </div>
  )
}

export default NotFound
