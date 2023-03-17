import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import "../App.css";
import { DataContext } from '../context/DataContext';
const CardProducts = ({ id, name, price, product_image }) => {
    const navigate = useNavigate();
    const [detdata, setDetdata] = useState([]);
    const { wishlist, setWishlist } = useContext(DataContext);


    const handelfav = (e) => {
        const data = {
            id: detdata[0].id,
            name: detdata[0].name,
            price: detdata[0].price,
            image: detdata[0].product_image,
        }
        const exist = wishlist.find((x) => x.id === data.id);
        if (exist) {
            setWishlist(wishlist.map((x) => x.id === data.id ? data : x))
        } else {
            setWishlist([...wishlist, data])
        }
        toast.success('Added to the Wishlist!', {
            position: "bottom-right",
            autoClose: 1800,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const getData = async () => {
        const res = await axios.get(`http://localhost:8000/getdata/${id}`);
        setDetdata(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }
    return (
        <>
            <div className="col-lg-4 col-md-6 col-12  mb-3 products-p">
                <div className="card p-2">
                    <div>
                        <input type="checkbox" id={"heart" + id} />
                        <label for={"heart" + id} onClick={handelfav}>&#9829;</label>
                    </div>
                    <img src={`../img/${product_image}`} alt="tree" className="img-fluid p-img" />
                    <div className="overlay">
                        <div className="price">
                            <p>{name} </p>
                            <p>{price}.00</p>
                        </div>
                        <div className="text-center">
                            {/* <button className="btn btn-info ml-1 mr-1">Add To Cart</button> */}
                            <button className="btn btn-info ml-1 mr-1" onClick={() => navigate(`/details/${id}`)}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProducts
