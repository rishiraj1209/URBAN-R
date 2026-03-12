import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DriverDashboard from './pages/DriverDashboard/DriverDashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

// 1. Import the new Training Page
import TrainingPage from './pages/TrainingPage/TrainingPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/driverDashboard' element={<DriverDashboard/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<RegisterPage/>}/>
        
        {/* 2. Add the specific route for the training page */}
        <Route path='/training' element={<TrainingPage/>}/>
      </Routes>
    </div>
  )
}

export default App