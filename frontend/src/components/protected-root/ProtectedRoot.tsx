import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppDispatch } from 'core/store'
import { checkAuth } from 'pages/login/LoginSlice'

// Types
import { TProps } from './types'
import { TState } from 'types/app'

const ProtectedRoot: FC<TProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const auth = useSelector((state: TState) => state.auth)
  const registration = useSelector((state: TState) => state.registration)

  if (auth.user || registration?.newReg) {
    return <>{props.children}</>
  }

  return <Navigate to='/' />
}

export default ProtectedRoot
