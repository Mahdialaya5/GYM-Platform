import React from 'react'
import { Navigate } from 'react-router-dom'
function PayRoute({children}) {
    const token=localStorage.getItem('token')
  return (
    <div> {token?children:<Navigate to="/" /> }</div>
  )
}

export default PayRoute