import React, { useEffect, useState } from 'react'
import CardProducts from './CardProducts'
import axios from 'axios'
import { Link } from 'react-router-dom'
const AllProducts = () => {
    const [getdata, setGetdata] = useState([])
    const getData = async () => {
        const res = await axios.get('http://localhost:8000/product/getdata')
        setGetdata(res.data)
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="products">
                <div className="container">
                    <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
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
        </>
    )
}

export default AllProducts
