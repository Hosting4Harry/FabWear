/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
// import logo from "./logo.svg";

import axios from 'axios'
const Payment = () => {
    const navigate = useNavigate();
    const datemail = localStorage.getItem('EcomEmail');
    const [name, setName] = useState("");
    const [email, setEmail] = useState(datemail);
    const [phone, setPhone] = useState("");
    const [addr, setAddr] = useState("");
    const [yourAddress, setYourAddress] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [inputAddres, setInputAddres] = useState("");
    const [showaddress, setShowaddress] = useState(false);
    const [payment, setPayment] = useState("");
    const [UserId, setUserId] = useState("");
    const [total, setTotal] = useState(0);
    const { cart, setCart } = useContext(DataContext);
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
    const getaddress = async () => {
        const dat = localStorage.getItem('EcomUserId');
        const res = await axios.get(`http://localhost:8000/address/getaddress/${dat}`);
        setYourAddress(res.data);
    }
    const sendData = async (adddata) => {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post(`http://localhost:8000/address/addaddress`, adddata)
        setShowaddress(false);
    }
    const onSub = (e) => {
        e.preventDefault()
        const dat = localStorage.getItem('EcomUserId');
        const adddata = {
            name: name,
            email: email,
            phone: phone,
            address: addr,
            userId: dat
        }
        sendData(adddata);
        getaddress();
    }

    useEffect(() => {
        getaddress();
    }, [])

    function loadScript(src) {
        debugger
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const displayRazorpay = async (e) => {
        debugger
        e.preventDefault();
        const dat = localStorage.getItem('EcomUserId');
        const datemail = localStorage.getItem('EcomEmail');
        const datname = localStorage.getItem('EcomUser');
        localStorage.setItem('Ecompaymentmode', payment);
        const data = {
            userid: dat,
            totalprice: total < 500 ? total + 50 : total,
            orderstatus: "Pending",
            paymentmode: payment,
            paymentemail: datemail,
            name: datname,
            cart: cart
        }
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        debugger
        const result = await axios.post("http://localhost:8000/payment/orders", data);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        // Getting the order details back
        const { order, orderData } = result.data;
        const { amount, id: order_id, currency } = order;

        const options = {
            key: "rzp_test_T3tAATbEcOqopL", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Harry Corp.",
            description: "Test Transaction",
            image: "../../img/empty-cart.png",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    orderData: orderData
                };
                debugger
                const result = await axios.post("http://localhost:8000/payment/success", data);
                setCart([])
                localStorage.setItem('Ecomlongid', result.razorpayPaymentId);
                navigate(`/myaccount`);
                alert(result.data.msg);
            },
            prefill: {
                name: "Harry",
                email: "tripathy.hp202@gmail.com",
                contact: "7077552981",
            },
            notes: {
                address: "Harry Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    //---------------------

    useEffect(() => {
        const dat = localStorage.getItem('EcomUserId');
        setUserId(dat);
    }, []);
    if (!cart.length) {
        return (
            <>
                <div className="container p-5">
                    <h2>There is No cart items</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="payment">
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
                                        cart.map((val, ind) => {
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
                                                <td>{val.productqty}</td>
                                                <td>{val.price * val.productqty}.00</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="pay p-3">
                                <h2>Sub Total : {total}.00</h2>
                                <h2>Delivery Fees: {(total >= 500) ? " free" : 50.00}</h2>
                                <h2>Total Amount : {(total >= 500) ? total : (total + 50)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="address">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            {
                                showaddress && (
                                    <>
                                        <div className="card">
                                            <form onSubmit={onSub}>
                                                <div className="form-group">
                                                    <label >Name:</label>
                                                    <input type="text" className="form-control" name='name' placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label >Email:</label>
                                                    <input type="text" className="form-control" name='email' placeholder="Enter Email" readOnly value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label >Phone:</label>
                                                    <input type="tel" className="form-control" name='phone' placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label >Full Address:</label>
                                                    <textarea name="address" id="" className="form-control" rows="3" placeholder="Enter Full Address" value={addr} onChange={(e) => setAddr(e.target.value)} required></textarea>
                                                </div>
                                                <div className="text-center mb-5">
                                                    <input type="submit" className="btn btn-info pt-2 pb-2 pl-5 pr-5" value="Add Address" />
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            <div className="card">
                                <h3>Add Recived Address</h3>
                                <br />
                                {
                                    yourAddress.length ? (
                                        <>
                                            <form onSubmit={displayRazorpay}>

                                                {
                                                    yourAddress.map((val, ind) => {
                                                        return (<div key={ind}>
                                                            <button type="button" className="btn btn-info" onClick={() => navigate(`/edit_address/${UserId}`)}>Edit Address</button>
                                                            <div className="form-check ">
                                                                <label className="form-check-label p-1 mb-2">
                                                                    <input type="radio" className="form-check-input" name="gender" value={val.id} onChange={(e) => setInputAddres(e.target.value)} required />
                                                                    {val.name}<br /> {val.email} <br /> {val.phone} <br /> {val.address}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                }
                                                <h4>Choose payment option</h4>

                                                {/* <div className="form-check-inline">
                               <label className="form-check-label">
                                   <input type="radio" className="form-check-input" name="payment" value="cod" onChange={(e)=>setPayment(e.target.value)}  required/>Cod
                               </label>
                           </div> */}
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="payment" value="online" onChange={(e) => setPayment(e.target.value)} required />Online
                                                    </label>
                                                </div>
                                                <div className="text-center m-3">
                                                    <input type="submit" className="btn btn-info pt-2 pb-2 pl-5 pr-5" value="Buy Now" />
                                                </div>
                                            </form>
                                        </>
                                    ) :
                                        <button className="btn btn-info" onClick={() => setShowaddress(true)}>Add Address</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment

