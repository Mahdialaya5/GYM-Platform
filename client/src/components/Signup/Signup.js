import React, { useState } from 'react'
import "./signup.css"
import {Link,  useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../Redux/actions/actionsUser'
import Alert from '../Alert/Alert'

function Signup() {
  
  const list = useSelector(state => state.offerReducer.offers)
  const [newEmail, setEmail] = useState("")
 const [newPassword, setpassword] = useState("")
 const [newName, setname] = useState("")
 const [newSport, setsport] = useState("musculation")
 const [compte, setcompte] = useState("")
 const [image, setimage] = useState()
 const navigate = useNavigate()
  const disptach=useDispatch()
 
 const handleSubmit = (e) => {
   if(image==null) 
   {alert(" please add your photo") }
  const data = new FormData();
    data.append("specialty", newSport)
    data.append("password", newPassword)
    data.append("email", newEmail)
    data.append("name",newName)
    data.append("file",image)
 if(compte.length==20){
    disptach(addUser(data, navigate))}
    else alert("N° compte bancaire must 20 number")
   
    };
    

  

 return (
 <div  className='ba'>
    <h2 className='tit'>signup</h2>
    <div className="fr" >
     <div className="form-floating">
      <input onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email </label>
      <br/>
    </div>
    <div className="form-floating">
      <input onChange={(e)=>setname(e.target.value)}  type="text" className="form-control" id="floatingPassword" placeholder="Name"/>
      <label for="floatingPassword">Name</label>
      <br/>
    </div>
    <div className="form-floating">
      <input onChange={(e)=>setpassword(e.target.value)}   type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
      <br/>
    </div>
    <div className="checkbox mb-3">
    <select className="form-select" id="floatingSelectGrid" defaultValue={"musculation"}  onChange={(e)=>setsport(e.target.value)} >
        {list&&list.map((el)=><option key={el._id} value={el.specialty}>{el.specialty}</option>)}
        
      </select>
      <br/>
      <div className="form-floating">
      <input  onChange={(e)=>setcompte(e.target.value)} type="number" className="form-control" id="floatingPassword"  />
      <label  for="floatingPassword">N°compte bancaire</label>
    </div>
    <br/>
    <br/>
      <div className="form-floating">
      <input type="file" onChange={(e)=>setimage(e.target.files[0])}   className="form-control" id="floatingPassword"  />
      <label   for="floatingPassword">photo</label>
    </div><Alert/>
    <br/>
    </div>
    <button   onClick={(e)=>handleSubmit()}  className="w-100 btn btn-lg btn-primary" type="submit">Sign up and subscribe</button>
    <br/>
    <br/>
    <div id='b'>
    <Link to={"/"} ><button type="button" id="ret" className="btn btn-success ">return</button></Link>
    <Link  to={"/login"} ><button type="button" id="log" className="btn btn-success">login</button></Link>
   </div>
    </div >
    </div>
  )
}

export default Signup