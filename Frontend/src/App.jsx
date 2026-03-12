import React from 'react'
import DriverDashboard from './pages/DriverDashboard/DriverDashboard'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/driverDashboard' element={<DriverDashboard/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<RegisterPage/>}/>
      </Routes>
    </div>
  )
}

export default App
