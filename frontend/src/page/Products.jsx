import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CardProducts from '../component/CardProducts'
import { useNavigate } from 'react-router-dom'
import Footer from '../component/Footer'
const Products = () => {
    const [getdata, setGetdata] = useState([])
    const timeout = useRef(null)
    const navigate = useNavigate()
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
            }
        })
    }
    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDatas = async () => {
        const res = await axios.get('http://localhost:8000/product/getdataall');
        setGetdata(res.data)
    }
    useEffect(() => {
        getDatas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sortData = async (sort) => {
        const res = await axios.get(`http://localhost:8000/product/sort/${sort}`)
        setGetdata(res.data)
    }
    const sortHandel = (e) => {
        const sort = e.target.value
        if (sort === 'all') {
            getDatas()
        }
        else {
            sortData(sort)
        }
    }
    if (getdata.length === 0) {
        return <div className='products '>
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

    // if (!getdata.length) {
    //     return <h1>Loading..</h1>
    // }

    return (
        <>
            <div className="products">
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
                    <section style={{ backgroundColor: "#eee" }}>
                        <div className="container py-5">
                            <div className="row">
                                {
                                    getdata.map((val, ind) => {
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
                    </section>
                </div>
            </div>
            <div className='row bg-info pt-5 pb-4 ps-5'>
                <div className='col'>
                    <img src="../img/puma.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/adidas.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/bata.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/nike.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/asics.png" alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Products
