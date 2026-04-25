import React from 'react'
import StatsCard from './StatsCard'

const StatCards = ({data}) => {
  if(!data) return <p>Loading...</p>
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Driver Statistics</h1>
      <div className='flex justify-between items-center'>
        <StatsCard title='Safety Score' value={data.safetyScore} color='border-green-500'/>
        <StatsCard title='Voilations' value={data.totalViolations} color='border-blue-500'/>
        <StatsCard title='Training Score' value={data.trainingScore} color='border-purple-500'/>
      </div>
    </div>
    
  )
}

export default StatCards
