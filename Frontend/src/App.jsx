import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DriverDashboard from './pages/DriverDashboard/DriverDashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

// 1. Import the new Training Page
import TrainingPage from './pages/TrainingPage/TrainingPage'
import ComplaintsPage from './pages/ComplaintsPage/ComplaintsPage'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        {/*1. Route for signup and login page */}
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<RegisterPage/>}/>
        
        {/* 2. Route for the driverDashboard*/}
        <Route path='/driverDashboard' element={<ProtectedRoute allowedRole={"driver"}><DriverDashboard/></ProtectedRoute>}/>

        {/* 3. Route for the training page */}
        <Route path='/training' element={<TrainingPage/>}/>

        {/* 4. Route for Complaints page */}
        <Route path='/complaints' element={<ProtectedRoute allowedRole={"passenger"}><ComplaintsPage/></ProtectedRoute>}/>

        {/* 5. Route for AdminDashboard page */}
        <Route path='/adminDashboard' element={<ProtectedRoute allowedRole={"admin"}><AdminDashboard/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App