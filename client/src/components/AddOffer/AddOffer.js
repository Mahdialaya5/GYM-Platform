import React, { useState } from 'react'
import "./add.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {addOffer}  from "../../Redux/actions/actionsOffer"
function AddOffer() {
  const [Type, settype] = useState("");
  const [priceadd, setprice] = useState("")
  const [planning , setplanning ] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [image, setimage] = useState()
  const handleSubmit = (e) => {
    
    const data = new FormData();
    data.append("specialty", Type)
    data.append("price", priceadd)
    data.append("planing", planning)
    data.append("file",image)
  dispatch(addOffer(data,navigate))
  };

  return (
    <div  id='backadd' >
     <h2  id='adlo' >AddOffer  </h2>
      <div className='addof' >
       <div className="form-floating ">
      <input type="text" className="form-control " onChange={(e)=>settype(e.target.value)}  id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">specialty</label>
      <br/>
    </div>
    <div className="form-floating">
      <input type="number" className="form-control" onChange={(e)=>setprice(e.target.value)}   id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">price </label>
      <br/>
    </div>
    <div className="form-floating">
      <input type="text" className="form-control"  onChange={(e)=>setplanning(e.target.value)} id="floatingInput" placeholder="name@example.com" />
      <label for="floatingInput">planning </label>
      <br/>
    </div>
    <div className="form-floating">
      <input onChange={(e)=>setimage(e.target.files[0])}   type="file" className="form-control" id="floatingInput"  />
      <label for="floatingInput">photo </label>
      <br/>
      <div id='save' >
      <button type="button" onClick={(e)=>handleSubmit()}   className="btn btn-success" >save</button>
      <Link to={"/admin"} > <button type="button"  className="btn btn-success">return</button></Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default AddOffer