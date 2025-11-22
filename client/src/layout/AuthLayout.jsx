import React from 'react'
import { Outlet } from 'react-router'
import Logo from '@/components/Logo'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 lg:h-screen bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right: image (keeps equal height on large screens). Logo will sit top-left of this image */}
      <div className="w-full lg:w-full h-64 md:h-screen relative bg-[url(/a.jpg)] bg-cover rounded-xl">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-20" />
        <div className="absolute top-8 left-8 z-30">
          <Logo />
        </div>
      </div>
    </div>
  )
}
