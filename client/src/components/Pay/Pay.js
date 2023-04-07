import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { newSubscribe } from '../../Redux/actions/actionsUser'
import "./pay.css"

function Pay() {
  
  const disptach=useDispatch()
  const navigate=useNavigate()
  const user = useSelector(state => state.userReducer.currentUser)
 
const getDead=()=>{
    let myDate = new Date(user.subscribeDeadline.slice(0,10));
     myDate.setDate(myDate.getDate() + 30);
  let dateString = myDate.toISOString().substring(0, 10);
  return dateString
}
const [payé, setpayé] = useState("")
     


const handleSubmit = (e) => {
    if(payé.length==20)
        { 
           disptach(newSubscribe(user._id,{subscribe:user.subscribeDeadline},navigate))}
        else alert ("n° compte bancaire must 20 number")
      };

  return (
    <div  className='pay' >
       <div className="log" id='p' >
    <div className="form-floating">
      <input onChange={(e)=>setpayé(e.target.value)}  type="Number" className="form-control" id="floatingInput" />
      <label for="floatingInput">N° compte bancaire </label>
       <p className='dl' ><span id='news'  >NEW SUBSCRIBE:</span> {user.subscribeDeadline&&user.subscribeDeadline.slice(0,10)} to {user.subscribeDeadline&&getDead()} </p>
      <br/>
    </div>
    <div  id='bpay'>
      <button type="button" onClick={(e)=>handleSubmit()} className="btn btn-success">pay</button>
       <Link  to={"/profile"}><button type="button"  className="btn btn-success">return</button></Link>
       </div>
      </div>
    </div>
  )
}

export default Pay