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
                autoClose: 5000,
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

    return (
        <div className='address'>
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 col-12 mx-auto">
                        <div className="card">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input className="form-control" type="text" id="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input className="form-control" type="email" id="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea className="form-control" id="message" required />
                                </div>
                                <button className='btn btn-info pt-2 pb-2 pl-5 pr-5' type="submit">{status}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
