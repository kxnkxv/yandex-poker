import React, { FC } from 'react'

// Styles
import './Modal.css'

// Images
import CloseIcon from './img/closeIcon.svg'

// Types
import { TProps } from './types'

const Modal: FC<TProps> = (props) => {
  return (
    <div className={'modal-wrapper items-center flex ' + (props.open ? ' modal-opened' : '')}>
      <div className='modal'>
        <div className='modal-header p-5'>
          <div className='modal-title h2'>{props.title}</div>
          <div className='modal-close cursor-pointer' onClick={props.closeHandle}>
            <img src={CloseIcon} alt='Close' />
          </div>
        </div>
        <div className='modal-body p-5'>{props.children}</div>
      </div>
    </div>
  )
}

export default Modal
