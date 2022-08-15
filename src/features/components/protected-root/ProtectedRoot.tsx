import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppDispatch } from 'Core/store'
import { checkAuth } from 'Pages/login/LoginSlice'

type IProtectedRootProps = {
  children: React.ReactNode
}

type IState = {
  auth: {
    user: IUserInfoData
  }
}

const ProtectedRoot: FC<IProtectedRootProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const auth = useSelector((state: IState) => state.auth)

  if (auth.user) {
    return <>{props.children}</>
  }
  return <Navigate to='/' />
}

export default ProtectedRoot
