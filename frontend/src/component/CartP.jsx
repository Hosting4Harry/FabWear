import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext'
const CartP = ({ id, name, price, product_image, qty }) => {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(DataContext);
    const deleteProduct = (id) => {
        const exist = cart.find((x) => x.id === id)
        if (exist) {
            setCart(
                cart.filter((x) => x.id !== id)
            )
        }
    }
    return (
        <div class="card shadow-0 border rounded-3 mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src={`../img/${product_image}`} alt=''
                                class="w-100" />
                            <a href="#!">
                                <div class="hover-overlay">
                                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-6">
                        <h5>Quant trident shirts {name}</h5>
                        <div class="d-flex flex-row">
                            <div class="text-danger mb-1 me-2">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <span>310</span>
                        </div>
                        <div class="mt-1 mb-0 text-muted small">
                            <span>100% cotton</span>
                            <span class="text-primary"> • </span>
                            <span>Light weight</span>
                            <span class="text-primary"> • </span>
                            <span>Best finish<br /></span>
                        </div>
                        <div class="mb-2 text-muted small">
                            <span>Unique design</span>
                            <span class="text-primary"> • </span>
                            <span>For men</span>
                            <span class="text-primary"> • </span>
                            <span>Casual<br /></span>
                        </div>
                        <p class="text-truncate mb-4 mb-md-0">
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration in some form, by injected humour, or
                            randomised words which don't look even slightly believable.
                        </p>
                    </div>
                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div class="d-flex flex-row align-items-center mb-1">
                            <h4 class="mb-1 me-1">Price: {price}</h4>
                            <span class="text-danger"><s>599</s></span>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-1">
                            <h4 class="mb-1 me-1">Qty: {qty}</h4>
                        </div>
                        {price * qty > 500 && <h6 class="text-success">Free shipping</h6>}
                        {price * qty < 500 && <h6 class="text-success">Rs: 50 shipping charges</h6>}
                        <div class="d-flex flex-column mt-4">
                            <button class="btn btn-primary btn-sm" type="button" onClick={() => navigate(`/details/${id}`)}>Details</button>
                            {/* <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                        Add to wishlist
                    </button> */}
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
