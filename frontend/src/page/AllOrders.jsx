import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllOrders = () => {
    const [getOrders, setOrders] = useState([]);
    const getData = () => {
        axios.get('http://localhost:8000/order/allOrder')
            .then((result) => {
                setOrders(result.data);
            });
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div className="card">
                <div className="card-header row d-flex p-3">
                    <div className='d-flex col-6'>
                        <i className="fas fa-tasks me-2"></i> <h5>Order List</h5>
                    </div>
                    <div className="d-flex col-6 justify-content-end align-items-center  " style={{ position: 'absolute', right: "0px" }}>
                    </div>
                </div>
                <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "50rem" }}>
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th >Product Image</th>
                                <th >OrderId</th>
                                <th >Price</th>
                                <th >Quantity</th>
                                <th >Date/Time</th>
                            </tr>
                        </thead>
                        <tbody className='scrollbar'>
                            {
                                getOrders.map((val, ind) => {
                                    return (
                                        <tr key={ind} className="fw-normal">
                                            <td>{ind + 1}</td>
                                            <td> <img src={'/img/' + val.product_image} alt="" height='80px' width='80px' /></td>
                                            <td>{val.orderid}</td>
                                            <td>{val.productprice}</td>
                                            <td>{val.productqty}</td>
                                            <td>{val.updatedAt.replace('T', '/').split('.')[0]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllOrders
