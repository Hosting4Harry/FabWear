import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext'
const CartP = ({ id, name, price, product_image, qty }) => {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(DataContext);
    const [quantity, setQuantity] = useState("1");

    const deleteProduct = (id) => {
        axios.delete('http://localhost:8000/cart/' + id);
        const exist = cart.find((x) => x.id === id)
        if (exist) {
            setCart(
                cart.filter((x) => x.id !== id)
            )
        }
    }
    return (
        <div className="card shadow-0 border rounded-3 mb-3 " >
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src={`../img/${product_image}`} alt=''
                                className="w-100" />
                            <Link role='button' onClick={() => navigate(`/details/${id}`)}>
                                <div className="hover-overlay">
                                    <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>Quant trident shirts {name}</h5>
                        <div className="d-flex flex-row">
                            <div className="text-danger mb-1 me-2">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <span>310</span>
                        </div>
                        <div className="mt-1 mb-0 text-muted small">
                            <span>100% cotton</span>
                            <span className="text-primary"> • </span>
                            <span>Light weight</span>
                            <span className="text-primary"> • </span>
                            <span>Best finish<br /></span>
                        </div>
                        <div className="mb-2 text-muted small">
                            <span>Unique design</span>
                            <span className="text-primary"> • </span>
                            <span>For men</span>
                            <span className="text-primary"> • </span>
                            <span>Casual<br /></span>
                        </div>
                        <p className="text-truncate mb-4 mb-md-0">
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration in some form, by injected humour, or
                            randomised words which don't look even slightly believable.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">Price: {price}.00</h4>
                            <span className="text-danger" style={{ textDecoration: "line-through" }}><s>
                                {price > 500 ? price + 1000 : price + 500}.00</s></span>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">Qty: {qty}</h4>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">Total Price: {price * quantity}</h4>
                        </div>
                        {price * quantity > 500 && <h6 className="text-success">Free shipping</h6>}
                        {price * quantity < 500 && <h6 className="text-success">Rs: 50 shipping charges</h6>}
                        <div className="d-flex flex-column mt-4">
                            <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate(`/details/${id}`)}>Details</button>
                            <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => deleteProduct(id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <>
        //     <div className="col-lg-4 col-md-6 col-12  mb-3">
        //         <div className="card">
        //             <img src={`../img/${product_image}`} alt={product_image} className="img-fluid cart-img" />
        //             <div className="p-3">
        //                 <div className="cartbox">
        //                     <div>
        //                         <p>{name}</p>
        //                         <p>({price}.00) * ({qty})</p>
        //                     </div>
        //                     <div>
        //                         <br />
        //                         <p> {price * qty}.00</p>
        //                     </div>
        //                 </div>
        //                 <div className="text-right">
        //                     <button className="btn-lg btn-info" onClick={() => deleteProduct(id)}>Delete</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default CartP
