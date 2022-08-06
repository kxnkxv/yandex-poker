import React, { ReactNode } from 'react'
import './Modal.module.css'

export interface IPopupPageProps {
  children: ReactNode
}

const Modal: React.FunctionComponent<IPopupPageProps> = (props) => {
  return (
    <div className='modal'>
      <div>{props.children}</div>
    </div>
  )
}

export default Modal
