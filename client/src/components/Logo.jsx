import React from 'react'
import { Link } from 'react-router'

export default function Logo() {
  return (
    <Link to={"/"}>
    <div className='flex items-center gap-2 text-2xl font-bold text-white'>
        <h1 className='bg-(--primary-color) p-2 rounded-full'>BH</h1>
        <h1>BetaHouse</h1>
    </div>
    </Link>
  )
}
