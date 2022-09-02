import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { configureStore, Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootState, persistedReducer } from 'Core/store/index'

// TToDo find correct type for preloaded state

type TRenderProps = {
  preloadedState?: any
  store?: Store<RootState>
} & RenderOptions

type TRenderReturn = ReturnType<typeof rtlRender> & {
  store: Store<RootState>
}

const testRender = (
  ui: JSX.Element,

  {
    preloadedState,
    store = configureStore({
      reducer: persistedReducer,
      preloadedState,
    }),
    ...renderOptions
  }: TRenderProps = {},
): TRenderReturn => {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={children} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  }
}

export * from '@testing-library/react'

export { testRender }
