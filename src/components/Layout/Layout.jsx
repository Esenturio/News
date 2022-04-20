import React from 'react'
import Footer from './Footer/Footer'
import Topbar from './Topbar/Topbar'

function Layout({children}) {
  return (
    <div className='wrap'>
      <Topbar/>
      <div className="wrap__content">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout