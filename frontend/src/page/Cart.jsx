import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CartP from '../component/CartP'
import { DataContext } from '../context/DataContext'
import configData from '../environments/config.json'
import useAuth from '../context/useAuth'

// import NewProducts from './NewProducts'
const Cart = () => {
    const { cart, setCart, setLoading } = useContext(DataContext);
    const timeout = useRef(null);
    const instance = useAuth()
    const navigate = useNavigate();
    const id = localStorage.getItem("EcomUserId");

    const cartItems = (id) => {
        instance.get(`${configData.baseUrl}/cart/` + id)
            .then((response) => {
                if (response.data.login) {
                    setCart(response.data);
                } else {
                    navigate('/')
                }
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        cartItems(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    var cartCss;
    if (!cart.length) {
        cartCss = { backgroundColor: "#eee", height: "100vh" }
    } else {
        cartCss = { backgroundColor: "#eee" }
    }
    return (
        <>
            <section style={cartCss}>
                <div className="container py-5">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-12 col-xl-10">
                            <div className="cart">
                                {
                                    !cart.length ? (
                                        <div className="container" style={{ textAlign: 'center' }}>
                                            <div>
                                                <h2>Hey, it feels so light!!!</h2>
                                                <h2>There Is No Items In Your Cart</h2>
                                                <img src="../img/empty-cart2.png" alt="emptybag" />
                                                <p>There is nothing in your bag,Let's add some items</p>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                                            </div>
                                        </div>
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
                                                                productId={val.productId}
                                                                name={val.name}
                                                                price={val.price}
                                                                product_image={val.product_image}
                                                                qty={val.productqty}
                                                                size={val.size}
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
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Cart;
