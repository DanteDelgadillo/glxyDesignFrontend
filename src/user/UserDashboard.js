import React, { useEffect, useState } from 'react';
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser"
import moment from 'moment'
import { API } from "../config"

const DashBoard = () => {

    const [history, setHistory] = useState([])

    const { user: { _id, name, email, role } } = isAuthenticated();

    const token = isAuthenticated().token

    const init = () => {
        const userId = _id

        getPurchaseHistory(userId, token)
            .then(data => {
                if (data.error) {

                } else {
                    setHistory(data)
                }
            })
    }

    useEffect((_id, token) => {
        init()
    }, [])

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header" style={{ backgroundColor: "#b047ff", color: "white" }}>User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/profile/${_id}`} className="nav-link">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header" style={{ backgroundColor: "#b047ff", color: "white" }}>User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header" style={{ backgroundColor: "#b047ff", color: "white" }}>Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div key={i}>
                                    <hr />
                                    <center>
                                        <h3>Order Number: {h._id}</h3>
                                        {console.log(h)}
                                    </center>
                                    <h6>Tracking:</h6>
                                    <h6>Number of Products: {h.products.length}</h6>
                                    <h6>Status: {h.status}</h6>
                                    <h6>
                                        Purchased date:{" "}
                                        {moment(h.createdAt).format('MM/DD/YYYY')}
                                    </h6>
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (

        <Layout title="DashBoard" description={`GoodDay! ${name}!`} className="container">
            <div className="adminContainer">
                <div >
                    {userLinks()}
                </div>
                <div >
                    {userInfo()}

                </div>
            </div>
            {purchaseHistory(history)}
        </Layout>
    )
}

export default DashBoard;