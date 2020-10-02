import React, { useState, useEffect } from "react"
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


            <div >

                {product && product.description && <Card product={product} showViewProductButton={false} />}

            </div>


            <h4 className="pName">Related Products :</h4>
            <div className="productContainer">
                {realtedProduct.map((p, i) => (
                    <div key-={i}>
                        <Card2 product={p}></Card2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;