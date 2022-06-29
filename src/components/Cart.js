import React, { useContext } from 'react'
import FoodData from './FoodData'


const Cart = (props) => {
  const food = useContext(FoodData)

  const total = food.items.reduce((acc, item) =>{
    return acc + item.amount
  }, 0)
 

  return (
    <div className="flex w-[150px] items-center gap-2 border-2 border-black rounded-lg p-2 cursor-pointer active:scale-90 active:bg-green-300"
    onClick={props.on}>
      <div>
        Your Cart
      </div>
      <div className="p-2 w-[50px] bg-yellow-600 rounded-full text-center">
        {total}
      </div>
    </div>
  )
}

export default Cart