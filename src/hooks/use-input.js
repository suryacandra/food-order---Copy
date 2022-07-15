import { useState } from 'react'

const useInput = (params) => {
    const [value, setValue] = useState("")
    const [onTouch, setOnTouch] = useState(false)

    const isValid = params(value)
    const hasError = !isValid && onTouch

    const valueHandler = e => {
        setValue(e.target.value)
    }

    const onTouchHandler = () => {
        setOnTouch(true)
    }

    const reset = () => {
        setValue("")
        setOnTouch(false)
    }

    return {
        value,
        isValid,
        hasError,
        valueHandler,
        onTouchHandler,
        reset
    }
}

export default useInput