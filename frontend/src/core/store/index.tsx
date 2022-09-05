import { configureStore } from '@reduxjs/toolkit'
import tableReducer from 'pages/table/TableSlice'
import { authReducer } from 'pages/login/LoginSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  table: tableReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
