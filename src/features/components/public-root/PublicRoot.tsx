import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type IPublicRootProps = {
  children: React.ReactNode
}
type IState = {
  auth: {
    user: IUserInfoData
  }
}

const PublicRoot: FC<IPublicRootProps> = (props) => {
  const auth = useSelector((state: IState) => state.auth)

  if (auth.user) {
    return <Navigate to='/tables' />
  }
  return <>{props.children}</>
}

export default PublicRoot
