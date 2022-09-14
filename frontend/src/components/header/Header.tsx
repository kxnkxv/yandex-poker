import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Images
import Logo from 'images/logo.svg'
import Settings from 'images/normal.svg'
import FullScreen from 'images/pressed.svg'
import Avatars from 'pages/account-edit/Avatars'
import { userSelector } from 'core/store/selectors/user'

const Header: FC = () => {
  const user = useSelector(userSelector)
  const [isFullScreen, setIsFullScreen] = useState(false)
  useEffect(() => {
    if (isFullScreen) {
      document.body.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  })
  return (
    <nav>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex items-center mb-5'>
          <img src={Logo} className='h-6 sm:h-9' alt='AIG Logo' />
          <a href='https://github.com/AIG-GAMING' className='flex items-center'>
            <h4 className='self-center text-xl font-semibold text-white font-futura'>AIG POKER</h4>
          </a>
        </div>
        <div className='flex items-center mb-5'>
          <Link to='/account'>
            <div className='flex items-center text-white'>
              <div className='inline-block items-center justify-end text-sm md:order-2'>
                <h5>
                  {user.first_name} {user.second_name}
                </h5>
                <h5 className='opacity-70 font-roboto'>@{user.login}</h5>
              </div>
              <div className='flex items-center md:order-3'>
                <img
                  className='w-16 h-16'
                  src={Avatars[user.display_name].image}
                  alt='user photo'
                />
              </div>
            </div>
          </Link>
          <div className='flex items-center flex-col border-2 rounded border-white font-roboto text-white text-sm p-1'>
            <h5 className=''>Deposit</h5>
            <div className='flex justify-around m-2 border-transperant rounded-xl w-32 bg-purple items-center'>
              <h5 className='p-0.5'>$100.00</h5>
            </div>
          </div>
          <div>
            <button className='p-5'>
              <img src={Settings} className='h-6 sm:h-9' alt='Settings' />
            </button>
            <button onClick={() => setIsFullScreen(!isFullScreen)}>
              <img src={FullScreen} className='h-6 sm:h-9' alt='FullScreen' />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
