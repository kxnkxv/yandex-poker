import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateTable } from './TableSlice'
import { io, Socket } from 'socket.io-client'
import { createPlayers } from './canvas/Methods'
import './table.css'
import { TGameTable, TSeat } from './types'
import { RootState } from 'core/store'

const Table = (): JSX.Element => {
  // Получение id стола и имени пользователя
  const { name, seatId } = useParams()

  const [seatIdParams, setSeatIdParams] = useState(Number(seatId))

  const dispatch = useDispatch()

  // // ПОЛУЧАЕМ TABLE DATA
  // socket.on('table-data', (data: TGameTable) => {
  //   console.log(data)
  //   dispatch(updateTable(data))
  // })

  const table = useSelector((state: RootState) => state.table.data)

  const canvasRef = useRef(null)
  const webSocket = useRef<Socket | null>(null)

  // Выполняем регистрацию пользователя на бэке и вход на стол при создании компонента
  useEffect(() => {
    // Подключаемся
    const socket = io('https://poker-back.herokuapp.com/', { transports: ['websocket'] })
    webSocket.current = socket
    // РЕГИСТРИРУЕМ ИГРОКА
    socket.emit('register', name)
    // ЗАХОДИМ НА СТОЛ
    socket.emit('enterRoom', 1)
    // ПОЛУЧАЕМ TABLE DATA
    socket.on('table-data', (data: TGameTable) => {
      console.log(data)
      dispatch(updateTable(data))
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  // ОТРИСОВЫВАЕМ ПОЛЬЗОВАТЕЛЯ ЗА СТОЛОМ
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Сброс canvas при каждой перерисовке
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createPlayers(table, name as string, ctx)
      }
    }
  }, [table])
  useEffect(() => {
    // САДИМСЯ ЗА СТОЛ
    webSocket.current?.emit('sitOnTheTable', { seat: seatIdParams, tableId: 1, chips: 400 })
  }, [seatIdParams])

  // Массив id посадочных мест за столом
  const seats = [0, 1, 2, 3]

  // Проверяем сидит ли текущий user за столом
  const isOnTheTable = table.seats.some((seat: TSeat) => {
    if (seat) {
      return seat.name === name
    }
  })

  return (
    <div>
      <div className='table-wrapper'>
        <canvas ref={canvasRef} width='2560' height='1320' id='table' />
        {seats.map((seatId) =>
          table.seats[seatId] || isOnTheTable ? (
            ''
          ) : (
            <div
              key={seatId}
              className={`seat seat-${seatId}`}
              onClick={() => setSeatIdParams(seatId)}
            >
              Seat
              <br /> open
            </div>
          ),
        )}
      </div>
      <h2 className='text-white'>{name}</h2>
    </div>
  )
}

export default Table
