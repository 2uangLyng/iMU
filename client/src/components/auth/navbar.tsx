import Link from 'next/link'
import React from 'react'
import { DASHBOARD_NAV_LINKS } from '../../public/const/navigations'

const NavBar = () => {
  return (
    <nav className='flex justify-around items-center py-4 bg-[#141414] text-white sticky top-0 z-10'>
      {DASHBOARD_NAV_LINKS.map((items) => (
        <Link
          key={items.key}
          href={items.path}
          className='text-white text-xl font-bold hover:text-gray-300'
        >
          {items.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavBar