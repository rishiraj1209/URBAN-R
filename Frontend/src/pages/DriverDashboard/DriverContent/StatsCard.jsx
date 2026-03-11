import React from 'react'

const StatsCard = ({title,value,color}) => {
  return (
    <div className={`bg-neutral-300 shadow-[4px_4px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200 border text-center ${color} rounded-lg p-4 cursor-pointer`}>
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-2xl font-bold'>{value}</p>
    </div>
  )
}

export default StatsCard
