import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import Card2 from "./Card2"
import { getCart } from './CartHelper'
import CheckOut from "./CheckOut"

const Cart = () => {

    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);



    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your Cart has {`${items.length}`}</h2>
                <hr />
                {items.map((p, i) => (
                    <Card2 key={i} product={p} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun}
                        run={run}></Card2>
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your Cart is empty.<Link to="/shop">Continue Shopping</Link>
        </h2>
    )


    return (
        <Layout title="Shopping Cart" description="Manage your Cart" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">
                        Your cart Summary
                  </h2>
                    <hr />
                    <CheckOut setRun={setRun} products={items} />
                </div>

            </div>
        </Layout>
    )
}

export default Cart