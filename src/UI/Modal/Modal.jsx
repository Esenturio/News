import React from 'react'
import './Modal.css'

function Modal({children}) {
  return (
    <div className='modal p-4'>
      <div className="modal__content">
        {children}
      </div>
    </div>
  )
}

export default Modal