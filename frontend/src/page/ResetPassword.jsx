import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import configData from '../environments/config.json'

function ResetPassword() {
    const navigate = useNavigate()
    const [allValues, setAllValues] = useState({
        userName: '',
        password: '',
        otp: null
    });
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        const config = {
            method: 'post',
            url: `${configData.baseUrl}/resetPassword`,
            data: {
                email: allValues.email,
                otp: allValues.otp,
                password: allValues.password
            }
        };
        axios(config)
            .then(response => {
                setGeneratedOtp(response.data.otp);
                setAllValues({ ...allValues, email: "", otp: null, password: '' })
                alert(response.data.message);
                if (response.data.status) {
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <div className="login" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            <form onSubmit={submit}>
                                {
                                    !generatedOtp &&
                                    <>
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="email" placeholder="Enter Email" defaultValue={allValues.email} onChange={(e) => { setAllValues(allValues => ({ ...allValues, email: e.target.value })) }} required />
                                        </div>
                                    </>
                                }
                                {generatedOtp &&
                                    <>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="otp" placeholder="Enter Otp" defaultValue={allValues.otp} maxLength="6" onChange={(e) => { setAllValues(allValues => ({ ...allValues, otp: e.target.value })) }} required />
                                        </div>
                                        <div className="input-group mb-3">

                                            <input type="text" className="form-control" placeholder="New Password" defaultValue={allValues.password} onChange={(e) => { setAllValues(allValues => ({ ...allValues, password: e.target.value })) }} />
                                        </div>
                                    </>
                                }
                                <button type="submit" className="btn btn-info">Submit</button>
                                <div className="message">
                                    <div></div>
                                    <div>Go back to<Link to="/"> login</Link></div>
                                    <div></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword