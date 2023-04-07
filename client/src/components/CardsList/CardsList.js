import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import "./CardList.css"
function CardsList() {
  const list = useSelector(state => state.offerReducer.offers)
 
 return (
<div  className='flx' > 
      {list.map((el)=> <Card  key={el._id} el={el} />)} 
    
    
    </div>
  )
}

export default CardsList