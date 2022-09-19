import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from 'core/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import PublicRoot from 'components/public-root/PublicRoot'
import ProtectedRoot from 'components/protected-root/ProtectedRoot'

// Pages
import NotFound from 'pages/notFound'
import Login from 'pages/login'
import Registration from 'pages/registration/Registration'
import Table from 'pages/table/Table'
import Tables from 'pages/tables/Tables'
import Account from 'pages/account'
import AccountEdit from 'pages/account-edit'

// Styles
import ErrorBoundary from 'components/error-boundary'
import 'styles/Style.css'

// Images
// .....

const App: FC = (): JSX.Element => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
