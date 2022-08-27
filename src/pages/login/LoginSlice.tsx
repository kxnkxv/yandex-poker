import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'Utils/axios/axios'
import errorHandler from 'Utils/error-handler/errorHandler'

//Types
import { TSignInForm, TAuthInitialState } from './types'
import { TErrorPayload } from 'Types/app'

export const login = createAsyncThunk(
  '@@auth/login',
  ({ login, password }: TSignInForm, { rejectWithValue }) => {
    return axios.post('auth/signin', { login, password }).catch((err) => {
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
  return axios.post('auth/user').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})

const initialState: TAuthInitialState = {
  isPending: false,
  user: null,
}
const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Login
      .addCase(login.pending, (state) => {
        state.isPending = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        let data = action.payload as TErrorPayload
        errorHandler(data.reason)
      })

      //Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.data) {
          // ToDo требуется рефакторинг
          //Костыль, нужный для прокидывания аватарок через поле display_name
          let d_name = action.payload.data.display_name
          if (typeof d_name === 'string' && d_name.includes('avatar')) {
            action.payload.data.display_name = d_name.replace('avatar', '')
          } else {
            action.payload.data.display_name = 0
          }
          //Конец костыля

          state.user = action.payload.data
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer
