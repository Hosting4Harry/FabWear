import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import configData from '../environments/config.json';

const AllOrders = () => {
    const navigate = useNavigate();
    const instance = useAuth();
    const { order, setOrder, setLoading } = useContext(DataContext);
    const getData = async () => {
        setLoading(true)
        const orderRes = await instance.get(`${configData.baseUrl}/order/all`);
        // const orderRes = await instance.get(`${configData.baseUrl}/order/allOrder`);
        setOrder(orderRes.data);
        if (orderRes) {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                                <th>User Id</th>
                                <th>Total Price</th>
                                <th>Order Status</th>
                                <th>Payment Mode</th>
                                {/* <th >Product Image</th>
                                <th >OrderId</th>
                                <th >Price</th>
                                <th >Quantity</th> */}
                                <th >TrackOrder</th>
                                <th >Date/Time</th>
                            </tr>
                        </thead>
                        <tbody className='scrollbar'>
                            {
                                order.map((val, ind) => {
                                    return (
                                        <tr key={ind} className="fw-normal">
                                            <td>{ind + 1}</td>
                                            <td>{val.userid}</td>
                                            <td>{val.totalprice}</td>
                                            <td>{val.orderstatus}</td>
                                            <td>{val.paymentmode}</td>
                                            {/* <td> <img src={'/img/' + val.product_image} alt="" height='80px' width='80px' /></td>
                                            <td>{val.orderid}</td>
                                            <td>{val.productprice}</td>
                                            <td>{val.productqty}</td> */}
                                            <td><button className='btn btn-success' onClick={(e) => navigate(`/admin/trackOrder/${val.id}`)}>Track</button></td>
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
