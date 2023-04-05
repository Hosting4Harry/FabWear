import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Contact = () => {
    const timeout = useRef(null)
    const navigate = useNavigate()
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (!response.data.login) {
                navigate("/");
            }
        })
    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        axios.post("http://localhost:8000/contact", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: details
        }).then(response => {
            toast.success(response.data.message || "message send", {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
        setStatus("Submit");
    };

    return (<div className='container' style={{}}>
        <h2 className="h1-responsive font-weight-bold text-center mt-4">Contact us</h2>
        <div className='row mb-5' >
            <div className="col-lg-4 col-sm-0 col-md-3"></div>
            <div className="col-lg-4 col-sm-0 col-md-6"><hr width="100% " size="10" /></div>
            <div className="col-lg-4 col-sm-0 col-md-3"></div>
        </div>
        <section className=" form-control p-5" style={{ marginTop: "20px", marginBottom: "250px", border: "none" }}>
            <div className="row " >
                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within few minutes to help you.</p>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="name" className="">Your name</label>
                                    <input type="text" id="name" name="name" className="form-control" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <label htmlFor="email" className="">Your email</label>
                                    <input type="text" id="email" name="email" className="form-control" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <label htmlFor="subject" className="">Subject</label>
                                    <input type="text" id="subject" name="subject" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form">
                                    <label htmlFor="message">Your message</label>
                                    <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-md-left mt-4">
                            <button type='submit' className="btn btn-primary" >{status}</button>
                        </div>
                    </form>
                    <div className="status"></div>
                </div>
                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li><i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>Ahmedabad, Ganesh Meridian, India</p>
                        </li>
                        <li><i className="fas fa-phone mt-4 fa-2x"></i>
                            <p>+91 70775 52981</p>
                        </li>
                        <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                            <p>cart@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>

    )
}

export default Contact
