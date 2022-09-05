import {
  dealerChipPositions,
  playerPositions,
  potPosition,
  userChipPositions,
  // combinationPosition,
} from './parameters'
import { TGameTable, TSeat, TSeatAvatar } from '../types'
// import ChipImage from 'Images/chip.svg'
import { isEqual } from 'lodash'
import Avatars from 'pages/account-edit/Avatars'
import CombinationLabel from 'images/svg-sources/CombinationLabel'

import ChipCanvas from 'Images/svg-sources/ChipCanvas'
import UserInfoPanel from 'Images/svg-sources/UserInfoPanel'
import UserInfoPanelActive from 'Images/svg-sources/UserInfoPanelActive'
import SbBbLabel from 'Images/svg-sources/SbBbLabel'
import CallCheckLabel from 'Images/svg-sources/CallCheckLabel'
import BetRaiseLabel from 'Images/svg-sources/BetRaiseLabel'
import FoldLabel from 'Images/svg-sources/FoldLabel'
import AllInLabel from 'Images/svg-sources/AllInLabel'
import UserChip from 'Images/svg-sources/UserChip'

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
export const createPlayers = (
  table: TGameTable,
  currentUserName: string,
  ctx: CanvasRenderingContext2D,
) => {
  if (table.seats) {
    const activeUserName = getActiveUserName(table)
    // Смещаем сидения так, чтобы наше было внизу посередине
    const seats = shiftSeats(table, currentUserName)

    seats.forEach((seat: any, id: number) => {
      if (seat !== null) {
        // Игрок прозрачный, если не в игре
        const opacity = seat.inHand ? 1 : 0.5

        ctx.beginPath()

        ctx.globalAlpha = opacity
        if (seat.name === activeUserName) {
          ctx.drawImage(
            UserInfoPanelActive,
            playerPositions[id][0] - 158,
            playerPositions[id][1] - 60,
          )
        } else {
          ctx.drawImage(UserInfoPanel, playerPositions[id][0] - 158, playerPositions[id][1] - 60)
        }
        ctx.globalAlpha = 1
        ctx.closePath()

        // Text
        ctx.beginPath()
        ctx.font = '32px Arial'

        // Username
        ctx.fillStyle = `rgba(255, 202, 97, ${1 * opacity})`
        ctx.textAlign = 'center'
        ctx.fillText(seat.name, playerPositions[id][0], playerPositions[id][1] - 5)

        // Balance
        ctx.fillStyle = `rgba(255, 255, 255, ${1 * opacity})`
        ctx.fillText('$ ' + seat.chipsInPlay, playerPositions[id][0], playerPositions[id][1] + 30)

        // Last action
        if (seat.name !== activeUserName) {
          // Last action label
          switch (seat.lastAction) {
            case 'SB':
              ctx.drawImage(SbBbLabel, playerPositions[id][0] - 50, playerPositions[id][1] - 65)
              break
            case 'BB':
              ctx.drawImage(SbBbLabel, playerPositions[id][0] - 50, playerPositions[id][1] - 65)
              break
            case 'Call':
              ctx.drawImage(
                CallCheckLabel,
                playerPositions[id][0] - 50,
                playerPositions[id][1] - 65,
              )
              break
            case 'Check':
              ctx.drawImage(
                CallCheckLabel,
                playerPositions[id][0] - 50,
                playerPositions[id][1] - 65,
              )
              break
            case 'Bet':
              ctx.drawImage(BetRaiseLabel, playerPositions[id][0] - 50, playerPositions[id][1] - 65)
              break
            case 'Raise':
              ctx.drawImage(BetRaiseLabel, playerPositions[id][0] - 50, playerPositions[id][1] - 65)
              break
            case 'Fold':
              ctx.drawImage(FoldLabel, playerPositions[id][0] - 50, playerPositions[id][1] - 65)
              break
            case 'All In':
              ctx.drawImage(AllInLabel, playerPositions[id][0] - 70, playerPositions[id][1] - 85)
              break
          }

          // Last action text
          ctx.font = '28px Arial'
          ctx.fillStyle = `rgba(0, 0, 0, ${1 * opacity})`
          ctx.fillText(seat.lastAction, playerPositions[id][0], playerPositions[id][1] - 39)
        }

        ctx.closePath()
      }
    })
  }
}
// Отрисовываем pot
export const createPot = (table: TGameTable, ctx: CanvasRenderingContext2D) => {
  if (table.pot[0].amount) {
    ctx.beginPath()
    ctx.font = '32px Arial'
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.textAlign = 'center'
    ctx.fillText('Pot: $ ' + table.pot[0].amount, potPosition[0], potPosition[1])
    ctx.closePath()
  }
}
export const createCurrentUserChip = (seat: TSeat, ctx: CanvasRenderingContext2D) => {
  if (seat.bet !== 0) {
    ctx.drawImage(UserChip, userChipPositions[0][0], userChipPositions[0][1])
    ctx.fillStyle = `rgba(255, 255, 255)`
    ctx.fillText(
      '$ ' + seat.bet,
      userChipPositions[0][0] + 130,
      userChipPositions[0][1] + 30,
    )
  }
}
export const createUserChips = (
  table: TGameTable,
  currentUserName: string,
  ctx: CanvasRenderingContext2D,
) => {
  if (table.seats) {
    // Рисуем фишку нашего игрока
    const seats = shiftSeats(table, currentUserName)
    seats.forEach((seat: TSeat, id: number) => {
      if (seat !== null) {
        if (seat.name === currentUserName) {
          createCurrentUserChip(seat, ctx)
        } else {
          if (seat.bet !== 0) {
            ctx.beginPath()
            ctx.drawImage(UserChip, userChipPositions[id][0], userChipPositions[id][1])
            ctx.fillStyle = `rgba(255, 255, 255)`
            ctx.fillText(
              '$ ' + seat.bet,
              userChipPositions[id][0] + 130,
              userChipPositions[id][1] + 30,
            )
            ctx.closePath()
          }
        }
      }
    })
  }
}
// Функция для нахождения относительного места дилера
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
// Отрисовываем фишку дилера
// todo Tests
export const createDealerChip = (
  table: TGameTable,
  currentUserName: string,
  ctx: CanvasRenderingContext2D,
) => {
  const dealerSeat = getRealDealerSeatId(table, currentUserName)
  // let chip = new Image()
  // chip.src = ChipImage
  // chip.onload = function () {
  if (dealerSeat !== null) {
    ctx.drawImage(
      ChipCanvas,
      dealerChipPositions[dealerSeat][0],
      dealerChipPositions[dealerSeat][1],
    )
  }
}
// }

