import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { deleteOffer } from '../../Redux/actions/actionsOffer'

function OffersList() {
    const list = useSelector(state => state.offerReducer.offers)
    const dispatch = useDispatch()
    
    
const handlesubmit=(id)=>{
  
   let msg=window.confirm("Press a button!");
   if(msg==true){    
   dispatch(deleteOffer(id))
   }
  }
  
return (
    <div className='flx' >
    {list.map((el)=>  <div className="card" key={el._id} style={{width: '18rem'}}>
    <img src={el.logo} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{el.specialty}</h5>
       <p className="card-text"> {el.planing}</p>
    <h5>{el.price} DT</h5>
    <div id='adminc'  >
    <Link to={`/edit/${el._id}`}  > <button type="button" className="btn btn-info">edit</button></Link>
     <button type="button" onClick={(e)=>handlesubmit(el._id)}   className="btn btn-danger">delete</button>
     </div>
     </div>
     </div> )} 
     </div>  
  )
}

export default OffersList