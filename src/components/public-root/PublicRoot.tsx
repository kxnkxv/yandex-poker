import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

//Types
import { TProps } from './types'
import { TState } from 'Types/app'

const PublicRoot: FC<TProps> = (props) => {
  const { auth, registration } = useSelector((state: TState) => state)

  if (auth.user) {
    return <Navigate to='/tables' />
  }
  if (registration?.newReg) {
    return <Navigate to='/tables' />
  }
  return <>{props.children}</>
}

export default PublicRoot
