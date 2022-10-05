import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'utils/axios/axios'
import errorHandler from 'utils/error-handler/errorHandler'

// Types
import { TSignInForm, TAuthInitialState } from './types'
import { TErrorPayload } from 'types/app'

export const login = createAsyncThunk(
  '@@auth/login',
  ({ login, password }: TSignInForm, { rejectWithValue }) => {
    return axios.post('v1/auth/login', { login, password }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const checkAuth = createAsyncThunk('@@auth/user', (_, { rejectWithValue }) => {
  return axios.get('auth/user').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})

export const logout = createAsyncThunk('@@auth/user', (_, { rejectWithValue }) => {
  return axios.post('v1/auth/logout').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})

const initialState: TAuthInitialState = {
  isPending: false,
  user: null,
  accessToken: '',
  refreshToken: '',
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
        state.user = null
        state.accessToken = ''
        state.refreshToken = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data?.user
          state.accessToken = action.payload.data?.accessToken
          state.refreshToken = action.payload.data?.refreshToken
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        const data = action.payload as TErrorPayload
        errorHandler(data.reason)
      })
  },
})

export const authReducer = authSlice.reducer
