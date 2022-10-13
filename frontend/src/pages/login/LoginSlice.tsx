/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import errorHandler from 'utils/error-handler/errorHandler'

// Types
import { TSignInForm, TAuthInitialState } from './types'
import { TErrorPayload } from 'types/app'
import { registration } from '../registration/RegistrationSlice'
import $api from 'utils/axios/axios'
import axios from 'axios'
import config from '@/config'
//Todo:Типизировать запросы типами
export const login = createAsyncThunk(
  '@@auth/login',
  ({ login, password }: TSignInForm, { rejectWithValue }) => {
    return $api.post('v1/auth/login', { login, password }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const checkAuth = createAsyncThunk('@@auth/user', (_, { rejectWithValue }) => {
  return axios.get(`${config.API_URL}/v1/auth/refresh`, { withCredentials: true }).catch((err) => {
    return rejectWithValue(err.response.data)
  })
})

export const logout = createAsyncThunk('@@auth/logout', (_, { rejectWithValue }) => {
  return $api.post('v1/auth/logout').catch((err) => {
    localStorage.removeItem('token')
    return rejectWithValue(err.response.data)
  })
})

const initialState: TAuthInitialState = {
  isPending: false,
  user: {
    id: '',
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
    img_link: '',
  },
}
const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(login.pending, (state) => {
        state.isPending = true
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.isPending = false
          state.user = action.payload.data?.user
          localStorage.setItem('token', JSON.stringify(action.payload.data.accessToken))
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        const data = action.payload as TErrorPayload
        errorHandler(data.reason)
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isPending = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPending = false
        localStorage.removeItem('token')
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null
      })
      .addCase(registration.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data?.user
          localStorage.setItem('token', JSON.stringify(action.payload.data.accessToken))
          state.isPending = true
        }
      })
      .addCase(registration.pending, (state, action) => {
        state.isPending = true
      })
      .addCase(registration.rejected, (state, action) => {
        state.isPending = false
        console.log('Action Reg Ful Rej', action.payload)
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isPending = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data?.user
          localStorage.setItem('token', JSON.stringify(action.payload.data.accessToken))
          state.isPending = false
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isPending = false
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer
