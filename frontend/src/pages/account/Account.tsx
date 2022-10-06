import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Avatars from 'pages/account-edit/Avatars' // Mock data
import useDocumentTitle from 'hooks/useDocumentTitle'

// Images
import Back from 'images/back.svg'
import Edit from 'images/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'core/store/selectors/user'
import { logout } from 'pages/login/LoginSlice'
import { AppDispatch } from '@/core/store'

const Account: FC = () => {
  useDocumentTitle('Account')
  const user = useSelector(userSelector)
  console.log('user', user)
  const dispatch = useDispatch<AppDispatch>()

  const onLogout = () => {
    dispatch(logout())
      .unwrap()
  }

  return (
    <div className='main-wrapper pt-28'>
      <div className='container mx-auto max-w-md'>
        <div className='nav-header'>
          <Link className='btn-nav' to='/tables'>
            <img src={Back} alt='Back' />
          </Link>
          <Link className='btn-nav' to='/account/edit'>
            <img src={Edit} alt='Edit' />
          </Link>
        </div>
        <div className='w-full text-center'>
          <div className='profile-avatar mx-auto mb-5 inline-block'>
            <img className='h-28 w-28' src={Avatars[user.img_link].image} alt='Username' />
          </div>
          <div className='mb-5'>
            <h2>
              {user.first_name} {user.second_name}
            </h2>
            <h4>@{user.login}</h4>
          </div>
          <div className='h-px bg-magenta w-full mb-5' />
          <div className='grid gap-5 mb-5 md:grid-cols-2'>
            <div className='inline-grid justify-items-start'>
              <div className='text-grey'>Email</div>
              <div>{user.email}</div>
            </div>
            <div className='inline-grid justify-items-start'>
              <div className='text-grey'>Mobile</div>
              <div>{user.phone}</div>
            </div>
          </div>
          <div className='h-px bg-magenta w-full mb-5' />
        </div>
        <div className='inline-grid'>
          <button className='mb-5'>Change password</button>
          <a className='text-red cursor-pointer' onClick={() => onLogout()}>
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}

export default Account
