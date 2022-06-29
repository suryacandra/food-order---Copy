import React from 'react'
import FoodItem from './FoodItem'

const FoodList = (props) => {

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-slate-600 p-2 rounded-lg text-white text-center m-2 mt-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero perferendis non consectetur harum ex, saepe quidem voluptate et atque.
        </p>
      </div>
      <div className="p-5 m-5 bg-yellow-200 rounded-lg">
        {
          props.data.map((item, i) => {
            return <FoodItem 
              key={i}
              id={item.id} 
              name={item.name}
              price={item.price}
              description={item.description}
              amount={item.amount}
            />
          })
        }
      </div>
    </div>
  )
}

export default FoodList