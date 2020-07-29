import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getProduct } from "./apiCore"
import Card from "./Card"


const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProduct("sold")
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(error)
                } else {
                    setProductsBySell(data)
                }
            })
    }

    const loadProductsByArival = () => {
        getProduct("createdAt")
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProductsByArrival(data)
                }
            })
    }

    useEffect(() => {
        loadProductsByArival();
        loadProductsBySell();
    }, [])

    return (<Layout title="Home Page" description="Node react Ecomerce app" className="container-fluid">

        <h2 className="mb-4"> Best Sellers</h2>
        <div className="row">
            {productsBySell.map((product, i) => (

                <div key={i} className="col-4 mb-3">
                    <Card product={product}></Card>
                </div>

            ))}
        </div>

        <h2 className="mb-4"> New Arrivals</h2>
        <div className='row'>
            {productsByArrival.map((product, i) => (<div key={i} className="col-4 mb-3">
                <Card product={product}></Card>
            </div>))}
        </div>
    </Layout>
    )
}

export default Home;