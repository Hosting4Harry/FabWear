import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import configData from '../environments/config.json'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState("");
    // const timeout = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkRole = () => {
        const t = localStorage.getItem("Ecomtoken");
        if (t) {
            let decoded;
            try {
                decoded = jwt_decode(t);
            } catch (error) {
            }
            if (decoded.role === 1 || decoded.role === 2) {
                navigate("/dashboard");
            } else {
                navigate("/home");
            }
        } else {
            navigate('/')
        }

    }

    const onSub = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
            checked: checked
        }

        const res = await axios.post(`${configData.baseUrl}/login`, data);
        if (res.data.msg) {
            setStatus(true);
            setMsg(res.data.msg);
        }
        else {
            localStorage.setItem("Ecomtoken", res.data.token);
            localStorage.setItem("EcomUser", res.data.user);
            localStorage.setItem("EcomUserId", res.data.userID);
            localStorage.setItem("EcomEmail", res.data.userEmail);
            checkRole();
        }
    }

    return (
        <>
            <div className="login" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            {
                                status ? (
                                    <>
                                        <div className="alert alert-primary alert-dismissible fade show ">
                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setStatus(false)}>&times;</button>
                                            <p>{msg}</p>
                                        </div>
                                    </>
                                ) : null
                            }
                            <br />
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={onSub}>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" defaultChecked={checked} onChange={(e) => { setChecked(e.target.checked) }} /> Remember Me
                                </div>
                                <button type="submit" className="btn btn-info">Login</button>
                            </form>
                            <br />
                            <span>Don't have an account? <NavLink to="/register" >Register Now</NavLink>
                            </span>
                            <br />
                            <NavLink to="/resetpassword">Forgot Password</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
