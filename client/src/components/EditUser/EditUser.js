import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { editUser } from '../../Redux/actions/actionsUser'
import Alert from '../Alert/Alert'
import ImgProfile from '../Profile/Image'
import "./editUser.css"



function EditUser() {


  const dispatch = useDispatch()
  const [image, setimage] = useState()
  const [newInfo, setnewInfo] = useState("")
  const user = useSelector(state => state.userReducer.currentUser)
  const navigate = useNavigate()
  const list = useSelector(state => state.offerReducer.offers)
 
  useEffect(() => {
    setnewInfo(user)
  }, [user])

const handlesubmit=(e)=>{

    const data = new FormData();
     data.append("name",newInfo.name)
     data.append("specialty", newInfo.specialty)
     data.append("file",image) 
     dispatch(editUser(user._id,data, navigate))
     navigate('/profile')
  }

return (
    <div>
  { user.imgsrc?  <img src={user.imgsrc}  style={{ marginLeft:"30px" ,marginTop:"15px",width:"100px",borderRadius:"20%"}} alt={<ImgProfile />} />:<ImgProfile />}
     <p id='username' >{user.name}</p>
     <div className='edituser'id='formedit' >
      <div className="form-floating ">
     <input   onChange={(e)=>setnewInfo({...newInfo,name:e.target.value})} type="text" className="form-control " id="floatingInput" placeholder="name@example.com"/>
     <label for="floatingInput">NEW USER NAME</label>
     <br/>
   </div>
  
   <div className="form-floating ">
   <select className="form-select" id="floatingSelectGrid" Value={newInfo.specialty}  onChange={(e)=>setnewInfo({...newInfo,specialty:e.target.value})} >
        {list&&list.map((el)=><option key={el._id} value={el.specialty}>{el.specialty}</option>)}
    </select> <label for="floatingPassword">sport</label>
        <br/>
   </div>
   <div className="form-floating">
     <input type="file"  onChange={(e)=>setimage(e.target.files[0])}   className="form-control" id="floatingInput"  />
     <label for="floatingInput">change photo </label>
     <br/><Alert/>
     <div id='save' >
     <button type="button" onClick={handlesubmit} className="btn btn-primary">save change</button>
     <Link to={"/profile"} > <button type="button" className="btn btn-success">return</button></Link>
     </div>
   </div>
   </div>
   </div>
  )
}

export default EditUser