import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-64 fixed left-0 top-0 bg-blue-900 text-white h-screen text-xl font-semibold px-4 py-8'>
      <ul className='space-y-4'>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Dashboard</li>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>My Rickshaw</li>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Training</li>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Voilations</li>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Battery Health</li>
        <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Support</li>
      </ul>
    </div>
  )
}

export default Sidebar
