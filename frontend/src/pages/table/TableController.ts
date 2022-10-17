import { Socket } from 'socket.io-client'
import { TCombination, TGameState, TGameTable, TWsResponse } from './types'

// Sounds
import chipsSound from 'pages/table/sounds/chips.mp3'
import winSound from 'pages/table/sounds/win31.mp3'
import allInSound from 'pages/table/sounds/allIn.mp3'
import cardsShuffleSound from 'pages/table/sounds/cardshuffle.mp3'
import foldSound from 'pages/table/sounds/fold.mp3'
import betSound from 'pages/table/sounds/bet.mp3'
import raiseSound from 'pages/table/sounds/raise.mp3'
import combinationSound from 'pages/table/sounds/combination.mp3'
import myturnSound from 'pages/table/sounds/myturn.mp3'

export enum Actions {
  Register = 'register',
  EnterRoom = 'enterRoom',
  LeaveRoom = 'leaveRoom',
  SitOnTheTable = 'sitOnTheTable',
  LeaveTable = 'leaveTable',
  PostBlind = 'postBlind',
  Check = 'check',
  Fold = 'fold',
  Call = 'call',
  Bet = 'bet',
  Raise = 'raise',
}

export enum Listeners {
  TableData = 'table-data',
  PostSmallBlind = 'postSmallBlind',
  PostBigBlind = 'postBigBlind',
  ActNotBettedPot = 'actNotBettedPot',
  ActBettedPot = 'actBettedPot',
  ActOthersAllIn = 'actOthersAllIn',
  DealingCards = 'dealingCards',
  EndRound = 'endRound',
  Combination = 'combination',
  YouWin = 'youWin',
}

class TableController {
  socket: Socket | null
  gameState: TGameState
  setGameState: Function
  playChipsSound: HTMLAudioElement
  playWinSound: HTMLAudioElement
  playAllInSound: HTMLAudioElement
  playCardsShuffleSound: HTMLAudioElement
  playFoldSound: HTMLAudioElement
  playBetSound: HTMLAudioElement
  playRaiseSound: HTMLAudioElement
  playCombinationSound: HTMLAudioElement
  playMyturnSound: HTMLAudioElement

  constructor(socket: Socket | null, gameState: TGameState, setGameState: Function) {
    this.socket = socket
    this.gameState = gameState
    this.setGameState = setGameState
    this.playChipsSound = new Audio(chipsSound)
    this.playWinSound = new Audio(winSound)
    this.playAllInSound = new Audio(allInSound)
    this.playCardsShuffleSound = new Audio(cardsShuffleSound)
    this.playFoldSound = new Audio(foldSound)
    this.playBetSound = new Audio(betSound)
    this.playRaiseSound = new Audio(raiseSound)
    this.playCombinationSound = new Audio(combinationSound)
    this.playMyturnSound = new Audio(myturnSound)

    // Навешиваем слушателей WS соединения
    this.addListeners()
  }

  // ACTIONS
  register(userName: string) {
    console.log('userName', userName)
    this.socket!.emit(Actions.Register, userName, (response: TWsResponse) => {
      console.log(response)
    })
  }

  enterRoom(tableId: number) {
    this.socket!.emit(Actions.EnterRoom, tableId)
  }

  sitOnTheTable(seat: number, tableId: number, chips: number) {
    this.setGameState((state: TGameState) => {
      return { ...state, mySeat: seat }
    })

    this.socket!.emit(Actions.SitOnTheTable, { seat, tableId, chips }, (response: TWsResponse) => {
      if (response.success) {
        console.log('Успешная посадка за стол', response)
      }
    })
    console.log('sitOnTheTable', { seat, tableId, chips })
  }

  postBlind() {
    this.socket!.emit(Actions.PostBlind, true, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          this.playChipsSound.play()
          return { ...state, actionState: '' }
        })
      }
    })
  }

  check() {
    this.socket!.emit(Actions.Check, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          return { ...state, actionState: '' }
        })
      }
    })
  }

  fold() {
    this.socket!.emit(Actions.Fold, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          this.playFoldSound.play()
          return { ...state, actionState: '' }
        })
      }
    })
  }

  call() {
    this.socket!.emit(Actions.Call, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          this.playChipsSound.play()
          return { ...state, actionState: '' }
        })
      }
    })
  }

  bet(value: number) {
    this.socket!.emit(Actions.Bet, value, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          this.playBetSound.play()
          return { ...state, actionState: '' }
        })
      }
    })
  }

  raise(value: number) {
    this.socket!.emit(Actions.Raise, value, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          this.playRaiseSound.play()
          return { ...state, actionState: '' }
        })
      }
    })
  }

  disconnect() {
    this.socket!.disconnect()
  }

  // LISTENERS
  addListeners() {
    // Получили новое состояние стола
    this.socket!.on(Listeners.TableData, (data: TGameTable) => {
      this.setGameState((state: TGameState) => {
        return { ...state, table: data }
      })
    })

    // Показать кнопку postSmallBlind
    this.socket!.on(Listeners.PostSmallBlind, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.PostSmallBlind }
      })
    })

    // Показать кнопку postBigBlind
    this.socket!.on(Listeners.PostBigBlind, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.PostBigBlind }
      })
    })

    // Оппонент повысил ставку
    this.socket!.on(Listeners.ActBettedPot, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.ActBettedPot }
      })
    })
    // Кто-то из оппонентов пошел в All in
    this.socket!.on(Listeners.ActOthersAllIn, () => {
      this.setGameState((state: TGameState) => {
        this.playAllInSound.play()
        return { ...state, actionState: Listeners.ActOthersAllIn }
      })
    })

    // Оппонент не повышал ставку
    this.socket!.on(Listeners.ActNotBettedPot, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.ActNotBettedPot }
      })
    })

    // Пришли карты на руки
    this.socket!.on(Listeners.DealingCards, (cards: string[]) => {
      this.setGameState((state: TGameState) => {
        this.playCardsShuffleSound.play()
        return { ...state, myCards: cards }
      })
    })

    // Собрали комбинацию
    this.socket!.on(Listeners.Combination, (combination: TCombination) => {
      this.setGameState((state: TGameState) => {
        return { ...state, combination }
      })
    })

    // Раздача окончена
    this.socket!.on(Listeners.EndRound, (cards: string[]) => {
      this.setGameState((state: TGameState) => {
        this.playCombinationSound.play()
        return { ...state, myCards: [] }
      })
    })

    // Вы выиграли
    this.socket!.on(Listeners.YouWin, (amount: number) => {
      // Показываем модалку
      this.setGameState((state: TGameState) => {
        this.playWinSound.play()
        return { ...state, winModal: { isOpened: true, amount } }
      })

      // Скрываем через 3.2 сек
      setTimeout(() => {
        this.setGameState((state: TGameState) => {
          return { ...state, winModal: { isOpened: false, amount: 0 } }
        })
      }, 5200)
    })
  }
}

export default TableController
