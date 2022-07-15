import React, { useState, useEffect } from 'react'
import Display from './components/Display'

const App = () => {
  const [foods, setFoods] = useState([])

  const fetchFood = async () => {
    const response = await fetch('https://react-api-4f165-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
    const data = await response.json()
    let arr = []
    for(let key in data){
      arr.push(
        ...data[key])
    }
    setFoods(arr)
  }

  useEffect(() => {
    fetchFood()
  }, [])
  
  return (
    <>
    <Display
      data={foods}
    />
    </>
  )
  
}  

export default App;
