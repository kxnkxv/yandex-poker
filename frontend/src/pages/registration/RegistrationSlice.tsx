import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'utils/axios/axios'
import errorHandler from 'utils/error-handler/errorHandler'

// Types
import { TSignUpForm } from './types'

export const registration = createAsyncThunk('@@auth/registration', (request: TSignUpForm ) => {
  return axios.post('v1/auth/registration', request).catch((err) => {
    errorHandler(err.response.data.reason)
    // return rejectWithValue(err.response.data)
  })
})

