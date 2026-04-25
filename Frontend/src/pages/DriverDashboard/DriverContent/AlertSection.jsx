import React from 'react'

const AlertSection = ({ data }) => {
  const getAlerts = () => {
    const alerts = [];
    
    if (data?.safetyScore && data.safetyScore < 70) {
      alerts.push("Low safety score - improvement needed");
    }
    
    if (data?.totalViolations > 5) {
      alerts.push("High number of violations detected");
    }
    
    if (data?.trainingScore < 50) {
      alerts.push("Complete training to improve score");
    }
    
    if (alerts.length === 0) {
      alerts.push("No active alerts");
    }
    
    return alerts;
  };

  return (
    <div className='p-8'>
      <h2 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Alerts</h2>
      <div className='flex flex-wrap gap-10 items-center'>
        {getAlerts().map((alert,index)=>(
          <div className='bg-red-100 text-red-700 font-semibold text-2xl border border-red-900 px-8 py-2 rounded-xl shadow-sm shadow-black cursor-pointer' key={index}>{alert} !!</div>
        ))}
      </div>
      
    </div>
  )
}

export default AlertSection
