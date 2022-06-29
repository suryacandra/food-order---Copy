import React, { useState, useEffect } from 'react'
import Display from './components/Display'

const App = () => {
  const [foods, setFoods] = useState([
    {
      id: 0,
      name: 'Pizza',
      price: 10,
      description: 'Pizza',
      amount: 1,
    },
    {
      id: 1,
      name: 'Nasi Goreng',
      price: 3,
      description: 'Nasi digoreng',
      amount: 1,
    },
    {
      id: 2,
      name: 'Kebab Bakar',
      price: 6,
      description: 'Kebab dibakar',
      amount: 1,
    },
    {
      id: 3,
      name: 'Ayam Bakar',
      price: 2,
      description: 'Ayam paha dibakar',
      amount: 1,
    },
    
])
  
  return (
      
      <Display
        data={foods}
      />

  )
  
}  

export default App;
