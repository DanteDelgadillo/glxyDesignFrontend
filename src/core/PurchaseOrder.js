import React, { useState, useEffect } from "react"
import { readOrderId } from "../user/apiUser"
import Layout from "./Layout"
import { isAuthenticated } from "../auth"




const PurchaseOrder = (props) => {
    const [purchaseData, setPurchaseData] = useState({})
    const [error, setError] = useState(false)

    const { user: { _id, name, email, role } } = isAuthenticated();
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

        <h1>{JSON.stringify(purchaseData)}</h1>



    )
}

export default PurchaseOrder;