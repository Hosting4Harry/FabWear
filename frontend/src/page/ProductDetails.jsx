import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const ProductDetails = () => {
    const { id } = useParams();
    const { cart, setCart } = useContext(DataContext);
    const userId = localStorage.getItem("EcomUserId");
    const [detdata, setDetdata] = useState([]);
    const [pdetails, setPdetails] = useState("1");
    const [size, setSize] = useState("");
    // const timeout = useRef(null);
    const navigate = useNavigate();
    // const checkAuth = () => {
    //     axios.get("http://localhost:8000/isAuth", {
    //         headers: {
    //             "x-access-token": localStorage.getItem("Ecomtoken")
    //         }
    //     }).then((response) => {
    //         if (!response.data.login) {
    //             navigate("/");
    //         }
    //     })
    // }
    // useEffect(() => {
    //     timeout.current = setTimeout(checkAuth, 100)
    //     return function () {
    //         if (timeout.current) {
    //             clearTimeout(timeout.current)
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const onSub = (e) => {
        e.preventDefault();
        const data = {

            id: detdata[0].id,
            userId: userId,
            // name: detdata[0].name,
            // price: detdata[0].price,
            // image: detdata[0].product_image,
            qty: pdetails
        }
        if (userId == null) {
            alert("please login into your account,to acces Your cart");
            navigate('/');
        } else {
            axios.post('http://localhost:8000/cart', data)
            const exist = cart.find((x) => x.id === data.id);
            if (exist) {
                setCart(
                    cart.map((x) => x.id === data.id ? data : x)
                )
            }
            else {
                setCart([...cart, data])
            }

            toast.success('Added to the Cart!', {
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
    }

    const getData = async () => {
        const res = await axios.get(`http://localhost:8000/product/getdata/${id}`);
        setDetdata(res.data)
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }
    return (
        <> <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12 col-xl-10">
                        <div className="details">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 col-12 mx-auto mb-3">
                                        <img src={`../img/${detdata[0].product_image}`} alt={detdata[0].product_image} className="img-fluid p-im" />
                                    </div>
                                    <div className="col-md-6 col-12 mx-auto mb-3 d-flex  flex-column mt-5">
                                        <h2>{detdata[0].name}</h2>
                                        <h4>Price : <strong>{detdata[0].price}.00</strong> </h4>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab quisquam quae ex maiores possimus nihil eum assumenda asperiores! Autem maxime incidunt voluptatibus quidem quaerat corrupti ex natus sed mollitia modi.</p>
                                        <form onSubmit={onSub}>
                                            <input type="hidden" value={detdata[0].id} />
                                            <div className="form-group d-flex">
                                                <label htmlFor="sel1">Choose Qty:&nbsp;</label>
                                                <select className="form-control" style={{ width: "10%", height: "32px" }} id="" onChange={(e) => setPdetails(e.target.value)} required>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>&nbsp;
                                                {/* {if(detdata[0].name)} */}
                                                <label htmlFor="sel1">size:&nbsp;</label>
                                                <select className="form-control" style={{ width: "14%", height: "32px" }} id="" onChange={(e) => setSize(e.target.value)} required>
                                                    <option value="S">SM</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select>
                                            </div>
                                            <div className="text-left">
                                                <button type="submit" className="btn btn-info">Add To Cart</button>&nbsp;
                                                <button type="button" className="btn btn-info" onClick={() => navigate('/cart')}>Go To Cart</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductDetails
