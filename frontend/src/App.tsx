import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
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
//import Table from 'pages/table/Table'
import Tables from 'pages/tables/Tables'
import Account from 'pages/account'
import AccountEdit from 'pages/account-edit'

// Styles
import 'styles/Style.css'

// Images
// .....
import { isServer } from 'utils/is-server/isServer'

const routes = (
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
        <>
          SSS
          <ProtectedRoot>
            <Tables />
          </ProtectedRoot>
        </>
      }
    />

    {/* Table */}

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
)

const App: FC = (): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        {isServer ? (
          routes
        ) : (
          <PersistGate loading={null} persistor={persistor}>
            {routes}
          </PersistGate>
        )}

        <ToastContainer />
      </Provider>
    </>
  )
}

export default App
