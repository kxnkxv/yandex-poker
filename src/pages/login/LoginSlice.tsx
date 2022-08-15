import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'Utils/axios/axios'
import errorHandler from 'Utils/error-handler/errorHandler'

export const login = createAsyncThunk(
  '@@auth/login',
  ({ login, password }: ISignInForm, { rejectWithValue }) => {
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

const initialState: IAuthInitialState = {
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
        let data = action.payload as IErrorPayload
        errorHandler(data.reason)
      })

      //Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.user = action.payload.data
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer
