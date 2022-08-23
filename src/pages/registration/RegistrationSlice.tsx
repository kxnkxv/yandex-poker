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

const initialState: TRegInitialState = {
  isPending: false,
  newRegistration: false,
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
        state.newRegistration = false
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isPending = false
        state.newRegistration = true
      })
      .addCase(registration.rejected, (state, action) => {
        state.isPending = false
        state.newRegistration = false
        let data = action.payload as TErrorPayload
        errorHandler(data.reason)
      })
  },
})

export const registrationReducer = registrationSlice.reducer
