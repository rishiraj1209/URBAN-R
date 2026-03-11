import React from 'react'

const AlertSection = () => {
  const alerts = [
    "Overspeed voilation detected",
    "Battery not certified",
  ]
  return (
    <div className='p-8'>
      <h2 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Alerts</h2>
      <div className='flex felx-wrap gap-10 items-center'>
        {alerts.map((alert,index)=>(
          <div className='bg-red-100 text-red-700 font-semibold text-2xl border border-red-900 px-8 py-2 rounded-xl shadow-sm shadow-black cursor-pointer' key={index}>{alert} !!</div>
        ))}
      </div>
      
    </div>
  )
}

export default AlertSection
