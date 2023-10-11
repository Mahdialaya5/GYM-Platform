import React, { useEffect } from 'react'
import "./profile.css"
import { Link,  useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { getCurrent, logout } from '../../Redux/actions/actionsUser'

import ImgProfile from './Image'

function Profile() {

  const dispatch=useDispatch()
const navigate=useNavigate()
  const user = useSelector(state => state.userReducer.currentUser)
  
  useEffect(() => {
    dispatch(getCurrent())
  }, [])
  
console.log(user.imgsrc);
  return (
    
    <div  className='baku' >
        <nav className='nav' id='navpro' >
        <span id='logoh' >GYM</span>
          <div id='bp'  > 
         
       <Link to={"/"} ><button type="button" id='of' className="btn btn-primary">Home</button></Link> 
        <div id='dlogout' >
       <button type="button" onClick={() => dispatch(logout(),navigate("/"))} id='logout' className="btn btn-success">Log out</button>
       </div></div>
        </nav>
        
      {  <div id='uinfo' >
      {user.imgsrc ?  <img src={user.imgsrc}  style={{  width:"150px",borderRadius:"20%"}} alt={<ImgProfile />} />:<ImgProfile />}
   <div id='editdiv' > <button id='editp'  ><Link to={`/edituser/${user._id}`}  ><i className="fa-solid fa-pencil"></i></Link></button>   </div>
<div className='flxuser' >

  <p  id='flxname' > <span id='name' className="p"> {user.name&&user.name.toUpperCase()}</span><br/>
   <span id='userinscri'   > Date inscription: {user.inscription&&user.inscription.slice(0,10)}</span></p>
   <div className="d-flex" style={{height: 200,}}>
  <div className="vr" />
</div>

 <div> 
  <h2 className="p">sport: {user.specialty}</h2>
  <h2 className="p">Date subscribe: {user.subscribe&&user.subscribe.slice(0,10)}</h2>
  <h2 className="p">Deadline of subscribe: {user.subscribeDeadline&&user.subscribeDeadline.slice(0,10)}</h2>
</div>
</div>
</div>
}


<div id='payp'  >
<Link  to={"/pay"} ><button type="button" id='payb' className="btn btn-primary">pay online</button></Link>
</div>
    </div>
  )
}

export default Profile