import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import { AppDispatch } from 'core/store'
// import { checkAuth } from 'pages/login/LoginSlice'

// Types
import { TProps } from './types'
import { TState } from 'types/app'

const ProtectedRoot: FC<TProps> = (props) => {
  const auth = useSelector((state: TState) => state.auth)

  if (auth.user?.id) {
    return <>{props.children}</>
  }

  return <Navigate to='/' />
}

export default ProtectedRoot
