import React from 'react'
import StatsCard from './StatsCard'

const StatCards = () => {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Driver Statistics</h1>
      <div className='flex justify-between items-center'>
        <StatsCard title='Safety Score' value='85' color='border-green-500'/>
        <StatsCard title='Voilations' value='3' color='border-blue-500'/>
        <StatsCard title='Battery Health' value='good' color='border-red-500'/>
        <StatsCard title='Training' value='completed' color='border-purple-500'/>
      </div>
    </div>
    
  )
}

export default StatCards
