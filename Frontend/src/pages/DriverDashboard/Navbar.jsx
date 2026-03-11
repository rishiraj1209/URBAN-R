import React from 'react'
import { BatteryCharging } from 'lucide-react';

const Navbar = ({driver}) => {
  return (
    <div className='flex fixed top-0 right-0 left-64 justify-between items-center mb-8 p-8 bg-neutral-100 shadow-sm shadow-black'>
      <div className='w-12 h-12'>
        <BatteryCharging className='w-full h-full'/>
      </div>
      <div className='flex gap-12 items-center'>
        <p className='font-semibold text-lg'>Driver: {driver}</p>
        <button className='font-bold text-white px-8 py-2 bg-red-500 rounded-xl cursor-pointer active:scale-95'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
