import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function CheckOut() {
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

    const navigate = useNavigate();
    const [payment, setPayment] = useState("");
    const { cart, setCart } = useContext(DataContext);
    const [total, setTotal] = useState(0);

    const [yourAddress, setYourAddress] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [inputAddres, setInputAddres] = useState("");
    const getaddress = async () => {
        const dat = localStorage.getItem('EcomUserId');
        const res = await axios.get(`http://localhost:8000/address/getaddress/${dat}`);
        setYourAddress(res.data);
    }
    useEffect(() => {
        getaddress();
    }, [])
    useEffect(() => {
        let totamo = 0;
        for (let i = 0; i < cart.length; i++) {
            totamo += cart[i].price * cart[i].productqty;
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


    return (
        <div className="address">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 mx-auto mb-3">
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
                                                    return (<div key={ind} className="form-check ">
                                                        <input type="radio" className="form-check-input m-1" name="address" defaultValue={val.id} onChange={(e) => setInputAddres(e.target.value)} required />
                                                        <label className="form-check-label ms-1">
                                                            {val.name}<br /> {val.email} <br /> {val.phone} <br /> {val.address}
                                                        </label>

                                                    </div>
                                                    )
                                                })
                                            }
                                            <h4>Choose payment option</h4>
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