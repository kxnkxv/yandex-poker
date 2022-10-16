import errorHandler from '@/utils/error-handler/errorHandler'
import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from 'utils/axios/axios'

// Types
import { TAccountEditData } from './types'

export const editUser = createAsyncThunk(
  '@@auth/edit',
  (data: TAccountEditData, { rejectWithValue }) => {
    return $api.put('v1/auth/user/profile', data).catch((err) => {
      errorHandler(err.response.data.reason)
      return rejectWithValue(err.response.data)
    })
  },
)
