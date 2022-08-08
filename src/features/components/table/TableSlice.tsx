import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    id: null,
    name: '',
    seatsCount: null,
    playersSeatedCount: null,
    bigBlind: null,
    smallBlind: null,
    minBuyIn: null,
    maxBuyIn: null,
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