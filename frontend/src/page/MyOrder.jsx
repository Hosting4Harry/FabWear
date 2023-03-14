import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

const MyOrder = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const timeout = useRef(null)
    const navigate = useNavigate()
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (!response.data.login) {
                navigate.push("/");
            }
        })
    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 100)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getData = async () => {

        const { data } = await axios.get(`http://localhost:8000/myorder/${id}`)
        setData(data)
        debugger
    }
    console.log(data)
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="payment">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((val, ind) => {
                                            return (
                                                <>
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
                                                    </tr>

                                                </>
                                            )
                                        })
                                    }







                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default MyOrder
