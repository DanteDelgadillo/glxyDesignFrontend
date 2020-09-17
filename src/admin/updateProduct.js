import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin"

const UpdateProduct = ({ match }) => {


    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    })
    const { user, token } = isAuthenticated()
    const { name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category._id,
                        shipping: data.shipping,
                        quantity: data.quantity,
                        formData: new FormData()
                    })
                    initCategories()
                }
            })
    }

    //Load categories and set form data
    const initCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    setValues({ categories: data, formData: new FormData() })
                }
            })
    }


    useEffect(() => {
        init(match.params.productId);
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({
            ...values,
            [name]: value
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true, })

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, createdProduct: "" })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        error: false,
                        createdProduct: data.name,
                        formData: "",
                        redirectToProfile: true
                    })
                }
            })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <lable className="btn btn-secondary">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" />
                </lable>
            </div>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input onChange={handleChange("name")} type="text" className='form-control' value={name} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Description</lable>
                <textarea onChange={handleChange("description")} className='form-control' value={description} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Price</lable>
                <input onChange={handleChange("price")} type="number" className='form-control' value={price} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Category</lable>
                <select onChange={handleChange("category")} className='form-control'  >
                    <option >Select One</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <lable className="text-muted">Quantity</lable>
                <input onChange={handleChange("quantity")} type="number" className='form-control' value={quantity} />
            </div>

            <div className="form-group">
                <lable className="text-muted">Shipping</lable>
                <select onChange={handleChange("shipping")} className='form-control'  >
                    <option >Select One</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form>

    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{createdProduct} is Updated!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    }

    return (

        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
                {redirectUser()}
            </div>

        </div>


    )
}

export default UpdateProduct;