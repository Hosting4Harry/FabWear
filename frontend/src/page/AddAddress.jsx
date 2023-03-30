import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddAddress.css"

function AddAddress() {
    const navigate = useNavigate();
    const datemail = localStorage.getItem('EcomEmail');
    const dat = localStorage.getItem('EcomUserId');


    const [addressDetails, setAddressDetails] = useState({
        fname: "",
        lname: '',
        email: datemail,
        phone: '',
        address: '',
        zip: '',
        state: '',
        city: '',
        user_id: dat
    });
    // eslint-disable-next-line no-unused-vars
    const [inputAddres, setInputAddres] = useState("");

    const handelData = (e) => {
        let { name, value } = e.target;
        let x = { ...addressDetails, [name]: value };
        setAddressDetails(x)
    }



    const sendData = async (addressDetails) => {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post(`http://localhost:8000/address/addaddress`, addressDetails)
        // setShowaddress(false);
    }
    const onSub = (e) => {
        e.preventDefault()
        sendData(addressDetails);
        navigate('/myaddress')
        // getaddress();
    }


    return (
        <section>
            <div className="row justify-content-center mb-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col">
                        <div className="card my-4 shadow-3">
                            <div className="row g-0">
                                <div className="col-xl-6 d-xl-block bg-image">
                                    <img src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp" alt="Sample_photo"
                                        className="img-fluid" style={{ height: "500px", width: "100%", padding: '0px' }} />
                                    <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                                        <div className=" justify-content-center align-items-center h-100">
                                            <div className=" text-center" style={{ marginTop: "220px" }}>
                                                <i className="fas fa-truck text-white fa-3x"></i>
                                                <p className="text-white title-style">Lorem ipsum delivery</p>
                                                <p className="text-white mb-0"></p>

                                                <figure className="text-center mb-0">
                                                    <blockquote className="blockquote text-white">
                                                        <p className="pb-3">
                                                            <i className="fas fa-quote-left fa-xs text-primary"
                                                                style={{ color: "hsl(210, 100%, 50%) " }}></i>
                                                            <span className="lead font-italic">Everything at your doorstep.</span>
                                                            <i className="fas fa-quote-right fa-xs text-primary"
                                                                style={{ color: " hsl(210, 100%, 50%)" }}></i>
                                                        </p>
                                                    </blockquote>

                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <form onSubmit={onSub}>
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-4 text-uppercase">Delivery Info</h3>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='fname' id="form3Example1m" className="form-control" placeholder='First name' defaultValue={addressDetails.fname} onChange={handelData} />
                                                    <label className="form-label" for="form3Example1m"></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='lname' id="form3Example1n" className="form-control" placeholder='Last name' defaultValue={addressDetails.lname} onChange={handelData} />
                                                    <label className="form-label" for="form3Example1n"></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='address' id="form3Example8" className="form-control" placeholder='Address' defaultValue={addressDetails.address} onChange={handelData} />
                                                    <label className="form-label" for="form3Example8"></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='phone' id="form3Example8" className="form-control" placeholder='Mobile' defaultValue={addressDetails.phone} onChange={handelData} />
                                                    <label className="form-label" for="form3Example8"></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <select className="form-select" defaultValue={addressDetails.state} name='state' onChange={handelData} >
                                                        <option selected>State</option>
                                                        <option value="2">Option 1</option>
                                                        <option value="3">Option 2</option>
                                                        <option value="4">Option 3</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <select className="form-select" name='city' defaultValue={addressDetails.city} onChange={handelData} >
                                                        <option selected>City</option>
                                                        <option value="2">Option 1</option>
                                                        <option value="3">Option 2</option>
                                                        <option value="4">Option 3</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='zip' id="form3Example3" className="form-control" placeholder='Zip' defaultValue={addressDetails.zip} onChange={handelData} />
                                                    <label className="form-label" for="form3Example3"></label>
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='email' id="form3Example2" className="form-control" placeholder='Email' defaultValue={addressDetails.email} onChange={handelData} />
                                                    <label className="form-label" for="form3Example2"></label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="submit" className="btn btn-success btn-lg ms-2"
                                                    style={{ backgroundColor: "hsl(210, 100%, 50%) " }}>Add Address</button>
                                                <label>Already Added?</label>
                                                &nbsp;<button type="button" onClick={() => navigate('/checkout')} className="btn btn-success btn-lg ms-2"
                                                    style={{ backgroundColor: "hsl(210, 100%, 50%) " }}>Place order</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AddAddress