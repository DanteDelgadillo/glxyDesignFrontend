import React from "react"
import { API } from "../config"

const ProductImage = ({ item, url }) => (
    <div >
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} />
    </div>
)

export default ProductImage;