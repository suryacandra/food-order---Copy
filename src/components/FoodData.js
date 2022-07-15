import React from 'react';

 const FoodData = React.createContext({
    items: [],
    totalHarga: 0,
    addFood: () => {},
    removeFood: () => {},
    deleteFood: () => {},
    clearFood: () => {}
 })

export default FoodData