import React, { useContext, useRef } from 'react'
import FoodData from './FoodData'

const FoodItem = (props) => {

  const food = useContext(FoodData)
  const input = useRef()

  const submitHandler = e => {
    e.preventDefault()
    const amount = input.current.value
    const realAmount = +amount
    food.addFood({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: realAmount
    })
  }

  return (
    <div className="flex mt-2 p-2 justify-between items-center border-2 border-black">
      <div className="flex flex-col gap-2 items-start">
        <h1 className="font-bold font-mono text-lg">{props.name}</h1>
        <p className="text-md italic">"{props.description}"</p>
        <span className="text-lg text-orange-600"><b>$</b>{props.price}</span>
      </div>
      <form className="flex flex-col items-end gap-2" onSubmit={submitHandler}>
        <input ref={input} type="number" min='1' max='5' step='1' defaultValue='1' className="w-1/2 text-center border-2 border-black"/>
        <button className="p-2 px-7 bg-green-500 rounded-lg border-b-2 border-r-2 border-black active:scale-50">+ Add</button>
      </form>
    </div>
  )
}

export default FoodItem