import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import "./CheckOut.css"
import configData from '../environments/config.json'

function CheckOut() {
    const timeout = useRef(null);
    // const loc = localStorage.getItem('NavLoc');
    const checkAuth = () => {
        axios.get(`${configData.baseUrl}/isAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
            }
        });
    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();
    const [payment, setPayment] = useState("");
    const { cart, setCart } = useContext(DataContext);
    const [total, setTotal] = useState(0);

    const [yourAddress, setYourAddress] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [inputAddress, setInputAddress] = useState({});
    const getaddress = async () => {
        const dat = localStorage.getItem('EcomUserId');
        const res = await axios.get(`${configData.baseUrl}/address/getaddress/${dat}`);
        setYourAddress(res.data);
    }
    // const { id } = useParams();
    // const buynow = async () => {
    //     if (id) {
    //         const res = await axios.get('http://localhost:8000/product/getdata/' + id)
    //         console.log(res.data);
    //         setCart(res.data)
    //     } else {
    //         setCart(cart)
    //     }
    // }
    useEffect(() => {
        getaddress();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        let totamo = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productqty == null) {
                totamo += cart[i].price * 1;
            } else {
                totamo += cart[i].price * cart[i].productqty;
            }
        }
        setTotal(totamo);
    }, [cart]);
    function loadScript(src) {
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
            cart: cart,
            address: inputAddress
        }
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // creating a new order
        const result = await axios.post(`${configData.baseUrl}/payment/orders`, data);
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
            name: "FabWare",
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
                const result = await axios.post(`${configData.baseUrl}/payment/success`, data);
                setCart([]);
                localStorage.setItem('Ecomlongid', result.razorpayPaymentId);
                navigate(`/myaccount`);
                alert(result.data.msg);
            },
            prefill: {
                name: "FabWear",
                email: "fabwear@gmail.com",
                contact: "7077552981",
            },
            notes: {
                address: "Fabwear",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="address">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 mx-auto mb-3">
                        <div className="row justify-content-center align-items-center containers">
                            <div className="col-md-6 col-sm-12 col-lg-6 cards text-center">
                                <div className="image"><img src="https://i.imgur.com/DC94rZe.png" width="150" alt="" /></div>
                                <div className="image2"><img src="https://i.imgur.com/DC94rZe.png" width="150" alt="" /></div>
                                <h1>50% OFF</h1><span className="d-block">On Everything</span><span className="d-block">Today</span>
                                <div className="mt-4"><small>With Code : bbbootstrap2020</small></div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-lg-6 cards text-center">

                                <div className="image"><img src="https://i.imgur.com/DC94rZe.png" width="150" alt="" /></div>
                                <div className="image2"><img src="https://i.imgur.com/DC94rZe.png" width="150" alt="" /></div>
                                <h1>60% OFF</h1><span className="d-block">On Selected Items</span><span className="d-block">Today</span>
                                <div className="mt-4"><small>With Code : newToCart2023</small></div>
                            </div>
                            <div className=" row col-md-6 col-sm-12 col-lg-6 cards text-center container">
                                {/* <div className="row d-flex justify-content-center"> */}
                                {/* <div className="col-md-6 col-lg-6 col-sm-12"> */}
                                <div className="cards">
                                    <div className="text-right p-2"> <img src="https://i.imgur.com/w68MQc4.png" width="120" alt="" /> </div>
                                    <div className="text-center"> <small className="text-uppercase flat">Flat</small> </div>
                                    <div className="d-flex justify-content-center px-2">
                                        <div className="d-flex flex-row">
                                            <h1 className="mt-0 off">60% OFF</h1> <sup className="mt-2 text-primary star">*</sup>
                                        </div>
                                    </div>
                                    <div className="line">
                                        <hr />
                                    </div>
                                    <div className="text-center mb-5"> <span className="text-uppercase">Valid till 23 august</span> </div>
                                    <div className="text-right p-1"> <small>*T&C APPLY</small> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mx-auto mb-3">
                        <div className="card">
                            <h3>Add Recived Address</h3>
                            <br />
                            {
                                yourAddress.length ? (
                                    <>
                                        <form onSubmit={displayRazorpay}>
                                            <div>
                                                <button className="btn font-weight-bold mt-0 mb-4" onClick={() => navigate('/myaddress')}>Manage Addresses</button>
                                                {
                                                    yourAddress.map((val, ind) => {
                                                        return (<div key={ind} className="col-md-12 col-sm-12 col-lg-12">
                                                            <div className="bg-white card addresses-item mb-4 border border-primary shadow">
                                                                <div className="gold-members">
                                                                    <div className="form-check-inline">
                                                                        <label className="form-check-label">
                                                                            <input type="radio" className="form-check-input" name="address" value={inputAddress} onChange={(e) => setInputAddress(val)} required />
                                                                        </label>
                                                                    </div>
                                                                    <div className="media">
                                                                        <div className="mr-3"><i className="icofont-ui-home icofont-3x"></i></div>
                                                                        <div className="media-body">
                                                                            <h6 className="mb-1 text-secondary">Home</h6>
                                                                            <p className="text-black">{val.address}
                                                                            </p>
                                                                            <p className="mb-0 text-black font-weight-bold">
                                                                                <Link className="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" to={"/addaddress/" + val.id}> EDIT</Link>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div><h4>Choose payment option</h4>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="payment" value="online" onChange={(e) => setPayment(e.target.value)} required />Online
                                                    </label>
                                                </div></div>
                                            <div className="text-center m-3">
                                                <input type="submit" className="btn btn-info pt-2 pb-2 pl-5 pr-5" value="Buy Now" />
                                            </div>
                                        </form>
                                    </>
                                ) :
                                    <button className="btn btn-info" onClick={() => navigate('/addaddress')}>Add Address</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckOut