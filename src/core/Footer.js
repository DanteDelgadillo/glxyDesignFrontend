import React from "react"
import { Link } from "react-router-dom"

const RadioBox = ({ prices, handleFilters }) => {


    return (

        <footer>
            <section className="ft-legal">
                <ul className="ft-legal-list">
                    <li><i className="fa fa-instagram icons" ></i></li>
                    <li><i className="fa fa-etsy eIcons" ></i></li>
                    <li className="fontF" style={{ flexGrow: "8", textAlign: "center" }}>&copy; 2019 Copyright GlxyDesign</li>
                    <li  >
                        <Link to="/about" className="fontF">Contact</Link>
                    </li>
                    <li>
                        <Link to="/shop" className="fontF">Products</Link>
                    </li>
                    <li>
                        <Link to="/user/dashBoard" className="fontF">Account</Link>
                    </li>

                </ul>
            </section>
        </footer>

    )
}

export default RadioBox;