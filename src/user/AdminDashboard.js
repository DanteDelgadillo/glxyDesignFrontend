import React from 'react';
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header" style={{ backgroundColor: "#b047ff", color: "white" }}>Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create/category" className="nav-link">Create category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/create/product" className="nav-link">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link">Manange Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
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



    return (
        <div>
            <Layout title="DashBoard" description={`GoodDay! ${name}!`} className="container">       </Layout>
            <div className="adminContainer">
                <div >
                    {adminLinks()}
                </div>
                <div >
                    {adminInfo()}
                </div>
            </div>
        </div>

    )
}

export default AdminDashBoard;