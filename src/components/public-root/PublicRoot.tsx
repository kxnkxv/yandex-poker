import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

//Types
import { TProps } from './types'
import { TState } from 'Types/app'

const PublicRoot: TProps = (props) => {
  const auth = useSelector((state: TState) => state.auth)

  if (auth.user) {
    return <Navigate to='/tables' />
  }
  return <>{props.children}</>
}

export default PublicRoot
