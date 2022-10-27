import $api from '@/utils/axios/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TTopic } from './types'

const initialState: {
  topics: TTopic[]
  topic: null | TTopic
  isPending: boolean
} = {
  topic: null,
  topics: [],
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
  '@@topic',
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

const topicSlice = createSlice({
  name: '@@topic',
  initialState,
  reducers: {
    resetTopic(state) {
      state.topic = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTopic.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.isPending = false
      if (state.topics.length !== 0) {
        state.topics.push(action.payload.data)
      } else {
        state.topics = [action.payload.data]
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
      state.topics = action.payload.data
    })
    builder.addCase(getTopics.rejected, (state, action) => {
      state.isPending = false
    })
    builder.addCase(getTopic.pending, (state, action) => {
      state.isPending = true
    })
    builder.addCase(getTopic.fulfilled, (state, action) => {
      state.topic = action.payload.data
      state.isPending = false
    })
    builder.addCase(getTopic.rejected, (state, action) => {
      state.isPending = false
    })
  },
})
export const topicReducer = topicSlice.reducer
export const { resetTopic } = topicSlice.actions
