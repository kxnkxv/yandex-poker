import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'Utils/axios/axios'
// import errorHandler from 'Utils/error-handler/errorHandler'

// Types
import { TAccountEditData } from './types'

export const editUser = createAsyncThunk(
  '@@account/edit',
  (data: TAccountEditData, { rejectWithValue }) => {
    return axios.put('user/profile', data).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)
