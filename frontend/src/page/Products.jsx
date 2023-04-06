import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardProducts from '../component/CardProducts'
// import { DataContext } from '../context/DataContext'
import productData from './ProductData.json'
import { Link, useNavigate } from 'react-router-dom'

const sideModal = {
    position: "fixed",
    zIndex: 9999,
    top: 0,
    right: 0,
    transform: "translate(-0%, -0%)",
    backgroundColor: "#rgb(238, 238, 238)",
    maxWidth: "20rem",
    transition: ".5s ease",
    marginTop: "80px",
    paddingTop: "120px",
    display: "block"
}

const Products = () => {
    const navigate = useNavigate();
    const [getdata, setGetdata] = useState([]);
    const [getmodaldata, setGetModaldata] = useState([]);
    const [sliceRec, setSliceRec] = useState('20');
    // const timeout = useRef(null);
    // const navigate = useNavigate();
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
    //     timeout.current = setTimeout(checkAuth, 1000)
    //     return function () {
    //         if (timeout.current) {
    //             clearTimeout(timeout.current);
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const getDatas = async () => {
        const resModal = await axios.get('http://localhost:8000/product/getdata');
        setGetModaldata(resModal.data);
        const res = await axios.get('http://localhost:8000/product/getdataall');
        if (!res.data) {
            setGetdata(productData);
        } else {
            setGetdata(res.data);
        }

    }
    useEffect(() => {
        getDatas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sortData = async (sort) => {
        const res = await axios.get(`http://localhost:8000/product/sort/${sort}`)
        setGetdata(res.data);
    }
    const sortHandel = (e) => {
        const sort = e.target.value
        if (sort === 'all') {
            getDatas();
        }
        else {
            sortData(sort);
        }
    }
    if (getdata.length === 0) {
        return <div className='products'>
            <div className="container">
                <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
                <div className="inp ">
                    <p></p>
                    <div className="form-group">
                        <select className="form-control" id="" onChange={sortHandel}>
                            {/* <option value="" selected disabled hidden>Choose By Price</option> */}
                            <option value="all">All</option>
                            <option value="200">less then 200</option>
                            <option value="200_500">200-500</option>
                            <option value="500_1000">500-1000</option>
                        </select>
                    </div>
                </div>
                <h1>No items to show😔</h1>
            </div>
        </div>

    }
    const hideModal = () => {
        document.getElementById("sidemodal").style.display = "none";
    }


    return (
        <>
            <div className="products" style={{ backgroundColor: "#eee" }}>
                <div className="container">
                    <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
                    <div className="inp ">
                        <div className="form-group">
                            <select className="form-control" id="" onChange={(e) => setSliceRec(e.target.value === "all" ? getdata.length : e.target.value)}>
                                {/* <option value="" selected disabled hidden>Choose By Price</option> */}
                                <option value="20">20 records</option>
                                <option value="30">30 records</option>
                                <option value="40">40 records</option>
                                <option value="50">50 records</option>
                                <option value="all">All records</option>
                            </select>
                        </div>
                        <p></p>
                        <div className="form-group">
                            <select className="form-control" id="" onChange={sortHandel}>
                                {/* <option value="" selected disabled hidden>Choose By Price</option> */}
                                <option value="all">All</option>
                                <option value="200">less then 200</option>
                                <option value="200_500">200-500</option>
                                <option value="500_1000">500-1000</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {
                            getdata.slice(0, sliceRec).map((val, ind) => {
                                return (<CardProducts
                                    key={ind}
                                    id={val.id}
                                    name={val.name}
                                    price={val.price}
                                    product_image={val.product_image}
                                />
                                )
                            })
                        }

                    </div>
                </div>
                <section className='bg-info'>
                    <div className="row ">
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-5">
                            <div className="card">
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <Link to='/searchproduct/adidas'>
                                        <img src="../img/adidas.png" className='card-img-top p-img p-5' alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-5">
                            <div className="card">
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <Link to='/searchproduct/puma'>
                                        <img src="../img/puma.png" className='card-img-top p-img p-5' alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-5">
                            <div className="card">
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <Link to='/searchproduct/nike'>
                                        <img src="../img/nike.png" className='card-img-top p-img p-5' alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 p-5">
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
            </div>
            <div className="" id="sidemodal" style={sideModal}>
                <div className="d-flex" style={{}}>
                    <div><h4>Desired Products</h4></div>
                    <div style={{ position: "absolute", top: 100, right: 10 }} onClick={hideModal}>
                        &#10006;
                    </div>
                </div>
                {
                    getmodaldata.slice(0, 2).map((item, ind) => {
                        return <div className='card p-5 rounded ripple-surface' key={ind}>
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                {/* <Link to={`/details/${item.id}`} > */}
                                <img src={`../img/${item.product_image}`}
                                    className="card-img-top" alt={item.product_image} style={{ height: "100px" }} onClick={() => navigate("/searchProduct/" + getdata[0].product_image.split('/')[1])} />
                                {/* </Link> */}
                            </div>
                            <pre></pre>
                        </div>
                    })
                }
            </div>


        </>
    )
}

export default Products
