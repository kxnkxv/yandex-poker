import Avatars from 'Pages/account-edit/Avatars'
import React from 'react'
import backArrowIcon from '../account-edit/backArrowIcon.svg'



const Account = () => {
  const userAvatar = Avatars[0].image

  return (
    <div className='main-wrapper pt-28'>
      <div className='container mx-auto max-w-md'>
        <div className='nav-header'>
          <a className='btn-nav'>
            <img src={backArrowIcon} alt='Back' />
          </a>
          <a className='btn-nav'>
            <img src={backArrowIcon} alt='Back' />
          </a>
        </div>
        <div className='w-full text-center'>
            <div className='profile-avatar mx-auto mb-5 inline-block'>
                <img src={userAvatar} alt='Username' />
            </div>
        </div>

      </div>
    </div>
  )
}

export default Account
