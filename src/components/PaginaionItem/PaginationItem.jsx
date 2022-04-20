import React from 'react'
import {PaginatoinButton} from './PaginationItem.style.js';

function PaginationItem({num, to}) {
  return (
    <div className='pagination m-auto text-center'>
      <PaginatoinButton onClick={to} className='p-1 pe-3 ps-3 me-1 ms-1'>
        {num}
      </PaginatoinButton>
    </div>
  )
}

export default PaginationItem