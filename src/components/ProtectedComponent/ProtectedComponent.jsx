import React from 'react'

function ProtectedComponent({auth, children, elseComponent}) {
  if (auth ) return <div>{children}</div>
  return (
    <div>
      {elseComponent}
    </div>
  )
}

export default ProtectedComponent