import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import AllProducts from '../component/AllProducts'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import "./Home.css"
import Category from './Category'

const Home = () => {
    const ref = useRef(null);
    const [modal, setModal] = useState(false);
    const [getdata, setGetdata] = useState([]);
    const navigate = useNavigate();
    window.onload = async () => {
        const res = await axios.get('http://localhost:8000/product/getdata');
        if (res.data.length === 0) return;
        setGetdata(res.data.slice(0, 1))
        document.getElementById("root").style.overflowY = "hidden"
        setModal(true);
    }
    const hideModal = () => {
        setModal(false);
    }
    const scroll = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const { setWishlist } = useContext(DataContext);
    const getData = async () => {
        const userId = localStorage.getItem("EcomUserId");
        const res = await axios.get('http://localhost:8000/wishlist/' + userId);
        setWishlist(res.data);
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <> <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-wrap='true' data-bs-pause="false" >
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000" style={{ overflowY: "hidden" }} >
                    <img src="../img/Slides/slide-03.jpg.webp" className="d-block w-100" alt="..." />
                    <div className='tag'>
                        <h1  >Men Collection {new Date().getFullYear()}</h1>
                        <div className='typewriter'>
                            <h1>Trending for men...</h1>
                        </div>
                        <pre></pre>
                        <button className="btn btn-outline-success ms-5" onClick={() => navigate('/searchProduct/men')}>Shop Now</button>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="3000" style={{ overflowY: "hidden" }}>
                    <img src="../img/Slides/slide-01.jpg.webp" className="d-block w-100" alt="..." />
                    <div className='tag'>
                        <h1  >Women Collection {new Date().getFullYear()}</h1>
                        <div className='typewriter'>
                            <h1>CheckOut what you want</h1>
                        </div>
                        <pre></pre>
                        <button className="btn btn-outline-success ms-5" onClick={() => navigate('/searchProduct/women')}>Shop Now</button>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="3000" style={{ overflowY: "hidden" }} >
                    <img src="../img/Slides/slide-02.jpg.webp" className="d-block w-100" alt="..." />
                    <div className='tag'>
                        <h1  >Trending Series  {new Date().getFullYear()}</h1>
                        <div className='typewriter'>
                            <h1>Deals that you never seen</h1>
                        </div>
                        <pre></pre>
                        <button className="btn btn-outline-success ms-5" onClick={scroll}>Shop Now</button>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="fa fa-chevron-circle-left" aria-hidden="true" ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="fa fa-chevron-circle-right" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
            <div className='row justify-content-center ' style={{ backgroundColor: "#eee" }}>
                <Category></Category>
            </div>
            <div ref={ref}>
                <AllProducts />
            </div>
            <div className="desc h-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className=" typewriter col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
                            <h1>Welcome to <span>Cart.Com</span> </h1>
                            <h3>It's a  Big Market out there, Let's Explore with Us</h3>
                            <p>   Just take a quick peek & learn about the Amazing Stories of our Valued Clients. Nothing makes us happier than their Beautiful & Successful Journey with Us!</p>
                            <button className="btn btn-outline-success">Read More</button>
                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3 ">
                            <img src="../img/T5.png" alt="ok" className="img-fluid side-img" />
                        </div>
                    </div>
                </div>
            </div>
            <section className='bg-info brand h-100'>
                <div className="row ">
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-4">
                        <div className="card">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <Link to='/searchproduct/adidas'>
                                    <img src="../img/adidas.png" className='card-img-top p-img p-5' alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-4">
                        <div className="card">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <Link to='/searchproduct/puma'>
                                    <img src="../img/puma.png" className='card-img-top p-img p-5' alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-4">
                        <div className="card">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <Link to='/searchproduct/nike'>
                                    <img src="../img/nike.png" className='card-img-top p-img p-5' alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-4">
                        <div className="card">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <Link to='/searchproduct/bata'>
                                    <img src="../img/bata.png" className='card-img-top p-img p-5' alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {modal && <>
                <div className="wrapper" onClick={hideModal}>

                </div>
                <div className="modal rounded" >
                    <div className='card p-5 rounded ripple-surface' style={{ backgroundColor: "transparent", border: "none" }}>
                        <div className='rounded-circle ps-1' style={{ position: "fixed", top: 86, right: 60, zIndex: 99999, backgroundColor: "#fff", width: '20px' }} onClick={hideModal}>
                            &#30006;
                        </div>
                        <div className=''>
                            <h4> {getdata[0].name}</h4>
                        </div>
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <Link to={`/details/${getdata[0].id}`} >
                                <img src={`../img/${getdata[0].product_image}`}
                                    className="card-img-top" alt={getdata[0].product_image} style={{ width: "100%", height: "200px" }} />
                            </Link>
                        </div>
                        <pre></pre>
                        <div className=''>
                            <button className='btn btn-primary' onClick={() => navigate("/searchProduct/" + getdata[0].product_image.split('/')[1])}>check out</button>
                        </div>
                    </div>
                </div>

            </>

            }




        </>
    )
}

export default Home
