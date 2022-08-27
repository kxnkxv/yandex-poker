import { dealerChipPositions, playerPositions, potPosition } from './parameters'
import { TGameTable } from '../types'
import ChipImage from 'Images/chip.svg'

// Todo:Нужен рефактор
// Метод, перемещающий игроков так, чтобы мы были внизу посередине
export const shiftSeats = (table: TGameTable, currentUserName: string) => {
  let allSeats: any = []
  // Место нашего игрока
  let ourSeat = null
  for (let i = 0; i < table.seatsCount; i++) {
    if (table.seats[i]) {
      allSeats.push(table.seats[i])
      // Определяем наше место
      if (table.seats[i].name === currentUserName) {
        ourSeat = i
      }
    } else {
      allSeats.push(null)
    }
  }
  // Если мы сидим за столом, то перемещаем массив игроков так, чтобы мы были в 0 позиции
  if (ourSeat) {
    allSeats = [].concat(allSeats.slice(ourSeat), allSeats.slice(0, ourSeat))
  }

  return allSeats
}

const getActiveUserName = (table: TGameTable) => {
  for (let i = 0; i < table.seatsCount; i++) {
    if (i === table.activeSeat) {
      if (table.seats[i].name) return table.seats[i].name
    }
  }
  return false
}

// Метод для отрисовки игроков на своих местах
export const createPlayers = (table: TGameTable, currentUserName: string, ctx: any) => {
  if (table.seats) {
    const activeUserName = getActiveUserName(table)
    // Смещаем сидения так, чтобы наше было внизу посередине
    const seats = shiftSeats(table, currentUserName)

    seats.forEach((seat: any, id: number) => {
      if (seat !== null) {
        //Игрок прозрачный, если не в игре
        let opacity = seat.inHand ? 1 : 0.5

        ctx.beginPath()
        ctx.rect(playerPositions[id][0] - 150, playerPositions[id][1] - 50, 300, 100)

        ctx.lineJoin = 'round'
        ctx.lineWidth = 5
        if (seat.name === activeUserName) {
          ctx.strokeStyle = `rgba(255, 202, 97, ${1 * opacity})`
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * opacity})`
        }

        ctx.fillStyle = `rgba(0, 0, 0, ${0.7 * opacity})`
        ctx.fill()

        ctx.stroke()

        // Text
        ctx.font = '32px Arial'
        ctx.fillStyle = `rgba(255, 202, 97, ${1 * opacity})`
        ctx.textAlign = 'center'
        ctx.fillText(seat.name, playerPositions[id][0], playerPositions[id][1] - 7)
        ctx.fillStyle = `rgba(255, 255, 255, ${1 * opacity})`
        ctx.fillText('$ ' + seat.chipsInPlay, playerPositions[id][0], playerPositions[id][1] + 30)
        ctx.closePath()
      }
    })
  }
}
//Отрисовываем pot
export const createPot = (table: TGameTable, ctx: any) => {
  if (table.pot[0].amount) {
    ctx.beginPath()
    console.log('POT = ', table.pot)
    ctx.font = '32px Arial'
    ctx.fillStyle = `rgba(255, 255, 255, 1)`
    ctx.textAlign = 'center'
    ctx.fillText('Pot: $ ' + table.pot[0].amount, potPosition[0], potPosition[1])
    ctx.closePath()
  }
}
//Функция для нахождения относительного места дилера
function getRealDealerSeatId(table: TGameTable, currentUserName: string) {
  let result = null
  if (table?.dealerSeat !== null) {
    const user = table.seats[table.dealerSeat]
    if (user) {
      const seats = shiftSeats(table, currentUserName)
      seats.forEach((seat: any, id: number) => {
        if (seat && seat.name == user.name) {
          result = id
        }
      })
    }
  }
  return result
}
//Отрисовываем фишку дилера
//todo Tests
export const createDealerChip = (table: TGameTable, currentUserName: string, ctx: any) => {
  let dealerSeat = getRealDealerSeatId(table, currentUserName)
  let chip = new Image()
  chip.src = ChipImage
  chip.onload = function () {
    if (dealerSeat !== null) {
      ctx.drawImage(chip, dealerChipPositions[dealerSeat][0], dealerChipPositions[dealerSeat][1])
    }
  }
}

//Отрисовываем карты на столе
