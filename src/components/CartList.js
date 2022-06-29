import React, { useContext } from 'react'
import FoodData from './FoodData'

const CartList = (props) => {

    const food = useContext(FoodData)

    const addHandler = item => {
        food.addFood({
            ...item,
            amount: 1
        })
    }

    const removeHandler = id => {
        food.removeFood(id)
    }

    const deleteHandler = id => {
        food.deleteFood(id)
    }

  return (
    <div>
        <div onClick={props.on} className="absolute w-full h-[780px] bg-slate-800/60 p-5">
        </div>
        <div className="grid grid-cols-2 w-[414px] sm:w-1/2 place-items-center gap-2 bg-white rounded-lg absolute p-5 m-3 top-[30%] left-[0%] sm:left-[25%] sm:right-[100%]">
            <div className="col-span-2 w-full">
                {food.items.length > 0 && <div className='grid grid-cols-3 bg-yellow-300 p-2 border-l-2 border-b-2 border-r-2 border-black'>
                    <span className="">Food Name</span>
                    <span className=' place-self-center'>Amount</span>
                    <span className=' place-self-end'>Price</span>
                </div>}
                {
                    food.items.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col border-l-2 border-b-2 border-r-2 border-black">
                            <div className="p-1 grid grid-cols-3">
                                <div className=" text-md font-mono font-bold tracking-widest self-center">
                                        {item.name}
                                    </div>
                                <div className="text-sm place-self-center mt-2">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-red-300 px-2 ml-2" onClick={() => removeHandler(item.id)}>-</button>
                                        {item.amount}
                                        <button className="bg-green-300 px-2 mr-2" onClick={() => addHandler(item)}>+</button>
                                    </div>
                                    </div>
                                <div className="text-sm place-self-end mt-2">
                                    ${item.price * item.amount}
                                </div>
                            </div>
                            {item.amount > 1 && <button className="bg-red-300 flex p-1 px-3 mt-2 mb-2 rounded-lg self-center border-b-2 border-black" onClick={() => deleteHandler(item.id)}>Delete</button>}
                            </div>
                        )
                    })
                }
            </div>
            <div className="col-span-2">
                {food.items.length > 0 ? <h1>Total Price : ${food.totalHarga}</h1> : <p>Theres nothing here yet, add some food please...</p>}
            </div>
            {food.items.length > 0 ? <button onClick={props.on} className="bg-red-300 w-1/2 rounded-lg p-2 px-5">Close</button> : <button onClick={props.on} className="bg-red-300 w-1/2 rounded-lg p-2 px-5 col-span-2">Close</button>}
            {food.items.length > 0 && <button className="bg-green-300 w-1/2 rounded-lg p-2 px-5">Order</button>}
        </div>
</div>
  )
}

export default CartList