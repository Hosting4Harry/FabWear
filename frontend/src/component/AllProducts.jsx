import React, { useEffect, useState } from 'react'
import CardProducts from './CardProducts'
import axios from 'axios'
const AllProducts = () => {
    const [getdata, setGetdata] = useState([])
    const getData = async () => {
        const res = await axios.get('http://localhost:8000/getdata')
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
            <div className='row bg-info pt-5 pb-4 ps-5'>
                <div className='col'>
                    <img src="../img/adidas.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/puma.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/asics.png" alt="" />
                </div>
                <div className='col'>
                    <img src="../img/nike.png" alt="" />

                </div>
                <div className='col'>
                    <img src="../img/bata.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default AllProducts
