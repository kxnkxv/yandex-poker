import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from 'core/store'

const container = document.getElementById('root') as HTMLElement

const ssrPages = ['/login', '/registration']

const isSsr = ssrPages.includes(window.location.pathname) && process.env.NODE_ENV === 'production'

const application = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

if (isSsr) {
  //Для страниц с ssr
  hydrateRoot(container, application)
} else {
  //Для страниц без ssr
  const root = createRoot(container)
  root.render(application)
}
