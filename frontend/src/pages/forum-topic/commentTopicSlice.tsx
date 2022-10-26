import $api from '@/utils/axios/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TMessage = {
  author: { login: string; img_link: number }
  authorId: string
  date: string
  id: string
  text: string
  topicId: string
}

const initialState: {
  messages: TMessage[]
  isPending: boolean
} = {
  messages: [],
  isPending: false,
}

export const createMessage = createAsyncThunk(
  '@@commentTopic/createMessage',
  ({ topicId, text }: { topicId: string; text: string }, { rejectWithValue }) => {
    return $api.post(`v1/auth/topic/${topicId}/message`, { text }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const getMessages = createAsyncThunk(
  '@@commentTopic/getMessages',
  ({ topicId }: { topicId: string }, { rejectWithValue }) => {
    return $api.get(`v1/auth/topic/${topicId}/messages`).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

export const commentTopicSlice = createSlice({
  name: '@@commentTopic',
  initialState,
  reducers: {
    resetMessage(state) {
      state.messages = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMessage.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(createMessage.fulfilled, (state, action) => {
      if (state.messages.length !== 0) {
        state.messages.push(action.payload.data)
      } else {
        state.messages = [action.payload.data]
      }
      state.isPending = false
    })
    builder.addCase(createMessage.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(getMessages.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.isPending = false
      state.messages = action.payload.data
    })
    builder.addCase(getMessages.rejected, (state, action) => {
      state.isPending = false
    })
  },
})

export const commentTopicReducer = commentTopicSlice.reducer
export const { resetMessage } = commentTopicSlice.actions
