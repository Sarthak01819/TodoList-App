import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-blue-900'>
        <span className='font-bold text-white text-2xl'>iTask</span>
        <div className='flex '>
            <ul className='flex gap-5 text-white'>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar