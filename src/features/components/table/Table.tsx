import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTable } from './TableSlice'
import { io } from 'socket.io-client'
import { createPlayers } from './canvas/Methods'
import './table.css'
//Подключаемся
const socket = io('https://poker-back.herokuapp.com/', { transports: ['websocket'] })

//РЕГИСТРИРУЕМ ИГРОКА
const register = (name: string) => {
  socket.emit('register', name)
}
//ЗАХОДИМ НА СТОЛ
const enterRoom = (tableId: number) => {
  socket.emit('enterRoom', tableId)
}

//САДИМСЯ ЗА СТОЛ
const sitOnTheTable = (seatId: number) => {
  socket.emit('sitOnTheTable', { seat: seatId, tableId: 1, chips: 400 })
}

const Table = () => {
  //Получение id стола и имени пользователя
  let { name } = useParams()

  const dispatch = useDispatch()

  //ПОЛУЧАЕМ TABLE DATA
  socket.on('table-data', (data) => {
    console.log(data)
    dispatch(updateTable(data))
  })

  const table = useSelector((state: any) => state.table.data)

  const canvasRef = useRef(null)

  //ОТРИСОВЫВАЕМ ПОЛЬЗОВАТЕЛЯ ЗА СТОЛОМ
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      if (ctx) {
        //Сброс canvas при каждой перерисовке
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createPlayers(table, name as string, ctx)
      }
    }
  }, [table])

  //Выполняем регистрацию пользователя на бэке и вход на стол при создании компонента
  useEffect(() => {
    register(name as string)
    enterRoom(1)
  }, [])

  //Массив id посадочных мест за столом
  const seats = [0, 1, 2, 3]

  //Проверяем сидит ли текущий user за столом
  const isOnTheTable = table.seats.some((seat: any) => {
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
              onClick={() => sitOnTheTable(seatId)}
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
