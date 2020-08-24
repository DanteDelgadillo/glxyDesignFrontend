import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getProduct } from "./apiCore"
import Card from "./Card"
import Card2 from "./Card2"


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

    return (
        <div>
            <Layout title="Home Page" description="Node react Ecomerce app" className=""></Layout>

            <h2 className="mb-4"> Best Sellers</h2>
            <div className="homeContainer">
                {productsBySell.map((product, i) => (
                    <div key={i} >
                        <Card2 product={product}></Card2>
                    </div>

                ))}
            </div>

            <hr />
            <hr />
            <hr />

            <h2 className="mb-4"> New Arrivals</h2>
            <div className="homeContainer">
                {productsByArrival.map((product, i) => (<div key={i} >
                    <Card2 product={product}></Card2>
                </div>))}
            </div>
        </div>
    )
}

export default Home;