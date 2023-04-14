import React, { useEffect, useState, useRef, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../context/DataContext'

const MyAccount = () => {
    const { setLoading } = useContext(DataContext);
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
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                navigate("/");
                setLoading(false);
            }
        })

    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 10)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getOrderDetails = async (id) => {
        setLoading(true);
        if (!id) return;
        await axios.get(`http://localhost:8000/order/account/${id}`)
            .then(response => {
                setLoading(false);
                setOrder(response.data);
            })
    }
    useEffect(() => {
        const dat = +localStorage.getItem('EcomUserId');
        getOrderDetails(dat);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="payment" style={{ marginBottom: "200px" }}>
                <div className="container">
                    <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                    <button className="btn btn-warning ml-1 mr-1" onClick={logout}>LogOut</button>
                    <br /><br />
                    <div className='row mb-3  ' >
                        <div className='col-sm-12 me-1 col-md-3 col-lg-3 d-flex my-3 shadow ' onClick={() => setModal(true)}>
                            <div className=' pt-3'>
                                <h4 font-weight="600" font-size="17px" class="sc-96a18268-0 kgqhgk">Your Orders</h4>
                                <span font-size="16px" color="grey.600" class="sc-96a18268-0 gUjlsQ"></span>
                            </div>
                        </div>
                        <div className='col-sm-12  me-1 col-md-3 col-lg-3 d-flex my-3 shadow' onClick={() => navigate('/myaddress')}>
                            <div className='pt-3'>
                                <h4 font-weight="600" font-size="17px" class="sc-96a18268-0 kgqhgk">Your Address</h4>
                                <span font-size="16px" color="grey.600" class="sc-96a18268-0 gUjlsQ">7 Days Back</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-1  col-lg-3 d-flex border-left my-3 shadow'>
                            <div className='pt-3'>
                                <h4 font-weight="600" font-size="17px" class="sc-96a18268-0 kgqhgk">365 Days</h4>
                                <span font-size="16px" color="grey.600" class="sc-96a18268-0 gUjlsQ">For free return</span>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-3 me-1  col-lg-3 d-flex border-left my-3 pt-1 shadow'>
                            <div className='pt-3'>
                                <h4 font-weight="600" font-size="17px" class="sc-96a18268-0 kgqhgk">Pending</h4>
                                <span font-size="16px" color="grey.600" class="sc-96a18268-0 gUjlsQ">Secure system</span>
                            </div>
                        </div>

                    </div>
                    <div className=''>
                        <button className="btn btn-info" onClick={() => navigate('/products')}>Continue Shopping</button>&nbsp;
                        <button className="btn btn-light shadow-lg" onClick={() => navigate('/contact')}>Contact Us</button>
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
                            <div className="table-responsive">
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
                                    <tbody>
                                        {
                                            order.map((val, ind) => {
                                                return (<tr key={ind}>
                                                    <td>{ind + 1}</td>
                                                    <td >{new Date(val.updatedAt).toLocaleDateString()}</td>
                                                    <td>{(val.orderstatus === "cancelled") ? "---" : (val.paymentmode)}</td>
                                                    <td>{val.orderstatus}</td>
                                                    <td>{(val.orderstatus === "cancelled") ? "---" : (val.totalprice)}</td>
                                                    <td>
                                                        <NavLink to={`/myorder/${val.id}`} className="btn btn-info">View</NavLink>
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
