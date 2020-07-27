import React, { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../core/Layout"
import { signup } from "../auth/index"

const Signup = () => {
    const [userValues, setUserValues] = useState({
        name: "",
        email: '',
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, success, error } = userValues

    const handleChange = name => event => {
        setUserValues({ ...userValues, error: false, [name]: event.target.value })
    }


    const clickSubmit = event => {
        event.preventDefault();
        setUserValues({ ...userValues, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setUserValues({ ...userValues, error: data.error, success: false })
                } else {
                    setUserValues({
                        ...userValues,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input onChange={handleChange("password")} type="Password" className="form-control" value={password}></input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : 'none' }}>
            New account created. Please <Link to="/signin">Sign in</Link>
        </div>
    )

    return (
        <Layout title="Sign-Up" description="Create a Account to shop with us !" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;