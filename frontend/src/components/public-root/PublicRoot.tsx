import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// Types
import { TProps } from './types'
import { TState } from 'Types/app'
import { checkAuth } from 'Pages/login/LoginSlice'
import { AppDispatch } from 'Core/store'

const PublicRoot: FC<TProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const auth = useSelector((state: TState) => state.auth)

  if (auth.user) {
    return <Navigate to='/tables' />
  }

  return <>{props.children}</>
}

export default PublicRoot
