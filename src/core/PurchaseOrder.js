import React, { useState, useEffect } from "react"
import { readOrderId } from "../user/apiUser"
import { isAuthenticated } from "../auth"
import moment from 'moment'




const PurchaseOrder = (props) => {
    const [purchaseData, setPurchaseData] = useState({})
    const [error, setError] = useState(false)

    const { user: { _id, name, email, role, address } } = isAuthenticated();
    const token = isAuthenticated().token

    const loadPurchaseData = orderId => {
        const userId = _id
        readOrderId(orderId, userId, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    console.log(data.error)
                } else {
                    setPurchaseData(data)
                    console.log(data)
                }
            })
    }


    useEffect(() => {
        const orderId = props.match.params.userId
        loadPurchaseData(orderId)


    }, [props])
    return (
        <div>
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
                        <h5>Shipping Address: {email}</h5>
                    </div>
                </div>
            </div>

        </div>
        // <h1>{JSON.stringify(purchaseData)}</h1>



    )
}

export default PurchaseOrder;