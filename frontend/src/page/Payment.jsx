/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
// import logo from "./logo.svg";

import axios from 'axios'
const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const datemail = localStorage.getItem('EcomEmail');
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState(datemail);
    // const [phone, setPhone] = useState("");
    // const [addr, setAddr] = useState("");
    // const [yourAddress, setYourAddress] = useState([]);
    // eslint-disable-next-line no-unused-vars
    // const [inputAddres, setInputAddres] = useState("");
    // const [showaddress, setShowaddress] = useState(false);
    // const [UserId, setUserId] = useState("");
    const [total, setTotal] = useState(0);
    const { cart, setCart, wishlist } = useContext(DataContext);
    var tot = 0;
    const timeout = useRef(null);

    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
            }
        })
    }
    useEffect(() => {
        localStorage.setItem('NavLoc', location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let totamo = 0;
        for (let i = 0; i < cart.length; i++) {
            totamo += cart[i].price * cart[i].productqty;
        }
        setTotal(totamo);
    }, [cart]);
    //---------------------

    // useEffect(() => {
    //     const dat = localStorage.getItem('EcomUserId');
    //     setUserId(dat);
    // }, []);
    // if (!cart.length) {
    //     return (
    //         <>
    //             <div className="container p-5">
    //                 <h2>There is No cart items</h2>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="payment" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((val, ind) => {
                                            tot = tot + val.price * val.qty
                                            return (<tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td className="tab-box">

                                                    <NavLink to={`/details/${val.id}`}>

                                                        <img src={`../img/${val.product_image}`} alt={`../img/${val.product_image}`} className="img-fluid t-img" />
                                                        <p >{val.name}</p>
                                                    </NavLink>
                                                </td>
                                                <td>{val.price}.00</td>
                                                <td>{val.productqty || 1}</td>
                                                <td>{val.price * val.productqty}.00</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="pay p-2">
                                <h2>Sub Total : {total}.00</h2>
                                <h2>Delivery Fees: {(total >= 500) ? " free" : 50.00}</h2>
                                <h2>Total Amount : {(total >= 500) ? total : (total + 50)}</h2>
                            </div>
                            <button className="btn btn-info" onClick={() => navigate('/checkout')}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Payment

