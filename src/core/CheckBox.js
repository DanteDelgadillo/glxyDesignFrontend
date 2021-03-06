import React, { useState } from "react"

const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        //return the first index or -1 
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <lable type="checkbox" className="form-check-label">{c.name} </lable>
        </li>
    ))
}

export default CheckBox;