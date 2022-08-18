import React, { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppDispatch } from 'Core/store'
import { checkAuth } from 'Pages/login/LoginSlice'

//Types
import { TProps } from './types'
import { TState } from 'Types/app'

const ProtectedRoot: FC<TProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const auth = useSelector((state: TState) => state.auth)

  if (auth.user) {
    return <>{props.children}</>
  }
  return <Navigate to='/' />
}

export default ProtectedRoot
