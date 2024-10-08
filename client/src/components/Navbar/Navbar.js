import React from 'react'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/actions/actionsUser'

function Navbar() {
    const user = useSelector(state => state.userReducer.currentUser)
    const naviagte=useNavigate()
    const dispatch=useDispatch()
    const token = localStorage.getItem("token")
  return (
    <nav  className='nh'>
    <span className='logo' >GYM</span>
  <div className='btns'>
  
  {token? null:<>
     <Link to={"/login"}> <button type="button"  className="btn-gym ">signin</button> </Link>
     <Link to={"/signup"}><button type="button"  className="btn-gym">subscribe</button></Link></>}
{token && user.role==="user" && window.location.pathname==='/' ? <Link to={"/profile"}><button type="button"  className="btn-gym l ">profile</button></Link>:null}
{token && user.role==="user" && window.location.pathname==='/profile'    ? <Link to={"/"}><button type="button"  className="btn-gym l ">Home</button></Link>:null}
{token && user.role==="admin" ? <Link to={"/admin"}><button type="button"  className="btn-gym l ">admin profile</button></Link>:null}
 {token && user.role==="reception" ? <Link to={"/reception"}><button type="button"  className="btn-gym l">reception profile</button></Link>:null}
{token ?<button onClick={() => dispatch(logout(),naviagte("/"))}  type="button"  className="l btn-gym">logout</button>:null} 
 </div>
</nav>
  )
}

export default Navbar