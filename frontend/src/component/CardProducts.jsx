import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import "../App.css";
import { DataContext } from '../context/DataContext';
import "../page/Wishlist.css"

const CardProducts = ({ id, name, price, product_image }) => {
    const [detdata, setDetdata] = useState([]);
    const { wishlist, setWishlist } = useContext(DataContext);
    const userId = localStorage.getItem("EcomUserId");
    const addWish = (e) => {
        const data = {
            id: detdata[0].id,
            name: detdata[0].name,
            price: detdata[0].price,
            image: detdata[0].product_image,
            userId: userId
        }
        const postWish = async (data) => {
            const response = await axios.post('http://localhost:8000/wishlist', data);
            debugger
            const exist = wishlist.find((x) => x.id === data.id);
            if (exist) {
                setWishlist(wishlist.map((x) => x.id === data.id ? data : x))
            } else {
                setWishlist([...wishlist, data])
            }
            if (response.data.message) {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                const res = await axios.get('http://localhost:8000/wishlist/' + userId);
                debugger
                localStorage.setItem("WishList", JSON.stringify(res.data));
                toast.success("Added to the Wishlist", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        postWish(data);



    }
    const getData = async () => {
        const res = await axios.get(`http://localhost:8000/product/getdata/${id}`);
        setDetdata(res.data)
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }
    return (
        <div className="col-md-12 col-lg-4 mb-4 mb-lg-0 pb-2">
            <div className="card">
                <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0">Today's Combo Offer</p>
                    <div
                        className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                        style={{ width: '35px', height: "35px" }}>
                        <p className="text-white mb-0 small">x4</p>
                    </div>
                </div>
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <Link to={`/details/${id}`} >
                        <img src={`../img/${product_image}`}
                            className="card-img-top p-img" alt="Laptop" />
                    </Link>
                    <div className='heart me-4' style={{ textAlign: "right" }}>
                        <input type="checkbox" id={"heart" + id} />
                        <label htmlFor={"heart" + id} onClick={addWish}>&#9829;</label>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="small"><a href="#!" className="text-muted">{name}</a></p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">Shirts</h5>
                        <h5 className="text-dark mb-0">₹&nbsp;{price}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
                        <div className="ms-auto text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                    </div>
                </div>

            </div>

        </div >



        // <>
        //     <div className="col-lg-4 col-md-6 col-12  mb-3 products-p">
        //         <div className="card p-2">
        //             <div className='heart'>
        //                 <input type="checkbox" id={"heart" + id} />
        //                 <label htmlFor={"heart" + id} onClick={addWish}>&#9829;</label>
        //             </div>
        //             <img src={`../img/${product_image}`} alt="product" className="img-fluid p-img" />
        //             <div className="overlay">
        //                 <div className="price">
        //                     <p>{name}</p>
        //                     <p>{price}.00</p>
        //                 </div>
        //                 <div className="text-center">
        //                     <button className="btn btn-info ml-1 mr-1" onClick={() => navigate(`/details/${id}`)}>View Details</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default CardProducts
