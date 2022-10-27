import $api from '@/utils/axios/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TTopic = {
  authorId?: string
  commentCount: number
  createDate: string
  description: string | null
  id: string
  name: string
}
export type TMessage = {
  author: { login: string; img_link: number }
  authorId: string
  date: string
  id: string
  text: string
  topicId: string
}

const initialState: {
  topic: null | TTopic[]
  message: TMessage[]
  isPending: boolean
} = {
  topic: null,
  message: [],
  isPending: false,
}
export const createTopic = createAsyncThunk(
  '@@topic/createTopic',
  ({ name, description }: { name: string; description: string | null }, { rejectWithValue }) => {
    return $api.post('v1/auth/topic', { name, description }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)
export const getTopic = createAsyncThunk(
  '@@topic/getTopic',
  ({ topicId }: { topicId: string }, { rejectWithValue }) => {
    return $api.get(`v1/auth/topic/${topicId}`).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)
export const getTopics = createAsyncThunk('@@topic/getTopics', (_, { rejectWithValue }) => {
  return $api.get('v1/auth/topics').catch((err) => {
    return rejectWithValue(err.response.data)
  })
})
export const getMessages = createAsyncThunk(
  '@@topic/getMessages',
  ({ topicId }: { topicId: string }, { rejectWithValue }) => {
    return $api.get(`v1/auth/topic/${topicId}/messages`).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)
export const createMessage = createAsyncThunk(
  '@@topic/createMessage',
  ({ topicId, text }: { topicId: string; text: string }, { rejectWithValue }) => {
    return $api.post(`v1/auth/topic/${topicId}/message`, { text }).catch((err) => {
      return rejectWithValue(err.response.data)
    })
  },
)

const topicSlice = createSlice({
  name: '@@topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTopic.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.isPending = false
      if (state.topic !== null) {
        state.topic.push(action.payload.data)
      } else {
        state.topic = [action.payload.data]
      }
    })
    builder.addCase(createTopic.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(getTopics.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.isPending = false
      state.topic = action.payload.data
    })
    builder.addCase(getTopics.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(getMessages.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.isPending = false
      state.message = action.payload.data
    })
    builder.addCase(getMessages.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(getTopic.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(getTopic.fulfilled, (state, action) => {
      state.topic = [action.payload.data]
      state.isPending = false
    })
    builder.addCase(getTopic.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(createMessage.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(createMessage.fulfilled, (state, action) => {
      if (state.message !== null) {
        state.message.push(action.payload.data)
      } else {
        state.message = [action.payload.data]
      }
      state.isPending = false
    })
    builder.addCase(createMessage.rejected, (state, action) => {
      state.isPending = false
    })
  },
})
export const topicReducer = topicSlice.reducer