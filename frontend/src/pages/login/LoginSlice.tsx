import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'utils/axios/axios'
import errorHandler from 'utils/error-handler/errorHandler'

// Types
import { TSignInForm, TAuthInitialState } from './types'
import { TErrorPayload } from 'types/app'
import config from '@/config'


export const login = createAsyncThunk(
  '@@auth/login',
  ({ login, password }: TSignInForm, { rejectWithValue }) => {
    return axios.post('v1/auth/login', { login, password }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const checkAuth = createAsyncThunk('@@auth/user', (_, { rejectWithValue }) => {
  return axios.get<TAuthInitialState>(`${config.API_URL}/v1/auth/user`).catch((err) => {
    //localStorage.setItem('token')
    return rejectWithValue(err.response.data)
  })
})

export const logout = createAsyncThunk('@@auth/logout', (_, { rejectWithValue }) => {
  return axios.post('v1/auth/logout').catch((err) => {
    localStorage.removeItem('token')
    return rejectWithValue(err.response.data)
  })
})

const initialState: TAuthInitialState = {
  isPending: false,
  accessToken: '',
  refreshToken: '',
  user: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
    img_link: ''
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
        state.user = null
        state.accessToken = ''
        state.refreshToken = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data?.user
          state.accessToken = action.payload.data?.accessToken
          state.refreshToken = action.payload.data?.refreshToken
          localStorage.setItem('token', JSON.stringify(action.payload.headers))
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
        localStorage.removeItem('token')
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.accessToken = ''
        state.refreshToken = ''
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null
        state.accessToken = ''
        state.refreshToken = ''
      })
  },
})

export const authReducer = authSlice.reducer
