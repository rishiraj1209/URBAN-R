import React, { useState } from 'react'

const Sidebar = () => {
  const [open, isOpen] = useState(false);
  return (
    <div className='w-64 fixed left-0 top-0 h-screen '>
      <nav className='bg-blue-950 shadow-md h-full'>

        <div className='flex justify-between items-center p-8 text-2xl font-semibold text-white'>
          <h2>Dashboard</h2>
          <button></button>
        </div>

        <div>
          <ul className='space-y-4 px-8 text-white text-lg'>
            <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>My Rickshaw</li>
            <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Training</li>
            <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Voilations</li>
            <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Battery Health</li>
            <li className='text-shadow-sm hover:text-neutral-300 transition-all duration-200 cursor-pointer'>Support</li>
          </ul>
        </div>
        
      </nav>
      
    </div>
  )
}

export default Sidebar
