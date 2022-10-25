import React, { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'core/store'
import { ToastContainer } from 'react-toastify'
import PublicRoot from 'components/public-root/PublicRoot'
import ProtectedRoot from 'components/protected-root/ProtectedRoot'
import Loader from 'components/loader/Loader'

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
import { checkAuth } from 'pages/login/LoginSlice'
import Forum from 'pages/forum'
import ForumTopic from 'pages/forum-topic'

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
      {/* Forum */}
      <Route
        path='forum'
        element={
          <ProtectedRoot>
            <Forum />
          </ProtectedRoot>
        }
      />
      {/* Forum */}
      <Route
        path='forum/:id'
        element={
          <ProtectedRoot>
            <ForumTopic />
          </ProtectedRoot>
        }
      />
    </Routes>
  </ErrorBoundary>
)

const App: FC = (): JSX.Element => {
  let isPending = false

  if (!isServer) {
    isPending = useSelector((state: RootState) => state.auth.isPending)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
      if (localStorage.getItem('token') && !isServer) {
        dispatch(checkAuth())
      }
    }, [])

    isPending = false
  }

  return (
    <>
      {isPending ? <Loader /> : routes}
      <ToastContainer />
    </>
  )
}

export default App
