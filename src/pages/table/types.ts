export type TPot = {
  amount: number
  contributors: number[]
}

export type TPhase = 'preflop' | 'flop' | 'turn' | 'river' | 'smallBlind' | 'bigBlind'

export type TSeat = {
  name: string
  chipsInPlay: number
  sittingIn: boolean
  inHand: boolean
  hasCards: boolean
  cards: string[]
  bet: number
}

export type TLog = {
  message: string
  action: string
  seat: string | number
  notification: string
}

export type TGameTable = {
  id: number
  name: string
  seatsCount: number
  playersSeatedCount: number
  bigBlind: Nullable<number>
  smallBlind: Nullable<number>
  minBuyIn: number
  maxBuyIn: number
  pot: TPot[]
  biggestBet: number
  dealerSeat: Nullable<number>
  activeSeat: Nullable<number>
  seats: TSeat[]
  phase: Nullable<TPhase>
  board: string[]
  log: TLog
}
