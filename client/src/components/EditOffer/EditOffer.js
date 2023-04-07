import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editOffer, getOneOffer } from '../../Redux/actions/actionsOffer';
import './edit.css'

function EditOffer() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [image, setimage] = useState()
  const [offerUpdate, setofferUpdate] = useState("")
  const oldOffer = useSelector(state => state.offerReducer.oneOffer)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getOneOffer(id))
     }, [id])

  useEffect(() => {
    setofferUpdate(oldOffer)
    }, [oldOffer])

const handlesubmit=(e)=>{
  
  const data = new FormData();
  data.append("specialty", offerUpdate.specialty)
  data.append("price", offerUpdate.price)
  data.append("planing", offerUpdate.planing)
  data.append("file",image)
dispatch(editOffer(oldOffer._id,data, navigate))
}
  return (
<div id='edit'>
     <h2  id='adlo' >EditOffer  </h2>
      <div className='addof'id='formedit' >
       <div className="form-floating ">
      <input value={offerUpdate.specialty} onChange={(e)=>setofferUpdate({...offerUpdate,specialty:e.target.value})}  type="text" className="form-control " id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">type</label>
      <br/>
    </div>
    <div className="form-floating">
      <input  value={offerUpdate.price} onChange={(e)=>setofferUpdate({...offerUpdate,price:e.target.value})}    type="number" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">price </label>
      <br/>
    </div>
    <div className="form-floating">
      <input value={offerUpdate.planing} onChange={(e)=>setofferUpdate({...offerUpdate,planing:e.target.value})}   type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">planning </label>
      <br/>
    </div>
    <div className="form-floating">
      <input type="file"  onChange={(e)=>setimage(e.target.files[0])}     className="form-control" id="floatingInput"  />
      <label for="floatingInput">photo </label>
      <br/>
      <div id='save' >
      <button type="button" onClick={(e)=>handlesubmit()} className="btn btn-success">save</button>
      <Link to={"/admin"} > <button type="button" className="btn btn-success">return</button></Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default EditOffer