import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import { signin, authenticate, isAuthenticated } from "../auth/index"
import { Link } from "react-router-dom"

const Signin = () => {
    const [userValues, setUserValues] = useState({
        email: '',
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    })

    const { email, password, error, loading, redirectToReferrer } = userValues

    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setUserValues({ ...userValues, error: false, [name]: event.target.value })
    }


    const clickSubmit = event => {
        event.preventDefault();
        setUserValues({ ...userValues, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                console.log(data)
                if (data.err) {
                    setUserValues({ ...userValues, error: data.err, loading: false })
                } else {
                    authenticate(data, () => {
                        setUserValues({
                            ...userValues,
                            redirectToReferrer: true
                        })
                    })
                }
            })

    }

    const signUpForm = () => (
        <div className="container sign">
            <form>
                <center>
                    <h2>Sign In</h2>
                </center>
                <div className="form-group">
                    <label className="text">Email:</label>
                    <input onChange={handleChange("email")} type="email" className="form-control" value={email}></input>
                </div>
                <div className="form-group">
                    <label className="text">Password:</label>
                    <input onChange={handleChange("password")} type="Password" className="form-control" value={password}></input>
                </div>
                <button onClick={clickSubmit} className="btn btn-light pull-right">Submit</button>
            </form>


            <div className="form-group">
                <label style={{ fontSize: "12px" }} className="text">Don't have a account?</label>


            </div>
            <Link className="btn btn-light" to="/signup">Sign Up</Link>
        </div>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading....</h2></div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }



    return (
        <div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;