import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'Utils/axios/axios'
import errorHandler from 'Utils/error-handler/errorHandler'

//Types
import { TSignUpForm, TRegInitialState } from './types'
import { TErrorPayload } from 'Types/app'

export const registration = createAsyncThunk(
  '@@registration/signup',
  (request: TSignUpForm, { rejectWithValue }) => {
    return axios.post('auth/signup', request).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const checkReg = createAsyncThunk('@@registration/user', (_, { rejectWithValue }) => {
  return axios.get('auth/user').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})

const initialState: TRegInitialState = {
  isPending: false,
  newReg: false,
}

const registrationSlice = createSlice({
  name: '@@registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Registration
      .addCase(registration.pending, (state) => {
        state.isPending = true
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isPending = false
      })
      .addCase(registration.rejected, (state, action) => {
        state.isPending = false
        let data = action.payload as TErrorPayload
        errorHandler(data.reason)
      })
      .addCase(checkReg.fulfilled, (state, action) => {
        if (action.payload.data) {
          let d_name = action.payload.data.display_name
          if (typeof d_name === 'string' && d_name.includes('avatar')) {
            action.payload.data.display_name = d_name.replace('avatar', '')
          } else {
            action.payload.data.display_name = 0
          }
          state.newReg = action.payload.data ? true : false
        }
      })
      .addCase(checkReg.rejected, (state, action) => {
        state.newReg = false
      })
  },
})

export const registrationReducer = registrationSlice.reducer
