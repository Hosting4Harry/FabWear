import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import AllProducts from '../component/AllProducts'
import axios from 'axios'
import Slides from './Slides'
import { DataContext } from '../context/DataContext'


const Home = () => {
    // const timeout = useRef(null);
    const { setWishlist } = useContext(DataContext);
    // const navigate = useNavigate()
    // const checkAuth = () => {
    //     axios.get("http://localhost:8000/isAuth", {
    //         headers: {
    //             "x-access-token": localStorage.getItem("Ecomtoken")
    //         }
    //     }).then((response) => {
    //         //  console.log()
    //         if (!response.data.login) {
    //             // window.location.reload()
    //             navigate("/");
    //         }
    //     })
    // }
    const getData = async () => {
        const userId = localStorage.getItem("EcomUserId");
        const res = await axios.get('http://localhost:8000/wishlist/' + userId);
        setWishlist(res.data);
    }
    useEffect(() => {
        getData();
        // timeout.current = setTimeout(checkAuth, 1000)
        // return function () {
        //     if (timeout.current) {
        //         clearTimeout(timeout.current)
        //     }
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //  setInterval(checkAuth, 1000);
    // useEffect(() => {
    //     const datafet = async () => {
    //         const res = await axios.get(`https://open.mapquestapi.com/geocoding/v1/address?key=ccxeu5eQ2pEdTe7UvyQNbbE9XXdeLKdi&street=Hanschara%20M%20D%20High%20School&city=chandipur&state=wb&postalCode=721625`)
    //         console.log(res)
    //     }
    //     datafet()

    // }, [])


    return (
        <>
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3 mx-auto">
                            <h1>Welcome to <span>Cart.Com</span> </h1>
                            <p>It's a  Big Market out there, Let's Explore with Us.
                                We always make our costomer happy by providing as many choices as possible. Get Your FREE Shopping Website ,We turn all brands like Yours, </p><p>Happy Shopping!</p>
                            <button className="btn btn-outline-success">Read More</button>
                        </div>
                        <div className="col-md-6 col-12 mb-3 mx-auto">
                            <Slides />
                        </div>
                    </div>
                </div>
            </div>
            <AllProducts />
            <div className="desc h-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
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
        </>
    )
}

export default Home
