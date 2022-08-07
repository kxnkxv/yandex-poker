import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Tables from './pages/tables/Tables'
import './styles/style.css'

export interface IAppPageProps {}

const App: React.FunctionComponent<IAppPageProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='tables' element={<Tables />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
