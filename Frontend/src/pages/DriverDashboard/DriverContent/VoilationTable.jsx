import React from 'react'

const VoilationTable = ({data}) => {
  if(!data || data.length === 0) {
    return (
      <div className='p-8'>
        <h2 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Recent Voilations</h2>
        <p className='text-neutral-600'>No violations found</p>
      </div>
    )
  }

  return (
    <div className='p-8'>
      <h2 className='text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm'>Recent Voilations</h2>
      <div className='w-3xl'>
        <table className='w-full border-2 text-center'>
          <thead className='text-neutral-800 bg-neutral-300'>
            <tr  className='border-b-2'>
              <th className='p-4 font-bold text-xl border-2'>Date</th>
              <th className='p-4 font-bold text-xl border-2'>Type</th>
              <th className='p-4 font-bold text-xl border-2'>Severity</th>
            </tr>
          </thead>

          <tbody>
            {data.map((v, index)=>(
              <tr className='border-b-2' key={index}>
                <td className='p-4 text-xl border-2'>{new Date(v.createdAt).toLocaleDateString()}</td>
                <td className='p-4 text-xl border-2'>{v.type}</td>
                <td className={`p-4 text-xl border-2 text-white font-bold border-black ${v.severity === 'High' ? 'bg-red-400':'bg-yellow-400'}`}>{v.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default VoilationTable
