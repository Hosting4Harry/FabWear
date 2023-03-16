import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CartP from '../component/CartP'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
const Cart = () => {

    const { cart } = useContext(DataContext);
    const timeout = useRef(null);
    const navigate = useNavigate();
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (!response.data.login) {
                navigate("/");
            }
        })

    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 100)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="cart">
                {
                    !cart.length ? (
                        <>
                            <div className="container">
                                <h2>There is No Items In the Cart</h2>
                                <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="container">
                                <h2>Your Cart Items</h2>
                                <br />
                                <div className="row">
                                    {
                                        cart.map((val, ind) => {
                                            return (<CartP
                                                key={ind}
                                                id={val.id}
                                                name={val.name}
                                                price={val.price}
                                                plant_image={val.image}
                                                qty={val.qty}
                                            />
                                            )
                                        })
                                    }
                                </div>
                                <div className="row m-5">
                                    <div className="col-12">
                                        <div className="text-right">
                                            <button className="btn btn-info" onClick={() => navigate("/payment")}>Check Out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Cart;
