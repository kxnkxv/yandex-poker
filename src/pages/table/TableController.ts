import { Socket } from 'socket.io-client'
import { TGameState, TGameTable, TWsResponse } from 'Pages/table/types'
import { AppDispatch } from 'Core/store'

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
}

class TableController {
  socket: Socket | null
  dispatch: AppDispatch
  gameState: TGameState
  setGameState: Function

  constructor(
    socket: Socket | null,
    dispatch: AppDispatch,
    gameState: TGameState,
    setGameState: Function,
  ) {
    this.socket = socket
    this.dispatch = dispatch
    this.gameState = gameState
    this.setGameState = setGameState

    //Навешиваем слушателей WS соединения
    this.addListeners()
  }

  //ACTIONS
  register(userName: string) {
    this.socket!.emit(Actions.Register, userName)
    console.log(Actions.Register, userName)
  }

  enterRoom(tableId: number) {
    this.socket!.emit(Actions.EnterRoom, tableId)
    console.log('enterRoom', tableId)
  }

  sitOnTheTable(seat: number, tableId: number, chips: number) {
    this.socket!.emit(Actions.SitOnTheTable, { seat, tableId, chips })
    console.log('sitOnTheTable', { seat, tableId, chips })
  }

  postBlind() {
    this.socket!.emit(Actions.PostBlind, true, (response: TWsResponse) => {
      if (response.success) {
        this.setGameState((state: TGameState) => {
          return { ...state, actionState: '' }
        })
      }
    })
  }

  check() {
    this.socket!.emit(Actions.Check, true, (response: TWsResponse) => {
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
          return { ...state, actionState: '' }
        })
      }
    })
  }

  disconnect() {
    this.socket!.disconnect()
  }

  //LISTENERS
  addListeners() {
    //Получили новое состояние стола
    this.socket!.on(Listeners.TableData, (data: TGameTable) => {
      this.setGameState((state: TGameState) => {
        return { ...state, table: data }
      })
    })

    //Показать кнопку postSmallBlind
    this.socket!.on(Listeners.PostSmallBlind, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.PostSmallBlind }
      })
    })

    //Показать кнопку postBigBlind
    this.socket!.on(Listeners.PostBigBlind, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.PostBigBlind }
      })
    })

    //Оппонент повысил ставку
    this.socket!.on(Listeners.ActBettedPot, () => {
      this.setGameState((state: TGameState) => {
        return { ...state, actionState: Listeners.ActBettedPot }
      })
    })
  }
}

export default TableController
