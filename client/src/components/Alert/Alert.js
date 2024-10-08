import React from 'react'
import { useSelector } from 'react-redux'
import "./alert.css"
function Alert() {
  const err = useSelector(state => state.userReducer.errors)

  return(
  <p className='err'>
    {err&&err.msg?<p>{err.msg}</p>:
    err&& err.errors[0].msg ?   <p>{err.errors[0].msg }</p>: 
   err&& err.errors[1].msg? <p>{err.errors[1].msg }</p>: null  }
    </p>
  )
}

export default Alert