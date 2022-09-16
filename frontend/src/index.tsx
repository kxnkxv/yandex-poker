import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

//import { createRoot } from 'react-dom/client'
import App from './App'
/* const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />) */
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
