import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signOut, isAuthenticated } from "../auth/index"
import { itemTotal } from "./CartHelper"
import Logo from "../images/GLXYDesignswolinesV2.png"
import CartImg from "../images/icons8-shopping-cart-100.png"

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "black", }
    }
}

const Menu = ({ history }) => (
    <div>
        {/* ********************* new nav *********** */}

        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <Link className="navbar-brand" style={isActive(history, '/')} to="/"><img src={Logo} className="images" alt="pen" /></Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
                <ul class="navbar-nav  ">
                    {/* **************************************************** */}
                    <li class="nav-item navAdjust">
                        <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Products</Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className=" nav-item navAdjust">
                            <Link className="nav-link" style={isActive(history, '/user/dashBoard')} to="/user/dashBoard">Account</Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className=" nav-item navAdjust">
                            <Link className="nav-link" style={isActive(history, '/admin/dashBoard')} to="/admin/dashBoard">Account</Link>
                        </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className=" nav-item navAdjust">
                                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign in</Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <li className=" nav-item navAdjust">
                            <span className="nav-link" style={{ cursor: "pointer", color: 'black' }} onClick={() => signOut(() => {
                                history.push("/");
                            })}>Sign Out</span>
                        </li>
                    )}
                    {/*****Shopping cart *** */}
                    <li class="nav-item navAdjust">
                        <Link className=" btn  cartbutton  " style={isActive(history, '/cart')} to="/cart">
                            <img className="shoppingCartImage" src={CartImg} alt="" />
                            {itemTotal()}
                        </Link>
                    </li>

                </ul>

            </div>
        </nav>
    </div>
)

export default withRouter(Menu);