import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/actions/actionsUser'
import CardsList from '../CardsList/CardsList'
import "./home.css"

function Home() {
  const user = useSelector(state => state.userReducer.currentUser)
  const naviagte=useNavigate()
  const disptach=useDispatch()
  const token = localStorage.getItem("token")
 
  return (
    <div  className='h' >  
      <nav   id='nh'>
        <span id='logoh' >GYM</span>
      <div className='bt'>
      
      {token? null:<Link to={"/login"}> <button type="button"  className="btn btn-primary">login</button> </Link>}
     <div id='sig' >
    { token? null:<Link to={"/signup"}><button type="button" id='sig'  className="btn btn-success">signup</button></Link>}
     </div>
     {!token || user.role=="admin"|| user.role=="reception" ?null:<Link to={"/profile"}><button type="button"  className="btn btn-primary">profile</button></Link>}
     {token && user.role=="admin" ? <Link to={"/admin"}><button type="button"  className="btn btn-primary">admin profile</button></Link>:null}
     {token && user.role=="reception" ? <Link to={"/reception"}><button type="button"  className="btn btn-primary">reception profile</button></Link>:null}
     {token?<button onClick={() => disptach(logout(),naviagte("/"))}  type="button" id='sig' className="btn btn-success logout">logout</button>:null}
    </div>
      </nav>
     <div  >
      <h2 id='gy' className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold text-capitalize">Gym & Fitness Center</h2>
     <CardsList />
    </div> 
    
    </div>
  )
}

export default Home