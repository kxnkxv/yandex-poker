import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'core/store'
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
import ErrorBoundary from 'components/error-boundary'
// Styles
import 'styles/Style.css'

// Images
// .....
import { isServer } from 'utils/is-server/isServer'

const routes = (
  <ErrorBoundary>
    <Routes>
      {/* 404 Page */}
      <Route path='*' element={<NotFound />} />

      {/* Login */}

      <Route
        path='/'
        element={
          <PublicRoot>
            <Navigate to='/login' />
          </PublicRoot>
        }
      />
      <Route
        path='login'
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
        element={<ProtectedRoot>{!isServer && <Table />}</ProtectedRoot>}
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
  </ErrorBoundary>
)

const App: FC = (): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        {routes}
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App
