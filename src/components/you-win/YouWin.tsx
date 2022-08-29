import React, { FC, useEffect, useRef, useState } from 'react'
import YouWinImage from 'Images/youWin.svg'
import confetti from 'canvas-confetti'

//Styles
import './YouWin.css'

//Types
import { TProps } from './types'

const YouWin: FC<TProps> = ({ isOpened, amount }) => {
  const canvasConfetti = useRef(null)
  const [winModalClass, setWinModalClass] = useState('')

  //При первой отрисовке компонента
  useEffect(() => {
    if (canvasConfetti.current) {
      let winConfetti = confetti.create(canvasConfetti.current, { resize: true })
      winConfetti({
        scalar: 5,
        spread: 500,
        origin: {
          y: 0.3,
        },
      })

      if (isOpened) {
        setTimeout(() => {
          setWinModalClass('win-modal-zoomed')
        }, 1)

        setTimeout(() => {
          setWinModalClass('')
          winConfetti.reset()
        }, 5000)
      }
    }
  }, [isOpened])

  return (
    <>
      <div
        className={
          'you-win-wrapper items-center justify-center' +
          (isOpened ? ' you-win-wrapper-opened' : '')
        }
      >
        <canvas id='confetti-canvas' ref={canvasConfetti}></canvas>
        <div className={'win-modal text-center ' + winModalClass}>
          <img src={YouWinImage} alt='You win!' className='gold-text' />
          <div className='win-amount'>$ {amount}</div>
        </div>
      </div>
    </>
  )
}

export default YouWin
