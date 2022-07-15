import React, { useState, useEffect, useContext } from 'react'
import Food from './FoodData'

import useInput from '../hooks/use-input'

const Order = props => {
    const [onView, setOnView] = useState(false)
    const [loading, setLoading] = useState(false)
    const [payment, setPayment] = useState('cash')
    
    const food = useContext(Food)
    
    useEffect(() => {
        if (loading) {
            setOnView(true)
            setTimeout(
                () => {
                    props.on()
                }, 5000
            )
        }

        return () => {
            setOnView(false)
            clearTimeout()
        }
    }, [loading, props])

    const order = async () => {
        const totalOrderItems = {
            food: props.food.items,
            totalPrice: props.food.totalHarga
        }
        const orderItems = {
            name,
            email,
            phone,
            address,
            payment,
            order: totalOrderItems
        }

        return await fetch('https://react-api-4f165-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItems)
        })
    }

    const paymentValueHandler = e => {
        setPayment(e.target.value)
    }

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueHandler: nameValueHandler,
        onTouchHandler: nameOnTouchHandler,
        reset: nameReset,
    } = useInput(value => value.trim() !== '')

    const {
        value: address,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueHandler: addressValueHandler,
        onTouchHandler: addressOnTouchHandler,
        reset: addressReset,
    } = useInput(value => value.trim() !== '')

    const {
        value: phone,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueHandler: phoneValueHandler,
        onTouchHandler: phoneOnTouchHandler,
        reset: phoneReset,
    } = useInput(value => value.trim() !== '')

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueHandler: emailValueHandler,
        onTouchHandler: emailOnTouchHandler,
        reset: emailReset,
    } = useInput(value => value.trim() !== '' && value.includes('@'))


    let formIsValid

    if (nameIsValid && addressIsValid && phoneIsValid && emailIsValid) {
        formIsValid = true
    }

    const submitHandler = () => {
        if(formIsValid) {
            order()
            nameReset()
            addressReset()
            phoneReset()
            emailReset()
            setLoading(true)
            food.clearFood()
        }
        
    }

    return (
        <>
        {!onView && <div className="flex flex-col items-center gap-5">
            <h1>Order Confirmation</h1>
            <form className="grid grid-cols-2 gap-2 m-2">
                <div>
                    <legend>Name</legend>
                    <input type="text" className="w-full border-black border-2 p-2" placeholder="Name...." value={name} onChange={nameValueHandler} onBlur={nameOnTouchHandler} />
                    {nameHasError && <p className="text-red-500 text-sm">Please enter your name</p>}
                </div>
                <div>
                    <legend>Address</legend>
                    <input type="text" className="w-full border-black border-2 p-2" placeholder="Address..."
                    value={address} onChange={addressValueHandler} onBlur={addressOnTouchHandler}
                    />
                    {addressHasError && <p className="text-red-500 text-sm">Please enter your address</p>}
                </div>
                <div>
                    <legend>Phone</legend>
                    <input type="number" className="w-full border-black border-2 p-2" placeholder="+62" value={phone} onChange={phoneValueHandler} onBlur={phoneOnTouchHandler} />
                    {phoneHasError && <p className="text-red-500 text-sm">Please enter your phone number</p>}
                </div>
                <div>
                    <legend>Email</legend>
                    <input type="email" className="w-full border-black border-2 p-2" placeholder="Email..." value={email} onChange={emailValueHandler} onBlur={emailOnTouchHandler}  />
                    {emailHasError && <p className="text-red-500 text-sm">Please enter your email</p>}
                </div>
                <div className="col-span-2">
                    <legend>Payment</legend>
                    <select name="payment" className="border-2 border-black p-2 w-full" onChange={paymentValueHandler}>
                        <option value="cash">Cash</option>
                        <option value="cc">Credit Card</option>
                        <option value="paypal">Paypal</option>
                    </select>
                </div>
            </form>
            <div className="w-full flex flex-col gap-2 items-center">
                <h1>Your Items</h1>
                <div className="w-full flex flex-col gap-2 items-center border-2 border-black bg-yellow-300">
                    {props.food.items.map((item, index) => <div key={index} className="grid grid-cols-3 place-items-center w-full p-2">
                        <span className="place-self-start">{item.name}</span>
                        <span>${item.price}</span>
                        <span className="place-self-end">{item.amount}</span>
                    </div>)}
                    <span>Total Price : ${props.food.totalHarga}</span>
                </div>
                <div className="flex justify-evenly w-full">
                    <button className="bg-red-300 px-5 p-1" onClick={props.order}>Cancel</button>
                    <button className="bg-green-300 px-5 p-1 disabled:bg-slate-300 disabled:cursor-not-allowed" disabled={!formIsValid} onClick={submitHandler}>Confirm</button>
                </div>
            </div>
        </div>}
        {loading && <p>Order Complete</p> }
        </>
    )
}

export default Order