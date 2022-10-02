import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const container = document.getElementById('root') as HTMLElement

const ssrPages = ['/login', '/registration']

const isSsr = ssrPages.includes(window.location.pathname)

const application = (
  <BrowserRouter>
    <App />
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
