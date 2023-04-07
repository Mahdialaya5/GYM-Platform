import React from 'react'
import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoutes({children}) {
    const admin=useSelector(state => state.userReducer.currentUser)
    const token=localStorage.getItem('token')
    const adminValidator=admin.role
return (
      <div>
          {token && adminValidator=="admin" ?children:<Navigate to="/" /> }
      </div>
  )
}

export default AdminRoutes