import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, getUsers, logout, paySubscribe, searchUser } from '../../Redux/actions/actionsUser'
import Avatar from '../Avatar'
import "./reception.css"

function Reception() {

  const naviagte=useNavigate()
  const disptach=useDispatch()
  const Users = useSelector(state => state.userReducer.allUsers)
  const Name=useSelector(state=>state.userReducer.currentUser)

useEffect(() => {
    disptach(getUsers  ())
     }, [])



  return (
    
    <div className='list' >
      <h2 className='adm' > RECEPTION NAME: {Name.name.toUpperCase()}</h2>
     <Link to={"/"} ><button type="button"  id='hre'  className="btn btn-primary">Home</button></Link> 
     <button type="button" onClick={() => disptach(logout(),naviagte("/"))}  id="outrec" className="btn btn-success">logout</button>
   <ul><h1 id='userlist' > Users </h1>
   <input type="text" placeholder='SEARCH' onChange={(e)=>disptach(searchUser(e.target.value))}  className="form-control sr" id="floatingInput" />
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
            <tbody className='dlu'  >
           

            {Users&&Users.map((el)=>el.role=="admin"||el.role=="reception"?null:<tr key={el._id} >
                <td id='tduse'  >
               {el.imgsrc ?  <img src={el.imgsrc}  style={{width:"50px",borderRadius:"20%"}} alt />:<Avatar/>}
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
                </td><td>
               < button type="button"   onClick={()=>disptach(paySubscribe(el._id,{subscribe:el.subscribeDeadline}))}  className="btn btn-info">pay</button>
               </td>
               <td>
               < button type="button" onClick={()=>disptach(deleteUser(el._id))} className="btn btn-danger">delete</button>
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
   
  )
}

export default Reception