import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Tables from './pages/tables/Tables'
import './styles/style.css'
import Table from './features/components/table/Table'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import AccountEdit from './pages/account-edit/AccountEdit'
import { Provider } from 'react-redux'
import { store, persistor } from './core/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import PublicRoot from 'Features/components/public-root/PublicRoot'
import ProtectedRoot from 'Features/components/protected-root/ProtectedRoot'

const App: FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* 404 Page */}
            <Route path='*' element={<PageNotFound />} />

            {/* Login */}
            <Route
              path='/'
              element={
                <PublicRoot>
                  <Login />
                </PublicRoot>
              }
            />

            {/* Registration */}
            <Route
              path='register'
              element={
                <PublicRoot>
                  <Registration />
                </PublicRoot>
              }
            />

            {/* Tables */}
            <Route
              path='tables'
              element={
                <ProtectedRoot>
                  <Tables />
                </ProtectedRoot>
              }
            />

            {/* Table */}
            <Route
              path='table/:id/:name'
              element={
                <ProtectedRoot>
                  <Table />
                </ProtectedRoot>
              }
            />

            {/* Account edit */}
            <Route
              path='account/edit'
              element={
                <ProtectedRoot>
                  <AccountEdit />
                </ProtectedRoot>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
