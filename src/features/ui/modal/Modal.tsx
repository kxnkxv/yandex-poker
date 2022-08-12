import React, { ReactNode } from 'react'

export interface IPopupPageProps {
  children: ReactNode
}

const Modal: React.FunctionComponent<IPopupPageProps> = (props) => {
  return (
    <div className='bg-transparent'>
      <nav className='flex justify-between items-center h-10 bg-blue opacity-70 p-4 mb-1 uppercase'>
        <h4>Table name</h4>
        <h4>Game</h4>
        <h4>Stakes</h4>
        <h4>Plrs</h4>
        <span></span>
      </nav>
      <div className='flex justify-between items-center h-10 bg-blue p-auto'>
        <span className='bg-cyan w-1 h-10 rounded-l-sm'></span>
        {props.children}</div>
      <button className='bg-light-blue'></button>
    </div>
  )
}

export default Modal
