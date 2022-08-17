import React from 'react'
import { Link } from 'react-router-dom'
import Avatars from 'Pages/account-edit/Avatars' // Mock data

//Images
import Back from 'Images/back.svg'
import Edit from 'Images/edit.svg'

//Types
import { TProps } from './types'

const Account: TProps = () => {
  const userAvatar = Avatars[0].image

  return (
    <div className='main-wrapper pt-28'>
      <div className='container mx-auto max-w-md'>
        <div className='nav-header'>
          <Link className='btn-nav' to={''}>
            <img src={Back} alt='Back' />
          </Link>
          <Link className='btn-nav' to={'/account/edit'}>
            <img src={Edit} alt='edit' />
          </Link>
        </div>
        <div className='w-full text-center'>
          <div className='profile-avatar mx-auto mb-5 inline-block'>
            <img className='h-28 w-28' src={userAvatar} alt='Username' />
          </div>
          <div className='mb-5'>
            <h2>Username</h2>
            <h4>@Login</h4>
          </div>
          <div className='h-px bg-magenta w-full mb-5' />
          <div className='grid gap-5 mb-5 md:grid-cols-2'>
            <div className='inline-grid justify-items-start'>
              <div className='text-grey'>Email</div>
              <div>gulnazmd@gmail.com</div>
            </div>
            <div className='inline-grid justify-items-start'>
              <div className='text-grey'>Mobile</div>
              <div>89534933355</div>
            </div>
          </div>
          <div className='h-px bg-magenta w-full mb-5' />
        </div>
        <div className='inline-grid'>
          <button className='mb-5'>Change password</button>
          <Link className='text-red' to={'/'}>
            Sign out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Account
