import React, { useEffect } from 'react'
import "./admin.css"
import { Link, useNavigate } from 'react-router-dom'
import OffersList from './OffersList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, logout, searchUser } from '../../Redux/actions/actionsUser'
import Avatar from '../Avatar'

function Admin() {
  const naviagte=useNavigate()
  const disptach=useDispatch()
  const listUsers = useSelector(state => state.userReducer.allUsers)
  const Name=useSelector(state=>state.userReducer.currentUser)
 
 
  useEffect(() => {
    disptach(getAllUsers  ())
  
     }, [])
    

  return (
    <div>
    <h1  className='adm' >ADMIN NAME: {Name.name.toUpperCase()}</h1>
    <br/>
    <div id='add' >
  <Link to={"/add"} ><button type="button"  className="btn btn-primary">add offer</button></Link>
  <Link to={"/"} ><button type="button"  className="btn btn-primary">Home</button></Link>
  <button type="button" onClick={() => disptach(logout(),naviagte("/"))} className="btn btn-success">logout</button>
  </div>
  <div id='backadmin' >
   <br/>

   <OffersList/>
   <br/>
   </div>
  <br/>
   <div className='list' >
   <ul><h1 id='userlist' > Users </h1>
   <input type="text" placeholder='SEARCH' onChange={(e)=>disptach(searchUser(e.target.value))}   className="form-control sr srch" id="floatingInput" />
</ul>
<div className="container">
  <div className="row">
    <div className="col-lg-12 ">
      <div className="main-box clearfix">
        <div className="table-responsive">
          <table className="table user-list ">
            <thead>
              <tr>
                <th><span>User</span></th>
                <th><span>date inscription</span></th>
                <th className="text-center"><span>Susbscribe</span></th>
                <th><span>Email</span></th>
                <th>deadline susbscribe</th>
              </tr>
            </thead>
            <tbody>
             
             
              {listUsers&&listUsers.map((el)=>el.role=="admin"||el.role=="reception"?null:<tr key={el._id} >
                <td>
                {el.imgsrc ?  <img src={el.imgsrc}  style={{width:"50px",borderRadius:"20%"}} alt={<Avatar/> }/>:<Avatar/>}
                 <h6>{el.name}</h6> 
                 {el.specialty}
                  <span className="user-subhead"></span>
                </td>
                <td>
                  {el.inscription&&el.inscription.slice(0,10)}
                </td>
                <td className="text-center">
                  <span className="label label-default">{el.subscribe&&el.subscribe.slice(0,10)}</span>
                </td>
                <td>
                 {el.email}
                </td>
                <td style={{width: '18%'}}>
                {el.subscribeDeadline&&el.subscribeDeadline.slice(0,10)}
                </td>
              </tr>)}
          
            

 </tbody>
  </table>
    </div>
    </div>
    </div>
    </div>
    </div>
   </div> 
            
          
 </div>
  )
}

export default Admin