import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Redux/actions/actionsUser';
import Alert from '../Alert/Alert';
import "./login.css"
function Login() {
  const disptach=useDispatch()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

  
  const handleSubmit = (e) => {
   
    disptach(login({email,password}, navigate))
     
      };

return (
  <div className='blog'>
  <h1 id='hlogin' >login</h1>
    <div className="log"  >
    <div className="form-floating">
      <input  onChange={(e)=>setemail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email </label>
      <br/>
    </div>
     <div className="form-floating">
      <input onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
      </div><Alert/>
      <div id='login'  >
       <button type="button" onClick={(e)=>handleSubmit()}  className="btn btn-success">login</button>
       <Link  to={"/"}><button type="button"  className="btn btn-success">return</button></Link>
       </div>
      </div>
      </div>
)
}

export default Login