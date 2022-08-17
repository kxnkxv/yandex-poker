import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './core/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import PublicRoot from 'Features/components/public-root/PublicRoot'
import ProtectedRoot from 'Features/components/protected-root/ProtectedRoot'

//Pages
import NotFound from 'Pages/notFound/NotFound'
import Login from 'Pages/login/Login'
import Registration from 'Pages/registration/Registration'
import Table from 'Features/components/table/Table'
import Tables from 'Pages/tables/Tables'
import Account from 'Pages/account/Account'
import AccountEdit from 'Pages/account-edit/AccountEdit'

//Styles
import './styles/style.css'

//Images
//.....

const App: FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* 404 Page */}
            <Route path='*' element={<NotFound />} />

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

            {/* Account */}
            <Route
              path='account'
              element={
                <ProtectedRoot>
                  <Account />
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
