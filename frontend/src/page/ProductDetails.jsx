import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './AddOn/Review';
toast.configure();

const ProductDetails = () => {
    const scrl = useRef(null);
    const { id } = useParams();
    const { cart, setCart, setLoading } = useContext(DataContext);
    const userId = localStorage.getItem("EcomUserId");
    const [detdata, setDetdata] = useState([]);
    const [pdetails, setPdetails] = useState("1");
    const [size, setSize] = useState("L");
    const [getdata, setData] = useState([]);
    const navigate = useNavigate();
    const onSub = async (e) => {
        e.preventDefault();
        const data = {
            productId: detdata.id,
            userId: userId,
            qty: pdetails,
            size: size
        }
        if (userId == null) {
            alert("please login into your account,to acces Your cart");
            navigate('/');
        } else {
            await axios.post('http://localhost:8000/cart', data)
            const exist = cart.find((x) => x.id === data.id);
            if (exist) {
                setCart(
                    cart.map((x) => x.id === data.id ? data : x)
                )
            }
            else {
                setCart([...cart, data])
            }

            // toast.success('Added to the Cart!', {
            //     position: "bottom-right",
            //     autoClose: 1800,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });
        }
    }

    const getData = async () => {
        setLoading(true);
        await axios(`http://localhost:8000/product/getdata/${id}`)
            .then(async response => {
                setLoading(false);
                setDetdata(response.data);
                await axios('http://localhost:8000/product/searchProduct/' + response.data.product_image.split('/')[3 || 2 || 1])
                    .then(response => {
                        setData(response.data);
                    }).catch(error => {
                        if (error)
                            setData([]);
                    })
            })
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    if (!detdata) {
        return <h1>Loading..</h1>
    }
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
    };

    return (
        <> <section style={{ backgroundColor: "#eee", marginBottom: "100px", marginTop: "50px" }}>
            <div className="container">
                <div className="row justify-content-center mb-3 ">
                    <div className="col-md-12 col-xl-10">
                        <div className="details">
                            <div className="container">
                                <div className="row border bg-light">
                                    <div className="col-md-6 col-12 mx-auto mb-3 mt-3">
                                        <img src={`../img/${detdata.product_image}`} alt={detdata.product_image} className="img-fluid p-im" />
                                    </div>
                                    <div className="col-md-6 col-12 mx-auto mb-3 d-flex  flex-column mt-5">
                                        <h2>{detdata.name}</h2>
                                        <h4>Price : <strong>{detdata.price}.00</strong> </h4>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab quisquam quae ex maiores possimus nihil eum assumenda asperiores! Autem maxime incidunt voluptatibus quidem quaerat corrupti ex natus sed mollitia modi.</p>
                                        <form onSubmit={onSub}>
                                            <input type="hidden" value={detdata.id} />
                                            <div className="form-group d-flex">
                                                <label htmlFor="sel1">Qty:&nbsp;</label>
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
                                                {/* {(detdata.product_image).includes("men" || "women" || "kid") ? */}
                                                <div className="form-group d-flex">
                                                    <label htmlFor="sel1">size:&nbsp;</label>
                                                    <select className="form-control" style={{ width: "min-content", height: "32px" }} id="" onChange={(e) => setSize(e.target.value)} required>
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="L">L</option>
                                                        <option value="XL">XL</option>
                                                        <option value="XXL">XXL</option>
                                                    </select>
                                                </div>
                                                {/* : null */}
                                                {/* } */}
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
            {getdata.length > 0 && <>
                <div className="container">
                    <h3>Similar Products</h3>
                </div>
                <div className="container scrollmenu owl-carousel scrolling-wrapper" ref={scrl}>
                    {
                        getdata.map((val, ind) => {
                            return (<div className='card d-inline-block' key={ind} style={{ padding: "20px", margin: '10px' }}>
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <Link to={`/details/${val.id}`} >
                                        <img src={`../img/${val.product_image}`}
                                            className="card-img-top p-img m-2 " alt={val.product_image} />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="text-dark mb-0">₹&nbsp;{val.price}.00</h5>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <h5 className="mb-0" style={{ color: 'green' }}>Assured</h5>
                                        <div className="ms-auto text-warning ">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                    <div className='prev' onClick={() => slide(-300)} ></div>
                    <div className='next' onClick={() => slide(+300)}></div>
                </div>
            </>
            }
            <div>
                <Review></Review>
            </div>

        </section>

        </>
    )
}

export default ProductDetails
