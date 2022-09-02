export type Nullable<T> = T | null

export type TPhase = 'preflop' | 'flop' | 'turn' | 'river' | 'smallBlind' | 'bigBlind'

export type TSeat = {
  name: string
  chipsInPlay: number
  sittingIn: boolean
  inHand: boolean
  hasCards: boolean
  cards: string[]
  bet: number
  currentHandBet: number
  lastAction: string
}

export type TPlayerPublic = {
  name: string
  chipsInPlay: number
  sittingIn: boolean
  inHand: boolean
  hasCards: boolean
  cards: string[]
  bet: number
  currentHandBet: number
  lastAction: string
  [key: string]: any
}

export type TEvaluatedHand = {
  rank: string
  name: string
  rating: number
  cards: string[]
  combination: string[]
}

export interface IPlayer {
  public: TPlayerPublic
  seat: Nullable<number>
  sitOut: Function
  prepareForNewRound: Function
  //ToDo указать нужный тип
  socket: any
  cards: string[]
  evaluateHand: Function
  evaluatedHand: TEvaluatedHand
  bet: Function
  fold: Function
  raise: Function
  sitOnTable: Function
  leaveTable: Function
}

export type TLog = {
  message: string
  action: string
  seat: string | number
  notification?: string
} | null

export type TPot = {
  amount: number
  contributors: number[]
}

export type TTablePublic = {
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
  seats: Nullable<TSeat>[]
  phase: Nullable<TPhase>
  board: string[]
  log: TLog
}

export type TCardNames = {
  [key: string]: string
}

export type TWinnersAndPots = {
  [key: string]: {
    player: Nullable<IPlayer>
    amount: number
  }
}
