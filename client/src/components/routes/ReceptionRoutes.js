import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ReceptionRoutes({children}) {
    const admin=useSelector(state => state.userReducer.currentUser)
    const token=localStorage.getItem('token')
    const adminValidator=admin.role
  return (
    <div>  {token && adminValidator=="reception" ?children:<Navigate to="/" /> }</div>
  )
}

export default ReceptionRoutes