export const getCombinationLabel = () => {}

// Отрисовываем плашку с комбинацией
export const createCombinationLabel = (rank = '', ctx: CanvasRenderingContext2D) => {
  if (rank) {
    // Название комбинации с заглавной
    const rankCapitalized = rank[0].toUpperCase() + rank.slice(1)

    // Желтая плашка комбинации
    ctx.drawImage(CombinationLabel, 1160, 1245)

    // Текст комбинации
    ctx.beginPath()

    ctx.font = '32px Arial'
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.textAlign = 'center'
    ctx.fillText(rankCapitalized, playerPositions[0][0], playerPositions[0][1] + 96)

    ctx.closePath()
  }
}

// Отрисовываем аватарки
export const createAvatars = (
  previousTableState: TGameTable | null,
  table: TGameTable,
  currentUserName: string,
  ctx: CanvasRenderingContext2D,
) => {
  // Смещаем сидения так, чтобы наше было внизу посередине
  const prevSeatsShifted = previousTableState ? shiftSeats(previousTableState, currentUserName) : []
  const currentSeatsShifted = shiftSeats(table, currentUserName)

  currentSeatsShifted.forEach((seat: any, id: number) => {
    // Создаем специальный объект prevSeatAvatarData состоящий из нужных для аватара полей
    // За изменениями этих полей мы следим и перерисовываем автар если нужно
    let prevSeatAvatarData: TSeatAvatar

    // Если в предыдущем игровом состоянии это место существовало
    if (prevSeatsShifted[id]) {
      prevSeatAvatarData = {
        name: prevSeatsShifted[id].name,
        inHand: prevSeatsShifted[id].inHand,
      }
    } else {
      prevSeatAvatarData = {}
    }

    let currentSeatAvatarData: TSeatAvatar
    if (seat) {
      currentSeatAvatarData = {
        name: seat.name,
        inHand: seat.inHand,
      }
    } else {
      currentSeatAvatarData = {}
    }

    // Если данные по пользователю обновились перерисовываем аватарку
    if (!isEqual(prevSeatAvatarData, currentSeatAvatarData)) {
      // Очищаем аватарку
      ctx.clearRect(
        playerPositions[id][0] - 112.5,
        playerPositions[id][1] - 277,
        150 * 1.5,
        150 * 1.5,
      )

      if (currentSeatAvatarData.name) {
        ctx.beginPath()
        ctx.globalAlpha = 1
        const avatar = new Image()
        avatar.src = Avatars[id].image

        // Если неактивен, делаем полупрозрачным
        if (!currentSeatAvatarData.inHand) {
          ctx.globalAlpha = 0.75
        }

        avatar.onload = function () {
          ctx.drawImage(
            avatar,
            playerPositions[id][0] - 112.5,
            playerPositions[id][1] - 277,
            avatar.width * 1.5,
            avatar.height * 1.5,
          )
        }
        ctx.closePath()
      }
    }
  })
}
