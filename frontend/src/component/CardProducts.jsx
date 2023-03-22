import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import "../App.css";
import { DataContext } from '../context/DataContext';
import "../page/Wishlist.css"
const CardProducts = ({ id, name, price, product_image }) => {
    const navigate = useNavigate();
    const [detdata, setDetdata] = useState([]);
    const { wishlist, setWishlist } = useContext(DataContext);

    const addWish = (e) => {
        const data = {
            id: detdata[0].id,
            name: detdata[0].name,
            price: detdata[0].price,
            image: detdata[0].product_image,
            userId: localStorage.getItem("EcomUserId")
        }
        const postWish = async () => {
            const res = await axios.post('http://localhost:8000/wishlist', data)
            setWishlist(wishlist);
        }
        postWish()
        const exist = wishlist.find((x) => x.id === data.id);
        if (exist) {
            setWishlist(wishlist.map((x) => x.id === data.id ? data : x))
        } else {
            setWishlist([...wishlist, data])
        }

    }

    const handelChange = (e) => {
        const { value, checked } = e.target;
        console.log("@@@@", checked);
        if (checked) {
            toast.success('Added to the Wishlist!', {
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
            toast.warn('Removed from Wishlist!', {
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
    const getData = async () => {
        const res = await axios.get(`http://localhost:8000/product/getdata/${id}`);
        setDetdata(res.data)
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }
    return (
        <>
            <div className="col-lg-4 col-md-6 col-12  mb-3 products-p">
                <div className="card p-2">
                    <div className='heart'>
                        <input type="checkbox" id={"heart" + id} onChange={handelChange} />
                        <label htmlFor={"heart" + id} onClick={addWish}>&#9829;</label>
                    </div>
                    <img src={`../img/${product_image}`} alt="product" className="img-fluid p-img" />
                    <div className="overlay">
                        <div className="price">
                            <p>{name}</p>
                            <p>{price}.00</p>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-info ml-1 mr-1" onClick={() => navigate(`/details/${id}`)}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProducts
