import React from 'react'
import Cart from './Cart'

const Header = (props) => {

  return (
    <>
      <div className="p-5 bg-yellow-400 w-full border-b-2 border-black shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-mono font-bold tracking-widest">
          Food Order
        </h1>
        <Cart on={props.on} />
      </div>
    </>
  )
}

export default Header