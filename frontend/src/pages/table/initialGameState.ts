import { TGameState, TGameTable } from './types'

const initialTableState: TGameTable = {
  id: 0,
  name: '',
  seatsCount: 0,
  playersSeatedCount: 0,
  bigBlind: null,
  smallBlind: null,
  minBuyIn: 0,
  maxBuyIn: 0,
  pot: [
    {
      amount: 0,
      contributors: [],
    },
  ],
  biggestBet: 0,
  dealerSeat: null,
  activeSeat: null,
  seats: [],
  phase: null,
  board: ['', '', '', '', ''],
  log: {
    message: '',
    action: '',
    seat: '',
    notification: '',
  },
}

export const initialGameState: TGameState = {
  table: initialTableState,
  notifications: [],
  showChipsModal: false,
  actionState: '',
  myCards: [],
  winModal: {
    isOpened: false,
    amount: 0,
  },
  combination: {
    rank: '',
    cards: [],
  },
  mySeat: null,
  betAmount: 0,
  sittingOnTable: null
}
