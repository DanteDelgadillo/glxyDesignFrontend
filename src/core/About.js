import React, { useState } from "react"
import Layout from "./Layout"
import axios from "axios";


const About = (props) => {
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        subject: "",
        message: ""

    })

    const [formDataError, setFormDataError] = useState({

        nameError: "",
        emailError: "",
        subjectError: "",
        messageError: ""

    })

    const { nameError, emailError, subjectError, messageError } = formDataError
    // *************************validate funtion
    const validate = () => {
        let nameError = "";
        let emailError = "";
        let subjectError = "";
        let messageError = "";

        if (!formData.name) {
            nameError = "Name is Empty";
        }

        if (!formData.subject) {
            subjectError = "Email subject is Empty";
        }

        if (!formData.message) {
            messageError = "Message is Empty";
        }

        if (!formData.email.includes("@")) {
            emailError = "Invalid Email";
        }

        if (emailError || nameError || messageError || subjectError) {
            setFormDataError({ emailError, nameError, messageError, subjectError });
            return false;
        }
        return true;
    };

    // ********************onclick function
    const onClick = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            const { name, email, subject, message } = formData;

            // ********test
            await axios
                .post(`http://localhost:8000/api/emailForm`, {
                    name,
                    email,
                    message,
                    subject
                })
                .then(
                    setFormData({

                        name: "",
                        email: "",
                        subject: "",
                        message: ""

                    })
                )
                .then(
                    setFormDataError({
                        nameError: "",
                        emailError: "",
                        subjectError: "",
                        messageError: ""

                    })
                )
                .catch(err => {
                    console.log(err)

                });
        };


    }



    // ********* on change

    const onChange = (name) => event => {
        setFormData({ ...formData, [name]: event.target.value })
    }




    return (
        <div  >
            {/* ******************* Contact me Form*********** */}
            <div className="flexForm">
                <div className="container sign" >
                    <h2>Questions? email us here:</h2>
                    <div className=" row">
                        <div className="col">
                            <section>
                                <label className="font">Name:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={onChange("name")}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {nameError}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="show-grid row">
                        <div className="col">
                            <section>
                                <label className="font">Your Email:</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={onChange("email")}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {emailError}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="show-grid row">
                        <div className="col">
                            <section>
                                <label className="font">Subject:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={onChange("subject")}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {subjectError}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="show-grid row">
                        <div className="col">
                            <section>
                                <label className="font">Message:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={onChange("message")}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {messageError}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="show-grid ">
                        <br></br>
                        <div className="">
                            <button
                                className="btn btn-primary"
                                onClick={onClick}
                            >
                                Submit

                            </button >
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About;