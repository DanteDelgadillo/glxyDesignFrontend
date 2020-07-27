import React, { useState, useEffect, Fragment } from "react"

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValues] = useState(0)


    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValues(event.target.value)
    }


    return prices.map((price, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${price._id}`}
                name={price}
                type="radio"
                className="mr-2 ml-4"
            />
            <lable
                type="checkbox"
                className="form-check-label">
                {price.name}
            </lable>
        </div>
    ))
}

export default RadioBox;