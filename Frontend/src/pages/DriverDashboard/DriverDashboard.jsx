import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import SafetyScoreChart from './DriverContent/SafetyScoreChart'
import StatCards from './DriverContent/StatCards'
import AlertSection from './DriverContent/AlertSection'
import VoilationTable from './DriverContent/VoilationTable'

const DriverDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 bg-neutral-200'>
        <Navbar driver={"Rishi Raj"}/>
        <div className='ml-64 mt-24 min-h-screen'>
          <StatCards/>
          <AlertSection/>
          <VoilationTable/>
          <SafetyScoreChart/>
        </div>
      </div>
    </div>
  )
}

export default DriverDashboard
