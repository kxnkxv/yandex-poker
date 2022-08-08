import { configureStore } from '@reduxjs/toolkit'
import tableReducer from '../../features/components/table/TableSlice'

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
})