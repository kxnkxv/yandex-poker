import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Tables from './pages/tables/Tables'
import './styles/style.css'
import Table from './features/components/table/Table'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import AccountEdit from './pages/account-edit/AccountEdit'
import { Provider } from 'react-redux'
import { store } from './core/store'
import Account from './pages/account/Account'

export interface IAppPageProps {}

const App: React.FunctionComponent<IAppPageProps> = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='register' element={<Registration />} />
          <Route path='/' element={<Login />} />
          <Route path='table/:id/:name' element={<Table />} />
          <Route path='tables' element={<Tables />} />
          <Route path='account/edit' element={<AccountEdit />} />
          <Route path='account' element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
