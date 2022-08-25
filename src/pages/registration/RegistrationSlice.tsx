import { createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'Utils/axios/axios'
import errorHandler from 'Utils/error-handler/errorHandler'

//Types
import { TSignUpForm } from './types'


export const registration = createAsyncThunk(
  '@@registration/signup',
  (request: TSignUpForm) => {
    return axios.post('auth/signup', request).catch((err) => {
      console.log(err.response.data)
      errorHandler(err.response.data.reason)
      //return rejectWithValue(err.response.data)
    })
  },
)

