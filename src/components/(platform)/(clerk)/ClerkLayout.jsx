import React from 'react'
import { Outlet } from 'react-router'

const ClerkLayout = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Outlet />
    </div>
  )
}

export default ClerkLayout
