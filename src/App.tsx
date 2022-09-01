import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from 'Core/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import PublicRoot from 'Components/public-root/PublicRoot'
import ProtectedRoot from 'Components/protected-root/ProtectedRoot'

// Pages
import NotFound from 'Pages/notFound'
import Login from 'Pages/login'
import Registration from 'Pages/registration/Registration'
import Table from 'Pages/table/Table'
import Tables from 'Pages/tables/Tables'
import Account from 'Pages/account'
import AccountEdit from 'Pages/account-edit'

// Styles
import 'Styles/Style.css'

// Images
// .....

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
              path='tables/:tableId'
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
