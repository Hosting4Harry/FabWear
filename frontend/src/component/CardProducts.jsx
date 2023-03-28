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
    var listForWish = []
    const repeats = (wishlist) => {
        for (let i = 0; i < wishlist.length; i++) {
            listForWish.push(wishlist[i].productId)
        }
    }
    repeats(wishlist);
    useEffect(() => {
        repeats(wishlist);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishlist])
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
            const exist = wishlist.find((x) => x.id === data.id);
            if (exist) {
                setWishlist(
                    wishlist.filter((x) => x.id !== id)
                )
                // setWishlist(wishlist.map((x) => x.id === data.id ? data : x))
                repeats(wishlist);
                await axios.delete('http://localhost:8000/wishlist/' + data.id);
            } else {
                setWishlist([...wishlist, data])
            }
            if (response.data.message) {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                // eslint-disable-next-line no-unused-vars
                const res = await axios.get('http://localhost:8000/wishlist/' + userId);
                toast.success("Added to the Wishlist", {
                    position: "bottom-right",
                    autoClose: 1500,
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
    const getData = async (id) => {
        const res = await axios.get(`http://localhost:8000/product/getdata/${id}`);
        setDetdata(res.data)
    }
    useEffect(() => {
        getData(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }
    return (
        <div className="col-md-4 col-lg-3 col-sm-6 mb-4 mb-lg-0 pb-2">
            <div className="card">
                <div className="xyz d-flex justify-content-between p-3">
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
                            className="card-img-top p-img" alt={product_image} />
                    </Link>
                    <div className='heart me-4' style={{ textAlign: "right" }}>
                        <input type="checkbox" id={"heart" + id} />
                        <label htmlFor={"heart" + id} onClick={addWish} style={{ color: listForWish.includes(id) ? 'red' : '' }}>&#9829;</label>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="small"><Link href="#!" className="text-muted">{name}</Link></p>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0" style={{ color: 'green' }}>Assured</h5>
                        <h5 className="text-dark mb-0">₹&nbsp;{price}.00</h5>
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
    )
}

export default CardProducts
