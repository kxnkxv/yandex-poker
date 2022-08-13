import { createSlice } from '@reduxjs/toolkit'
import { TGameTable } from './types'

const initialState: { data: TGameTable } = {
  data: {
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
  },
}

export const tableSlice = createSlice({
  name: '@@table',
  initialState,
  reducers: {
    updateTable: (state, { payload }) => {
      state.data = payload
    },
  },
})

const tableReducer = tableSlice.reducer

export const { updateTable } = tableSlice.actions
export default tableReducer
