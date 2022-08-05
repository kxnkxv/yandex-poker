import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Tables from './features/components/table/Table'
import './styles/Style.css'

export interface IAppPageProps {}

const App: React.FunctionComponent<IAppPageProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Registration />} />
        <Route path='tables/:id/:name' element={<Tables />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
