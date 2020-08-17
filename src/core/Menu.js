import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signOut, isAuthenticated } from "../auth/index"
import { itemTotal } from "./CartHelper"

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "#ffffff" }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tab bg-primary">
            <li className=" nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>

            <li className=" nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Products</Link>
            </li>

            <li className=" nav-item">
                <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li>
            <li className=" nav-item">
                <Link className="nav-link" style={isActive(history, '/about')} to="/about">About </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className=" nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashBoard')} to="/user/dashBoard">DashBoard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className=" nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashBoard')} to="/admin/dashBoard">DashBoard</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className=" nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign in</Link>
                    </li>

                    <li className=" nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign up</Link>
                    </li>

                </Fragment>
            )}

            {isAuthenticated() && (
                <li className=" nav-item">
                    <span className="nav-link" style={{ cursor: "pointer", color: '#ffffff' }} onClick={() => signOut(() => {
                        history.push("/");
                    })}>Sign Out</span>
                </li>
            )}


        </ul>
    </div>
)

export default withRouter(Menu);