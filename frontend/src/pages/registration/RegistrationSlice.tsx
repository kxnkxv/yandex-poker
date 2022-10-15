import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from 'utils/axios/axios'
import errorHandler from 'utils/error-handler/errorHandler'

// Types
import { TSignUpForm } from './types'

export const registration = createAsyncThunk(
  '@@auth/registration',
  (request: TSignUpForm, { rejectWithValue }) => {
    return $api.post('v1/auth/registration', request).catch((err) => {
      errorHandler(err.response.data.reason)
      return rejectWithValue(err.response.data)
    })
  },
)
