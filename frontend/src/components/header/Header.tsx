import React, { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Images
import Logo from 'images/logo.svg'
import FullScreen from 'images/pressed.svg'
import ForumIcon from 'images/forumIcon.svg'
import TableIcon from 'images/tableIcon.svg'
import Avatars from 'pages/account-edit/Avatars'
import { userSelector } from 'core/store/selectors/user'

const Header: FC = () => {
  const user = useSelector(userSelector)
  const toggleFullScreen = () => {
    if (window.innerHeight == screen.height) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    } else {
      document.body.requestFullscreen()
    }
  }
  return (
    <nav>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex items-center mb-5'>
          <img src={Logo} className='h-6 sm:h-9' alt='AIG Logo' />
          <Link to='/' className='flex items-center'>
            <h4 className='self-center text-xl font-semibold text-white font-futura'>AIG POKER</h4>
          </Link>
          <div className='ml-5 px-5'>
            <NavLink
              to='/tables'
              className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}
            >
              <img src={TableIcon} className='h-6 sm:h-9' alt='Available tables' /> Available tables
            </NavLink>
          </div>
          <div className='px-5'>
            <NavLink
              to='/forum'
              className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}
            >
              <img src={ForumIcon} className='h-6 sm:h-9' alt='Forum' /> Forum
            </NavLink>
          </div>
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
                {user.img_link && (
                  <img className='w-16 h-16' src={Avatars[user.img_link].image} alt='user photo' />
                )}
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
            <button onClick={toggleFullScreen}>
              <img src={FullScreen} className='h-6 sm:h-9' alt='FullScreen' />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
