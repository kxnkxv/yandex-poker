import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store } from './core/store'

const container = document.getElementById('root') as HTMLElement

// const ssrPages = ['/login', '/registration']

// const isSsr = ssrPages.includes(window.location.pathname) && process.env.NODE_ENV === 'production'

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

// if (isSsr) {
//   //Для страниц с ssr
//   hydrateRoot(container, application)
// } else {
// Для страниц без ssr
const root = createRoot(container)
root.render(application)
// }
