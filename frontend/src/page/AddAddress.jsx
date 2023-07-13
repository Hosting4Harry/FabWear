import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./AddAddress.css"
import configData from '../environments/config.json'
function AddAddress() {
    const navigate = useNavigate();
    const datemail = localStorage.getItem('EcomEmail');
    const dat = localStorage.getItem('EcomUserId');
    const { id } = useParams();
    const [addressDetails, setAddressDetails] = useState({
        fname: "",
        lname: '',
        email: datemail,
        phone: '',
        address: '',
        zip: '',
        state: '',
        user_id: dat,
        city: '',
        cityData: []
    });
    const handelData = (e) => {
        let { name, value } = e.target;
        let x = { ...addressDetails, [name]: value };
        setAddressDetails(x)
    }
    const getAdd = async (val) => {
        if (val.length === 6) {
            const res = await axios.get('https://api.postalpincode.in/pincode/' + val, {
                headers: {
                }
            })
            if (res.data[0].PostOffice !== null) {
                setAddressDetails(addressDetails => ({ ...addressDetails, state: res.data[0].PostOffice[0].Circle, cityData: res.data[0].PostOffice, zip: val }))
            } else {
                alert("Enter a valid Pin")
            }
        }
    }
    const getAddressById = async (id) => {
        const res = await axios(`${configData.baseUrl}/address/addaddress/` + id);
        const data = {
            fname: res.data.name.split(' ')[0],
            lname: res.data.name.split(' ')[1],
            email: datemail,
            phone: res.data.phone,
            address: res.data.address.split(', ')[0],
            zip: res.data.address.split(', ')[3],
            state: res.data.address.split(', ')[2],
            city: res.data.address.split(', ')[1],
            user_id: dat
        }
        setAddressDetails(data);
    }
    useEffect(() => {
        getAddressById(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const sendData = async (addressDetails, id) => {
        if (id) {
            await axios.post(`${configData.baseUrl}/address/addaddress/` + id, addressDetails);
        } else {
            await axios.post(`${configData.baseUrl}/address/addaddress`, addressDetails);
        }
    }
    const onSub = (e) => {
        e.preventDefault();
        sendData(addressDetails, id);
        navigate('/myaddress');
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
                                        className="" style={{ height: "600px", width: "900px", padding: '0px' }} />
                                    <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                                        <div className=" justify-content-center align-items-center h-100">
                                            <div className=" text-center" style={{ marginTop: "220px" }}>
                                                <i className="fas fa-truck text-white fa-3x"></i>
                                                <p className="text-white title-style">Cart fast delivery</p>
                                                <p className="text-white mb-0"></p>
                                                <span className="text-center mb-0">
                                                    <blockquote className="blockquote text-white">
                                                        <p className="pb-3">
                                                            <i className="fas fa-quote-left fa-xs text-primary"
                                                                style={{ color: "hsl(210, 100%, 50%) " }}></i>
                                                            <span className="lead font-italic">Everything at your doorstep.</span>
                                                            <i className="fas fa-quote-right fa-xs text-primary"
                                                                style={{ color: " hsl(210, 100%, 50%)" }}></i>
                                                        </p>
                                                    </blockquote>
                                                </span>
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
                                                    <input type="text" name='fname' id="form3Example1m" className="form-control" placeholder='First name' defaultValue={addressDetails.fname} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example1m"></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='lname' id="form3Example1n" className="form-control" placeholder='Last name' defaultValue={addressDetails.lname} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example1n"></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='address' id="form3Example8" className="form-control" placeholder='Address' defaultValue={addressDetails.address} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example8"></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='state' id="form3Example3" className="form-control" placeholder='state' defaultValue={addressDetails.state} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example3"></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <select className="form-select" name='city' defaultValue={addressDetails.city} onChange={handelData} required>
                                                        <option value="" disabled>{addressDetails.city.length > 0 ? "--select--" : "Enter Zip Code"}</option>
                                                        {addressDetails.cityData && <>
                                                            {addressDetails.cityData.map((val, ind) => {
                                                                return <option key={ind} defaultValue={val.Name}>{val.Name}</option>
                                                            })
                                                            }
                                                        </>}
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="number" name='zip' minLength={0} maxLength="6" id="form3Example3" className="form-control" placeholder='Zip' defaultValue={addressDetails.zip} onChange={(e) => getAdd(e.target.value)} required />
                                                    <label className="form-label" htmlFor="form3Example3"></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='phone' id="form3Example8" className="form-control" placeholder='Mobile' defaultValue={addressDetails.phone} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example8"></label>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input type="text" name='email' id="form3Example2" className="form-control" placeholder='Email' defaultValue={addressDetails.email} onChange={handelData} required />
                                                    <label className="form-label" htmlFor="form3Example2"></label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="button" onClick={() => navigate(-1)} className="btn bg-secondary  ms-2">Go Back</button>
                                                <button type="submit" className="btn btn-success ms-2"
                                                    style={{ backgroundColor: "hsl(210, 100%, 50%) " }}>Add Address</button>
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