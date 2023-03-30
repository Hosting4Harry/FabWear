import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./MyAddress.css"
function MyAddress() {
    const navigate = useNavigate();
    const [yourAddress, setYourAddress] = useState([]);
    // const [inputAddres, setInputAddres] = useState("");

    const getaddress = async () => {
        const dat = localStorage.getItem('EcomUserId');
        const res = await axios.get(`http://localhost:8000/address/getaddress/${dat}`);
        debugger
        setYourAddress(res.data);
    }
    useEffect(() => {
        getaddress();
    }, [])
    return (<>
        <section>
            <div className="row justify-content-center mb-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col">
                        <div className="card my-4 shadow-3">
                            <div className="row g-0 " style={{ height: "500px" }}>
                                {/* <div className="col-xl-6 d-xl-block bg-image">
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
                                </div> */}
                                <div className="col-md-3">
                                    <div className="osahan-account-page-left shadow-sm bg-white h-100">
                                        <div className="border-bottom p-4">
                                            <div className="osahan-user text-center">
                                                <div className="osahan-user-media">
                                                    <img className="mb-3 rounded-pill shadow-sm mt-1" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="gurdeep singh osahan" />
                                                    <div className="osahan-user-media-body">
                                                        <h6 className="mb-2">Harry</h6>
                                                        <p className="mb-1">+91 70775-52981</p>
                                                        <p>something@gmail.com</p>
                                                        <p className="mb-0 text-black font-weight-bold"><Link className="text-primary mr-3" data-toggle="modal" data-target="#edit-profile-modal" to="#"><i className="icofont-ui-edit"></i> EDIT</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <ul className="nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <Link className="nav-link" id="addresses-tab" data-toggle="tab" to="#addresses" role="tab" aria-controls="addresses" aria-selected="false"><i className="icofont-location-pin"></i> Addresses</Link>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="osahan-account-page-right shadow-sm bg-white p-4 h-100">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade  active show" id="addresses" role="tabpanel" aria-labelledby="addresses-tab">
                                                <h4 className="font-weight-bold mt-0 mb-4">Manage Addresses</h4>
                                                <div className="row">
                                                    {yourAddress.length ?
                                                        yourAddress.map((val, ind) => {
                                                            return (<div key={ind} className="col-md-6">
                                                                <div className="bg-white card addresses-item mb-4 border border-primary shadow">
                                                                    <div className="gold-members p-4">
                                                                        <div className="media">
                                                                            <div className="mr-3"><i className="icofont-ui-home icofont-3x"></i></div>
                                                                            <div className="media-body">
                                                                                <h6 className="mb-1 text-secondary">Home</h6>
                                                                                <p className="text-black">{val.address}
                                                                                </p>
                                                                                <p className="mb-0 text-black font-weight-bold"><Link className="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" to="#"><i className="icofont-ui-edit"></i> EDIT</Link> <Link className="text-danger" data-toggle="modal" data-target="#delete-address-modal" to="#"><i className="icofont-ui-delete"></i> DELETE</Link></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )
                                                        })


                                                        :
                                                        <div className="col-xl-6">
                                                            <button type="button" onClick={() => navigate('/addaddress')} className="btn btn-success btn-lg ms-2"
                                                                style={{ backgroundColor: "hsl(210, 100%, 50%) " }}>Add Address</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>







    </>
    )
}

export default MyAddress