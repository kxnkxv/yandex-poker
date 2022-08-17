import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

//Types
import { TProps } from './types'
import { TState } from 'Types/app'

const PublicRoot: FC<TProps> = (props) => {
  const auth = useSelector((state: TState) => state.auth)

  if (auth.user) {
    return <Navigate to='/tables' />
  }
  return <>{props.children}</>
}

export default PublicRoot
