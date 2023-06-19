import React, { useEffect, useState, useRef, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import { GrView, GrDownload } from "react-icons/gr";
import configData from '../environments/config.json'

const MyAccount = () => {
    const { setLoading, roleId } = useContext(DataContext);
    const [order, setOrder] = useState([]);
    const location = useLocation();
    const [modal, setModal] = useState(false);
    localStorage.setItem('NavLoc', location.pathname);
    const userdatast = localStorage.getItem('EcomUser');
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const timeout = useRef(null);
    const navigate = useNavigate();
    const checkAuth = () => {
        axios.get(`${configData.baseUrl}/isAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 10)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOrderDetails = async (id) => {
        setModal(true);
        setLoading(true);
        if (!id) return;
        await axios.get(`${configData.baseUrl}/order/account/${id}`)
            .then(response => {
                setLoading(false);
                setOrder(response.data);
            })
        setLoading(false);
    }
    const getPendingOrderDetails = async (id) => {
        setModal(true);
        setLoading(true);
        if (!id) {
            setLoading(false);
            return;
        }
        await axios.get(`${configData.baseUrl}/order/pendingOrder/${id}`)
            .then(response => {
                setLoading(false);
                setOrder(response.data);
            }).catch(error => {
                setLoading(false);
            });
    }
    const dat = +localStorage.getItem('EcomUserId');
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (roleId === 1 || roleId === 2) {
        return <div className="payment" style={{ marginBottom: "400px" }}>
            <div className="container">
                <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                <button className="btn btn-warning ml-1 mr-1" onClick={logout}>LogOut</button>
            </div>
        </div>
    }
    else return (
        <>
            <div className="payment" style={{ marginBottom: "200px" }}>
                <div className="container">
                    <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                    <button className="btn btn-warning ml-1 mr-1" onClick={logout}>LogOut</button>
                    <br /><br />
                    <div className='row mb-3  ' >
                        <div className='col-sm-12 me-2 col-md-3 col-lg-3 d-flex my-3 py-3 shadow ' onClick={() => getOrderDetails(dat)}>
                            <div className=' pt-3'>
                                <h4 fontWeight="600" fontSize="17px" >Your Orders</h4>
                                <span fontSize="16px" color="grey.600" ></span>
                            </div>
                        </div>
                        <div className='col-sm-12  me-2 col-md-3 col-lg-3 d-flex my-3 py-3 shadow' onClick={() => navigate('/myaddress')}>
                            <div className='pt-3'>
                                <h4 fontWeight="600" fontSize="17px" >Your Address</h4>
                                <span fontSize="16px" color="grey.600" >Manage your address</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left my-3 py-3 shadow' onClick={() => navigate('/wishlist')}>
                            <div className='pt-3' >
                                <h4 fontWeight="600" fontSize="17px" >Wish List</h4>
                                <span fontSize="16px" color="grey.600" >See what you wish for</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left py-3 my-3 pt-1 shadow' onClick={() => { getPendingOrderDetails(dat) }}>
                            <div className='pt-3'>
                                <h4 fontWeight="600" fontSize="17px"  >Pending Orders</h4>
                                <span fontSize="16px" color="grey.600" >Check Your Pending Orders</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left py-3 my-3 pt-1 shadow' onClick={() => navigate('/contact')}>
                            <div className='pt-3'>
                                <h4 fontWeight="600" fontSize="17px" >Contact Us</h4>
                                <span fontSize="16px" color="grey.600" >Have Query?</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left py-3 my-3 pt-1 shadow' onClick={() => navigate('/feedback')}>
                            <div className='pt-3'>
                                <h4 fontWeight="600" fontSize="17px" >FeedBack</h4>
                                <span fontSize="16px" color="grey.600" >Secure system</span>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                    </div>
                </div>
            </div>
            {modal && <>
                <div className='wrapper rounded' onClick={() => setModal(false)}></div>
                <div className="row order" >
                    <div className='ps-1' style={{ position: "fixed", top: 0, right: 0, zIndex: 99999, width: '20px' }} onClick={() => setModal(false)}>
                        &#10006;
                    </div>
                    <div>
                        {order.length &&
                            <div className="table-responsive" style={{ overflowY: "scroll", height: "80vh" }}>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Order Date</th>
                                            <th>Payment Method</th>
                                            <th>Order Status</th>
                                            <th>Amount</th>
                                            <th>Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {
                                            order.map((val, ind) => {
                                                return (<tr key={ind}>
                                                    <td>{ind + 1}</td>
                                                    <td >{new Date(val.updatedAt).toLocaleDateString()}</td>
                                                    <td>{(val.orderstatus === "cancelled") ? "---" : (val.paymentmode)}</td>
                                                    <td>{val.orderstatus}</td>
                                                    <td>{(val.orderstatus === "cancelled") ? "---" : (val.totalprice)}</td>
                                                    <td className='d-flex'>
                                                        <NavLink to={`/myorder/${val.id}`} className="btn btn-info btn-sm"><GrView></GrView></NavLink> &nbsp;
                                                        <NavLink to={`/invoice/${val.id}`} className="btn btn-info btn-sm"><GrDownload></GrDownload></NavLink>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        {!order.length && <>
                            <h2>Not Yet Placed Any Order</h2>
                            <div>
                                <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>
                            </div>
                        </>
                        }
                    </div>
                </div></>
            }
        </>
    )
}

export default MyAccount
