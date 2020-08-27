import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { listRelated, read } from "./apiCore"
import Card from "./Card"
import Card2 from "./Card2"

const Product = (props) => {
    const [product, setProduct] = useState([])
    const [realtedProduct, setRealtedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingalProduct = productId => {
        read(productId)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProduct(data)
                    // fetch realted products
                    listRelated(data._id)
                        .then(data => {
                            if (data.error) {
                                setError(data.error)
                            } else {
                                setRealtedProduct(data);
                            }
                        })
                }
            })
    }


    useEffect(() => {
        const productId = props.match.params.productId
        loadSingalProduct(productId)

    }, [props])


    return (
        <div>
            <Layout title={product && product.name}
                description=
                {product && product.description && product.description.substring(0, 100)}
                className="container-fluid"> </Layout>

            <div >

                {product && product.description && <Card product={product} showViewProductButton={false} />}

            </div>


            <h4 className="pName">Related Products :</h4>
            <div className="homeContainer">
                <div >
                    {realtedProduct.map((p, i) => (
                        <div >
                            <Card2 key-={i} product={p}></Card2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product;