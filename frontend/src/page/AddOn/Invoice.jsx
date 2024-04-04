// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import configData from '../.././environments/config.json'
import useAuth from '../../context/useAuth';

const Invoice = () => {
    const instance = useAuth();
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const getData = async () => {
        await instance.get(`${configData.baseUrl}/order/myorder/` + id)
            .then((res) => {
                setProducts(res.data)

            });

    }
    const in_No = Math.floor(Math.random(100000, 999999) * 1000000);
    const date = new Date().toLocaleString('en-IN', { timeZone: 'IST' });


    // this is the process to download the pdf
    const download = async () => {
        var printContents = document.getElementById('print').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])
    return (
        <div id='print'>
            <div className="card">
                <div className="card-body">
                    <div className="container mb-5 mt-3">
                        <div className="row d-flex align-items-baseline">
                            <div className="col-xl-9">
                                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>Invoice  <strong>ID: #{in_No}</strong></p>
                            </div>
                            <div className="col-xl-3 float-end">
                                <Link className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark" onClick={download}>
                                    <i className="fas fa-print text-primary" ></i> Print</Link>
                            </div>
                            <hr />
                        </div>

                        <div className="container">
                            <div className="col-md-12">
                                <div className="text-center" style={{ "overflowY": "hidden" }} >
                                    <i className=" fa-4x ms-0" style={{ color: "#5d9fc5 ", "fontFamily": 'Gistesy' }} >Fab Wear</i> &nbsp;<sub style={{ color: "#5d9fc5 ", "fontSize": '2rem' }} >.com</sub>
                                    {/* <p className="pt-0"><i>.com</i></p> */}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <ul className="list-unstyled">
                                        <li className="text-muted">To: <span style={{ color: "#5d9fc5" }}>{localStorage.getItem('EcomUser')}</span></li>
                                        <li className="text-muted">Street, City</li>
                                        <li className="text-muted">State, India</li>
                                        <li className="text-muted"><i className="fas fa-phone"></i> +91 6370017676</li>
                                    </ul>
                                </div>
                                <div className="col-xl-4">
                                    <p className="text-muted">Invoice</p>
                                    <ul className="list-unstyled">
                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#84B0CA " }}></i> <span
                                            className="fw-bold">ID:</span>#{in_No}</li>
                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#84B0CA " }}></i> <span
                                            className="fw-bold">Creation Date: </span>{date}</li>
                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#84B0CA " }}></i> <span
                                            className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                                                Paid</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="row my-2 mx-1 justify-content-center">
                                <table className="table table-striped table-borderless">
                                    <thead style={{ backgroundColor: "#84B0CA " }} className="text-black">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((val, ind) => {
                                                return (<tr key={ind}>
                                                    <td>{ind + 1}</td>
                                                    <td><img src={`../img/${val.product_image}`} height="60px" width="50px" alt={(val.name)} /></td>
                                                    <td>{(val.name)}</td>
                                                    <td>{val.productqty}</td>
                                                    <td>{val.productprice * val.productqty}</td>
                                                    <td>{new Date(val.createdAt).toLocaleString('en-IN', { timeZone: 'IST' })}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <p className="ms-3"></p>

                                </div>
                                <div className="col-xl-3">
                                    <p className="text-black float-start"><span className="text-black me-3" style={{ fontSize: "20px" }}> Total Amount</span><span style={{ fontSize: "25px" }}>
                                        {/*  {
                                        products.forEach(val => {
                                            sum += (val.productprice)
                                            if (sum <= 500) {
                                                sum = sum + 50
                                            }
                                        })} ₹ &nbsp;{sum} */}
                                        ₹{products[0]?.totalprice}</span></p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-xl-10">
                                    <p>Thank you for your purchase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Invoice
