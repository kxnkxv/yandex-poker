import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'utils/axios/axios'

export const logout = createAsyncThunk('@@auth/user', (_, { rejectWithValue }) => {
  return axios.post('v1/auth/logout').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})