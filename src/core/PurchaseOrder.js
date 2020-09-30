import React, { useState, useEffect } from "react"
import { readOrderId } from "../user/apiUser"
import { isAuthenticated } from "../auth"
import moment from 'moment'

const PurchaseOrder = (props) => {
    const [purchaseData, setPurchaseData] = useState([])
    const [error, setError] = useState(false)
    const [productList, setProductList] = useState([])

    const { user: { _id, name, email, } } = isAuthenticated();
    const token = isAuthenticated().token

    // ****api call to get Product*********
    const loadPurchaseData = orderId => {
        const userId = _id
        readOrderId(orderId, userId, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(data.error)
                } else {
                    setPurchaseData(data)
                    setProductList(data.products)
                }
            })
    }


    useEffect(() => {
        const orderId = props.match.params.userId
        loadPurchaseData(orderId)


    }, [props,])
    // *************total var********
    const sum = productList.reduce((accumulator, current) => accumulator + current.price, 0)
    // **************table function***************
    const productTable = productList => {
        return (
            <div className="table-responsive pTable">
                {console.log("fhgjkdsgkhfs", sum)}
                <table className="table productT">
                    <tbody>
                        <tr className="">
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        {productList.map((p, i) => (

                            <tr key={i}>
                                <td>{p.name}</td>
                                <td>{p.name}</td>
                                <td>X {p.count}</td>
                                <td>${p.price}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            {console.log(productList)}
            <center>
                <div className="order">Order#: {purchaseData._id}</div>
                <span className="orderDate">Date Ordered: {moment(purchaseData.createdAt).format('MM/DD/YYYY')}</span>
            </center>
            <div className="orderFlexContainer">
                <div>
                    <center>
                        <div className="orderTitle">User:</div>
                    </center>
                    <div className="infoContainer">
                        <h5>Name: {name}</h5>
                        <h5>Email: {email}</h5>
                    </div>
                </div>
                <div>
                    <center>
                        <div className="orderTitle">Shipping Information:</div>
                    </center>
                    <div className="infoContainer">
                        <h5>Status: {purchaseData.status}</h5>
                        <h5>Tracking: {email}</h5>
                        <h5>Shipping Address: {purchaseData.address}</h5>
                    </div>
                </div>
            </div>

            {/* table */}
            {productTable(productList)}

            {/* <div className="totalBox">
                <center>
                    <h4>Product Total:${sum}</h4>
                    <h4>Shipping Cost:</h4>
                    <br />
                    <hr className="line" />
                    <h2 className="total">Total:</h2>
                </center>
            </div> */}

        </div>




    )
}

export default PurchaseOrder;