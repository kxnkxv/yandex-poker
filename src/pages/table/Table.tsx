import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import {createPlayers, createPot} from './canvas/Methods'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import BetSlider from 'Components/bet-slider/BetSlider'
import TableController from 'Pages/table/TableController'
import { Listeners } from './TableController'

//Styles
import './Table.css'

//Types
import { TSeat} from './types'
import { RootState } from 'Core/store'
import { initialGameState } from './initialGameState'

const Table: FC = () => {
  //Устанавливаем заголовок страницы в браузере
  useDocumentTitle('Table')

  // Получение id стола
  const { tableId } = useParams()

  //Получаем логин пользователя из redux
  const userName = useSelector((state: RootState) => state.auth.user.login)

  //Canvas элемент игрового стола
  const canvasRef = useRef(null)

  //Объявление контроллера для управления столом
  const [tableController, setTableController] = useState<TableController | null>(null)

  //Объявляем геттер и сеттер состояния иры
  const [gameState, setGameState] = useState(initialGameState)

  //Получаем состояние стола, экшен, id моего сидения, мои карты
  const { table, actionState, mySeat, myCards } = gameState

  //При первой отрисовке компонента
  useEffect(() => {
    //Устанавливаем WS соединение
    const socket = io('http://localhost:8080/', { transports: ['websocket'] })

    //Инициализируем контроллер для управления столом, прокинув туда WS, геттер и сеттер состояния стола
    const tc = new TableController(socket, gameState, setGameState)

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

        //Отрисовываем игроков
        createPlayers(table, userName as string, ctx)

        //Отрисовываем pot
        createPot(table, ctx)
      }
    }
  }, [gameState])

  // Массив id посадочных мест за столом
  const seats = [0, 1, 2, 3]

  // Проверяем сидит ли текущий user за столом
  const isOnTheTable = table.seats.some((seat: TSeat) => {
    if (seat) {
      return seat.name === userName
    }
  })

  //Обработчики действий во время игры
  const handleSit = (seat: number, tableId: number, chips: number) => tableController!.sitOnTheTable(seat, tableId, chips)
  const handlePostBlind = () => tableController!.postBlind()
  const handleCheck = () => tableController!.check()
  const handleFold = () => tableController!.fold()
  const handleCall = () => tableController!.call()
  const handleRaise = (value: number) => { tableController!.raise(value) }
  const handleBet = (value: number) => { tableController!.bet(value) }



  //Расчет минимальной возможной ставки в текущий момент
  const minBetAmount = () => {
    console.log('MYSEAT',mySeat, table.seats)
    if (mySeat === null /*|| table.seats[mySeat] === 'undefined'*/ || table.seats[mySeat] === null) return 0

    if (actionState === Listeners.ActBettedPot) {
      //ОБЯЗАТЕЛЬНО ПРОТЕСТИТЬ
      let proposedBet = +table!.biggestBet + table!.bigBlind!
      console.log('MBA', proposedBet)
      return table.seats[mySeat].chipsInPlay < proposedBet ? table.seats[mySeat].chipsInPlay : proposedBet
    } else {
      return table.seats[mySeat].chipsInPlay < table!.bigBlind! ? table.seats[mySeat].chipsInPlay : table!.bigBlind!
    }
  }

  //Расчет максимальной возможной ставки в текущий момент
  const maxBetAmount = () => {
    if (mySeat === null /*|| table.seats[mySeat] === 'undefined'*/ || table.seats[mySeat] === null) return 0

    return actionState === Listeners.ActBettedPot ? table.seats[mySeat].chipsInPlay + table.seats[mySeat].bet : table.seats[mySeat].chipsInPlay
  }

  //Управление ставкой (слайдер)
  const [betValue, setBetValue] = useState<number>(0)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setBetValue(newValue as number)
  }

  //Условие для кнопки FOLD
  const showFoldButton = () => {
    return (
      actionState === Listeners.ActNotBettedPot ||
      actionState === Listeners.ActBettedPot ||
      actionState === Listeners.ActBettedPot
    )
  }

  //Условие для кнопки CHECK
  const showCheckButton = () => {
    if (mySeat !== null) {
      if (table.seats[mySeat]) {
        return (
            actionState === Listeners.ActNotBettedPot ||
            (actionState === Listeners.ActBettedPot && table.biggestBet == table.seats[mySeat].bet)
        )
      }
    }
  }

  //Условие для кнопки CALL
  const showCallButton = () => {
    if (mySeat !== null) {
      return (
          actionState === Listeners.ActOthersAllIn ||
          actionState === Listeners.ActBettedPot &&
          !(actionState === Listeners.ActBettedPot && table.biggestBet == table.seats[mySeat].bet)
      )
    }
  }

  //Условие для кнопки BET
  const showBetButton = () => {
    if (mySeat !== null) {
      return (
          actionState === Listeners.ActNotBettedPot &&
          table.seats[mySeat].chipsInPlay &&
          table.biggestBet < table.seats[mySeat].chipsInPlay
      )
    }
  }

  //Условие для кнопки RAISE
  const showRaiseButton = () => {
    if (mySeat !== null) {
      return (
          actionState === Listeners.ActBettedPot &&
          table.seats[mySeat].chipsInPlay &&
          table.biggestBet < table.seats[mySeat].chipsInPlay
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
      <div className='h1 text-white text-center'>
        <span>Table cards: </span>
        { table.board.length > 0 &&
            table.board.map(
                (card:string, key) => <span key={key}>[{card}]</span>
            )
        }
      </div>
      <div className='h1 text-white text-center'>
        <span>My cards: </span>
        { myCards.length > 0 ?
         myCards.map(
            (card:string, key) => <span key={key}>[{card}]</span>
        )
            : (<span>[][]</span>)
        }
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

          {showCallButton() && (
              <a
                  className='btn-action btn-action-green items-center whitespace-nowrap inline-flex justify-center'
                  onClick={handleCall}
              >
                Call
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

          {showBetButton() && (
              <>
                <a
                    className='btn-action btn-action-blue items-center whitespace-nowrap inline-flex justify-center'
                   onClick={()=>handleBet(betValue || minBetAmount())}>
                  Bet {betValue || minBetAmount()}
                </a>
                <div className='col-span-2 slider items-center whitespace-nowrap inline-flex justify-center p-5'>
                  <div className='w-full'>
                    <div>Change bet value</div>
                    <BetSlider
                      value={typeof betValue === 'number' ? betValue : 0}
                      onChange={handleSliderChange}
                      aria-labelledby='input-slider'
                    />
                  </div>
                </div>
              </>
          )}

          {showRaiseButton() && (
              <>
                <a
                    className='btn-action btn-action-blue items-center whitespace-nowrap inline-flex justify-center'
                    onClick={()=>handleRaise(betValue || minBetAmount())}>
                    Raise {betValue || minBetAmount()}
                </a>
                <div className='col-span-2 slider items-center whitespace-nowrap inline-flex justify-center p-5'>
                  <div className='w-full'>
                    <div>Change raise value</div>
                    <BetSlider
                        value={ betValue || minBetAmount() }
                        onChange={handleSliderChange}
                        aria-labelledby='input-slider'
                        min={minBetAmount()}
                        max={maxBetAmount()}
                    />
                  </div>
                </div>
              </>
          )}


        </div>
      </div>
    </div>
  )
}

export default Table
