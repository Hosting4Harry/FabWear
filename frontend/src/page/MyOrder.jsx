import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import configData from '../environments/config.json'
import useAuth from '../context/useAuth'

const MyOrder = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const timeout = useRef(null);
    const instance = useAuth()

    const navigate = useNavigate();
    // const checkAuth = () => {
    //     axios.get(`${configData.baseUrl}/isAuth`, {
    //         headers: {
    //             "x-access-token": localStorage.getItem("Ecomtoken")
    //         }
    //     }).then((response) => {
    //         if (!response.data.login) {
    //             navigate("/");
    //         }
    //     });
    // }

    // useEffect(() => {
    //     timeout.current = setTimeout(checkAuth, 100)
    //     return function () {
    //         if (timeout.current) {
    //             clearTimeout(timeout.current)
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const getData = async () => {
        debugger
        const { data } = await instance.get(`${configData.baseUrl}/order/myorder/${id}`);
        setData(data);
    }
    const track = (id) => {
        navigate('/trackOrder/' + id)
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <section>
                <div className="payment" style={{ overflowY: "scroll" }}>
                    <div className="container">
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Order Details</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((val, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>{ind + 1}</td>
                                                        <td className="tb-or">
                                                            <NavLink to={`/details/${val.productid}`}>
                                                                <img src={`../img/${val.product_image}`} alt={val.product_image} className="img-fluid or-img" />
                                                                <p>{val.name}</p>
                                                            </NavLink>
                                                        </td>
                                                        <td>
                                                            {val.productprice}
                                                        </td>
                                                        <td>{val.productqty}</td>
                                                        <td>
                                                            {val.price * val.productqty}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-info ml-1 mr-1" onClick={() => track(val.orderid
                                                            )}>Track Order</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyOrder
