import { dealerChipPositions, playerPositions, potPosition } from './parameters'
import { TGameTable } from '../types'

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

//Отрисовываем фишку дилера
export const createDealerChip = (table: TGameTable, currentUserName: string, ctx: any) => {
  const dealerSeat = table.dealerSeat
  if (dealerSeat) {
    ctx.rect(dealerChipPositions[0][0] - 150, dealerChipPositions[1][1] - 50, 300, 100)
  }
  // const activeUserName = getActiveUserName(table)
  ctx.beginPath()
  ctx.setTransform(1, 0, 0, 1, 550, 750)
  ctx.scale(2, 2)
  ctx.fillStyle = `#85858F`
  ctx.fill(
    new Path2D(
      'M12.235 21.2089C18.5251 21.2089 23.6242 16.5954 23.6242 10.9044C23.6242 5.21334 18.5251 0.599854 12.235 0.599854C5.94497 0.599854 0.845856 5.21334 0.845856 10.9044C0.845856 16.5954 5.94497 21.2089 12.235 21.2089Z',
    ),
  )
  var grd = ctx.createLinearGradient(12.254, 0.599854, 12.254, 19.3353)
  grd.addColorStop(0, 'white')
  grd.addColorStop(1, '#B8B8BB')
  ctx.fillStyle = grd
  ctx.fill(
    new Path2D(
      'M12.254 19.3353C18.5336 19.3353 23.6242 15.1412 23.6242 9.96759C23.6242 4.79393 18.5336 0.599854 12.254 0.599854C5.97436 0.599854 0.883728 4.79393 0.883728 9.96759C0.883728 15.1412 5.97436 19.3353 12.254 19.3353Z',
    ),
  )
  ctx.fillStyle = 'white'
  ctx.fill(
    new Path2D(
      'M8.42407 17.4614V6.22016H12.1743C13.2099 6.20054 14.2351 6.42804 15.1628 6.88339C16.0074 7.30384 16.7095 7.9589 17.1829 8.76819C17.6706 9.61972 17.918 10.5851 17.8993 11.5635V12.1256C17.9204 13.1095 17.6715 14.0806 17.1792 14.9359C16.6985 15.7474 15.9848 16.3995 15.1287 16.8094C14.1779 17.26 13.1338 17.4846 12.0796 17.4652L8.42407 17.4614ZM10.6299 7.79582V15.9026H12.0701C12.5577 15.9345 13.0467 15.8654 13.5058 15.6999C13.9648 15.5344 14.384 15.2761 14.7365 14.9415C15.4021 14.177 15.7417 13.187 15.684 12.1799V11.556C15.7551 10.5452 15.4339 9.5456 14.7857 8.7607C14.4455 8.42521 14.0366 8.16554 13.5866 7.99913C13.1365 7.83271 12.6557 7.76339 12.1763 7.79582H10.6299Z',
    ),
  )
  ctx.fillStyle = 'black'
  ctx.fill(
    new Path2D(
      'M8.42407 15.5884V4.34712H12.1743C13.2099 4.32749 14.2351 4.55499 15.1628 5.01035C16.0074 5.43079 16.7095 6.08585 17.1829 6.89514C17.6706 7.74668 17.918 8.71208 17.8993 9.69047V10.2525C17.9204 11.2364 17.6715 12.2076 17.1792 13.0629C16.6985 13.8744 15.9848 14.5264 15.1287 14.9364C14.1779 15.387 13.1338 15.6115 12.0796 15.5921L8.42407 15.5884ZM10.6299 5.92278V14.0296H12.0701C12.5577 14.0614 13.0467 13.9924 13.5058 13.8269C13.9648 13.6614 14.384 13.4031 14.7365 13.0685C15.4021 12.304 15.7417 11.314 15.684 10.3069V9.68298C15.7551 8.67216 15.4339 7.67256 14.7857 6.88765C14.4455 6.55216 14.0366 6.2925 13.5866 6.12608C13.1365 5.95966 12.6557 5.89034 12.1763 5.92278H10.6299Z',
    ),
  )
  ctx.closePath()
}

//Отрисовываем карты на столе

//Отрисовываем фишку дилера
