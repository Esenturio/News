import React from 'react'
import './Loader.css'

function Loader({active}) {
  if (!active) return <div></div>
  return (
    <div className="overlay d-flex justify-content-center align-items-center">
      <div className="lds-dual-ring"></div>
    </div>
  )
}

export default Loader