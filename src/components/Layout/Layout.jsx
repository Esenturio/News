import React from 'react'
import Topbar from './Topbar/Topbar'

function Layout({children}) {
  return (
    <div className='wrap'>
      <Topbar/>
      <div className="wrap__content">
        {children}
      </div>
    </div>
  )
}

export default Layout