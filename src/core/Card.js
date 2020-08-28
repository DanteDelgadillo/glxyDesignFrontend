import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import ProductImage from "./ProductImage"
import moment from 'moment'
import { addItem, updateItems, removeItem } from "./CartHelper"

const Card = ({ product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined }) => {

    const [redirct, setRedirct] = useState(false)
    const [count, setCount] = useState(product.count)

    const showButton = (showViewProductButton) => {
        return (
            showViewProductButton && (

                <Link className="mr-2" to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-t">
                        view Product
                </button>
                </Link>
            )
        )
    }




    const addToCart = () => {
        addItem(product, () => {
            setRedirct(true)
        })
    }

    const shouldRedirct = redirct => {
        if (redirct) {
            return <Redirect to="cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn cartbutton   mt-2 mb-2">
                    Add to Cart
        </button>
            ))
    }

    const showStock = (quantity) => {
        return (quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock {quantity}</span> : <span badge badge-primary badge-pill>Out of Stock</span>

        )
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItems(productId, event.target.value)
        }
    }


    const showCartUpdate = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Qanity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }

    const showRemoveButton = (showRemoveProductButton) => {
        return (
            showRemoveProductButton && (
                <button onClick={() => { removeItem(product._id); setRun(!run); }} className="btn btn-outline-danger mt-2 mb-2">
                    Delete
        </button>
            ))
    }



    return (
        <div className="productContainer">
            <div className="productDiv">
                <ProductImage item={product} url="product" />
            </div>
            <div className="productDiv productInfo">
                <center>
                    <h2>
                        {product.name}
                    </h2>
                </center>
                <div><h5>Description:</h5></div>
                <div className="inputDescription"> {product.description.substring(0, 75)}</div>
                <div><h5>Price:</h5></div>
                <div className="inputDescription">Price: $ {product.price}</div>
                <div><h5>Categry:</h5></div>
                <div className="inputDescription">{product.category && product.category.name}</div>

                <div className="addToCart">
                    <div > Added on {moment(product.createdAt).fromNow()}</div>
                    {showStock(product.quantity)}

                    <br />

                    {showAddToCart(showAddToCartButton)}
                </div>
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdate(cartUpdate)}
            </div>
        </div>


    )

}

export default Card;