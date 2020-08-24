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
        <Layout title={product && product.name}
            description=
            {product && product.description && product.description.substring(0, 100)}
            className="container-fluid">

            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>
                <div className="col-4">
                    <h4>Related Products</h4>
                    {realtedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key-={i} product={p}></Card>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    )
}

export default Product;