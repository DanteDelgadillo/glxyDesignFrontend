import React, { useState } from 'react';

import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin"

const AddCategory = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructure user and token from localStrage
    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError("")
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                console.log(token, "thisone")
                if (data.err) {
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name </label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />

            </div>
            <button className="btn btn-outline-primary"> Create Category</button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is Created!</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning"> Back to Dashbord</Link>
        </div>
    )

    return (

        <div className="row">
            <div className="col-md-8 offset-md-2">{showSuccess()}{showError()}{newCategoryForm()}   {goBack()}</div>

        </div>


    );

}

export default AddCategory;