import { TUser } from '@/types/app'
import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from 'utils/axios/axios'

// Types
import { TAccountEditData } from './types'

export const editUser = createAsyncThunk(
  '@@auth/edit',
  (data: TAccountEditData, { rejectWithValue }) => {
    return $api.put<TUser>('v1/auth/user/profile', data).catch((err) => {
      console.log('Data error', data)
      return rejectWithValue(err.response.data)
    })
  },
)
