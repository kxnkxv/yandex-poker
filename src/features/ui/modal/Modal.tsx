import React, { ReactNode } from 'react'
import './Modal.css'
import CloseIcon from './img/closeIcon.svg'

export interface IPopupPageProps {
  children: ReactNode
  open?: boolean
  title?: string
  closeHandle?: () => void
}

const Modal: React.FC<IPopupPageProps> = ({
  open = false,
  children,
  title = '',
  closeHandle = function () {},
}: IPopupPageProps) => {
  return (
    <div className={'modal-wrapper items-center flex ' + (open ? ' modal-opened' : '')}>
      <div className='modal'>
        <div className='modal-header p-5'>
          <div className='modal-title h2'>{title}</div>
          <div className='modal-close' onClick={closeHandle}>
            <img src={CloseIcon} alt='Close' />
          </div>
        </div>
        <div className='modal-body p-5'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
