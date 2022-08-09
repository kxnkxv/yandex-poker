import React from 'react'
import Logo from '../../../images/logo.png'
import Ivan from '../../../images/Ivan.png'
import Settings from '../../../images/settings.png'
import FullScreen from '../../../images/fullscreen.png'

export interface IPopupPageProps {}

const HearderMenu: React.FC<IPopupPageProps> = (props) => {
  return (
    <div>
      <nav className='bg-transparent p-2'>
        <div className='container flex flex-wrap justify-between items-center mb-5'>
          <div className='flex items-center mb-5'>
            <img src={Logo} className='h-6 sm:h-9' alt='AIG Logo' />
            <a href='https://github.com/AIG-GAMING' className='flex items-center'>
              <h4 className='self-center text-xl font-semibold text-white font-futura'>
                AIG POKER
              </h4>
            </a>
          </div>
          <div className='flex items-center mb-5'>
            <div className='flex items-center text-white'>
              <div className='inline-block items-center justify-end text-sm md:order-2'>
                <h5>Ivan Tekunov</h5>
                <h5 className='opacity-70 font-roboto'>player</h5>
              </div>
              <div className='flex items-center md:order-3'>
                <img className='w-16 h-16' src={Ivan} alt='user photo' />
              </div>
            </div>
            <div className='flex items-center flex-col border-2 rounded border-white font-roboto text-white text-sm p-1'>
              <h5 className=''>DEPOSIT</h5>
              <div className='flex justify-around m-2 border-transperant rounded-xl w-32 bg-purple items-center'>
                <h5 className='p-0.5'>$100.00</h5>
              </div>
            </div>
            <div className='m-2'>
              <button>
                <img src={Settings} className='mr-3 h-6 sm:h-9' alt='Settings' />
              </button>
              <button>
                <img src={FullScreen} className='mr-3 h-6 sm:h-9' alt='FullScreen' />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HearderMenu
