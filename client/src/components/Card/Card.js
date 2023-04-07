import React from 'react'
import "./card.css"

function Card({el}) {
  return (
   <div className="card"    id='crd' style={{width: '18rem'}}> 
  <img src={el.logo} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{el.specialty.toUpperCase()} </h5>
    <hr/>
    <div className="card-text"> {el.planing&&el.planing.split(',').map((el)=><div key={el._id} type="text" className="btn btn-primary" id='plan' >
{el}
</div>)}</div>
 <button  id='price-card' className="btn btn-secondary">{el.price} DT </button>
   </div>
</div>

  )
}

export default Card