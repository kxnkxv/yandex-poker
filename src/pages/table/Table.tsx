import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { createPlayers } from './canvas/Methods'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import { Input } from '@mui/material'
import BetSlider from 'Components/bet-slider/BetSlider'
import TableController from 'Pages/table/TableController'
import { Listeners } from './TableController'

//Styles
import './Table.css'

//Types
import { TSeat } from './types'
import { RootState } from 'Core/store'
import { initialGameState } from './initialGameState'

const Table: FC = () => {
  useDocumentTitle('Table')
  // Получение id стола и имени пользователя
  const { tableId } = useParams()
  const dispatch = useDispatch()

  //Получаем логин пользователя из redux
  const userName = useSelector((state: RootState) => state.auth.user.login)

  //Управление ставкой (слайдер)
  const [betValue, setBetValue] = useState<number | string | Array<number | string>>(30)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setBetValue(newValue)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBetValue(event.target.value === '' ? '' : Number(event.target.value))
  }

  //Canvas элемент игрового стола
  const canvasRef = useRef(null)

  //Объявление контроллера для управления столом
  const [tableController, setTableController] = useState<TableController | null>(null)

  //Объявляем объект состояния иры
  const [gameState, setGameState] = useState(initialGameState)
  const [mySeat, setMySeat] = useState<number | null>(null)

  const { table, actionState } = gameState

  //При первой отрисовке компонента
  useEffect(() => {
    //Устанавливаем WS соединение
    const socket = io('http://localhost:8080/', { transports: ['websocket'] })

    //Инициализируем контроллер для управления столом
    const tc = new TableController(socket, dispatch, gameState, setGameState)

    //Добавляем контроллер для управления столом в state
    setTableController(() => tc)

    // Регистрируем игрока
    tc.register(userName)

    // Заходим в комнату
    tc.enterRoom(Number(tableId))

    return () => {
      //Разрываем WS соединение при размонтировании компонента
      tc.disconnect()
    }
  }, [])

  //Перерисовываем стол при изменении состояния игры
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Сброс canvas при каждой перерисовке
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createPlayers(table, userName as string, ctx)
      }
    }
  }, [gameState])

  // Массив id посадочных мест за столом
  const seats = [0, 1, 2, 3]

  // Проверяем сидит ли текущий user за столом
  let isOnTheTable = table.seats.some((seat: TSeat) => {
    if (seat) {
      return seat.name === userName
    }
  })

  //Handlers
  const handleSit = (seat: number, tableId: number, chips: number) => {
    setMySeat(seat)
    tableController!.sitOnTheTable(seat, tableId, chips)
  }
  const handlePostBlind = () => tableController!.postBlind()
  const handleCheck = () => tableController!.check()
  const handleFold = () => tableController!.fold()

  //Условия для показа различных кнопок
  const showFoldButton = () => {
    return (
      actionState === Listeners.ActNotBettedPot ||
      actionState === Listeners.ActBettedPot ||
      actionState === Listeners.ActBettedPot
    )
  }

  const showCheckButton = () => {
    if (mySeat) {
      return (
        actionState === Listeners.ActNotBettedPot ||
        (actionState === Listeners.ActBettedPot && table.biggestBet == table.seats[mySeat].bet)
      )
    }
  }

  console.log('GAME STATE', gameState)

  return (
    <div>
      <div className='table-wrapper'>
        <canvas ref={canvasRef} width='2560' height='1320' id='table' />
        {seats.map(
          (seat) =>
            !isOnTheTable &&
            !table.seats[seat] && (
              <div
                key={seat}
                className={`seat seat-${seat}`}
                onClick={() => handleSit(seat, Number(tableId), 400)}
              >
                Seat
                <br /> open
              </div>
            ),
        )}
      </div>
      <div className='table-controls p-5 grid grid-cols-5 gap-5'>
        <div className='table-controls-log_wrapper col-span-1'>
          <div className='log'>
            <div className='log-messages p-5'>
              <div className='log-messages-item'>Message</div>
            </div>
          </div>
        </div>
        <div className='table-controls-buttons_wrraper col-span-4 grid grid-cols-5 gap-5'>
          {showFoldButton() && (
            <a
              className='btn-action btn-action-red items-center whitespace-nowrap inline-flex justify-center'
              onClick={handleFold}
            >
              Fold
            </a>
          )}

          {showCheckButton() && (
            <a
              className='btn-action btn-action-green items-center whitespace-nowrap inline-flex justify-center'
              onClick={handleCheck}
            >
              Check
            </a>
          )}

          {actionState === Listeners.PostSmallBlind && (
            <a
              className='btn-action btn-action-green items-center whitespace-nowrap inline-flex justify-center'
              onClick={handlePostBlind}
            >
              Small blind
            </a>
          )}

          {actionState === Listeners.PostBigBlind && (
            <a
              className='btn-action btn-action-green items-center whitespace-nowrap inline-flex justify-center'
              onClick={handlePostBlind}
            >
              Big blind
            </a>
          )}

          <a className='btn-action btn-action-blue items-center whitespace-nowrap inline-flex justify-center'>
            Bet {betValue}
          </a>
          <div className='col-span-2 slider items-center whitespace-nowrap inline-flex justify-center p-5'>
            <div className='w-full'>
              <div>Change bet value</div>
              <BetSlider
                value={typeof betValue === 'number' ? betValue : 0}
                onChange={handleSliderChange}
                aria-labelledby='input-slider'
              />
              <Input
                value={betValue}
                size='small'
                onChange={handleInputChange}
                className='invisible'
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
