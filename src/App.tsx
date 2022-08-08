import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Tables from './pages/tables/Tables'
import './styles/style.css'
import Table from './features/components/table/Table'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import { Provider } from 'react-redux'
import { store } from './core/store'

export interface IAppPageProps {}

const App: React.FunctionComponent<IAppPageProps> = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Login />} />
          <Route path='tables/:id/:name' element={<Table />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
