import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from 'utils/axios/axios'
import { TAuthResponse } from '../login/types'

// Types
import { TSignUpForm } from './types'

export const registration = createAsyncThunk(
  '@@auth/registration',
  (request: TSignUpForm, { rejectWithValue }) => {
    return $api.post<TAuthResponse>('v1/auth/registration', request).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)
