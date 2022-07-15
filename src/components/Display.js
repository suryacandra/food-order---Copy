import React, { useState, useReducer, useEffect } from 'react'

import Header from './Header'
import FoodList from './FoodList'
import CartList from './CartList'
import FoodData from './FoodData'

const initialFood = {
  items: [],
  totalHarga: 0
}

const foodReducer = (state, action) => {
  if(action.type === 'ADD'){
    const totalHarga = state.totalHarga + action.item.price * action.item.amount
    const foodIndex = state.items.findIndex(item => item.id === action.item.id)
    const foodItem = state.items[foodIndex]
    let updateItems

    if(foodItem){
      const updateItem = {
        ...foodItem,
        amount: foodItem.amount + action.item.amount
      }

      updateItems = [...state.items]
      updateItems[foodIndex] = updateItem
    } else {
      updateItems = state.items.concat(action.item)
    }
    return {
      items: updateItems,
      totalHarga: totalHarga
    }
  }
  if(action.type === 'REMOVE'){
    const foodIndex = state.items.findIndex(item => item.id === action.id)
    const foodItem = state.items[foodIndex]
    const totalHarga = state.totalHarga - foodItem.price
    let updateItems

    if(foodItem.amount === 1){

      updateItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updateItem = {
        ...foodItem,
        amount: foodItem.amount - 1
      }

      updateItems = [...state.items]
      updateItems[foodIndex] = updateItem
    }

    return {
      items: updateItems,
      totalHarga: totalHarga
    }
  }
  if(action.type === 'DELETE'){
    const foodIndex = state.items.findIndex(item => item.id === action.id)
    const foodItem = state.items[foodIndex]
    const totalHarga = state.totalHarga - foodItem.price * foodItem.amount
    let updateItems

    updateItems = state.items.filter(item => item.id !== action.id)

    return {
      items: updateItems,
      totalHarga: totalHarga
    }
  }
  if(action.type === 'CLEAR'){
    return initialFood
  }

  return initialFood
}

const Display = (props) => {
  const [cart, setCart] = useState(false)
  const [foods, dispatchFoods] = useReducer(foodReducer, JSON.parse(localStorage.getItem('food')) || initialFood)

  useEffect(() => {
    localStorage.setItem('food', JSON.stringify(foods))
  }, [foods])


  const addFoodHandler = item => {
    dispatchFoods({
      type: 'ADD',
      item: item
    })
  }

  const removeFoodHandler = id => {
    dispatchFoods({
      type: 'REMOVE',
      id: id
    })
  }

  const deleteFoodHandler = id => {
    dispatchFoods({
      type: 'DELETE',
      id: id
    })
  }

  const clearHandler = () => {
    dispatchFoods({
      type: 'CLEAR'
    })
  }

  const cartHandler = () => {
    setCart(item => !item)
  }


  const food = {
    items: foods.items,
    totalHarga: foods.totalHarga,
    addFood: addFoodHandler,
    removeFood: removeFoodHandler,
    deleteFood: deleteFoodHandler,
    clearFood: clearHandler
  }


  return (
    <FoodData.Provider value={food}>
      {cart && <CartList on={cartHandler} />}
      <Header on={cartHandler} />
      <FoodList
        data={props.data}
      />
    </FoodData.Provider>
  )
}

export default Display