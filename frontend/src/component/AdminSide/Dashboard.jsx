import React, { useContext, useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { DataContext } from '../../context/DataContext';
import configData from '../../environments/config.json';
import useAuth from '../../context/useAuth';
function Dashboard() {
    const { totalUser, setTotalUser, order, setOrder } = useContext(DataContext);
    const instance = useAuth();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [totalProduct, setTotalProducts] = useState(0);
    const [data, setData] = useState({
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        june: 0,
        jul: 0,
        aug: 0,
        sept: 0,
        oct: 0,
        nov: 0,
        dec: 0
    });
    console.log(order)
    const orders = async () => {
        const res = await instance.get(`${configData.baseUrl}/product/getdataall`);
        const allUser = await instance.get(`${configData.baseUrl}/register/allUsers`);
        const orderRes = await instance.get(`${configData.baseUrl}/order/allOrder`);
        setOrder(orderRes.data);
        setTotalUser(allUser.data);
        setTotalProducts(res.data);
        await instance.get(`${configData.baseUrl}/order/allOrders`)
            .then(res => {
                var total2 = 0;
                res.data.map((item) => {
                    switch (item.createdAt.split('-')[1]) {
                        case '01':
                            setData(data => ({ ...data, jan: data.jan + 1 }))
                            break;
                        case '02':
                            setData(data => ({ ...data, feb: data.feb + 1 }))
                            break;
                        case '03':
                            setData(data => ({ ...data, mar: data.mar + 1 }))
                            break;
                        case '04':
                            setData(data => ({ ...data, apr: data.apr + 1 }))
                            break;
                        case '05':
                            setData(data => ({ ...data, may: data.may + 1 }))
                            break;
                        case '06':
                            setData(data => ({ ...data, june: data.june + 1 }))
                            break;
                        case '07':
                            setData(data => ({ ...data, jul: data.jul + 1 }))
                            break;
                        case '08':
                            setData(data => ({ ...data, aug: data.aug + 1 }))
                            break;
                        case '09':
                            setData(data => ({ ...data, sept: data.sept + 1 }))
                            break;
                        case '10':
                            setData(data => ({ ...data, oct: data.oct + 1 }))
                            break;
                        case '11':
                            setData(data => ({ ...data, nov: data.nov + 1 }))
                            break;
                        case '12':
                            setData(data => ({ ...data, dec: data.dec + 1 }))
                            break;
                        default:
                            break;
                    }

                    total2 = total2 + item.productprice
                    return total2;
                })
                setTotal(total2);
            });
    }

    const checkRole = () => {
        const token = localStorage.getItem('Ecomtoken');
        var decoded;
        if (token) {
            try {
                decoded = jwt_decode(token);
            } catch (error) {
            }
        }

        if (decoded?.role === 1 || decoded?.role === 2) {
            navigate("/dashboard");
        } else {
            navigate("/home");
        }
    }

    useEffect(() => {
        checkRole();
        orders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section style={{ marginBottom: '100px' }}>
            {/* <div className="ms-5"> */}
            <h1>Dashboard</h1>
            <div className='row mb-3 mx-5'>
                <div className='col-sm-10 card1 col-lg-3 col-md-5  my-5 py-3 shadow '>
                    <div className=' pt-3 d-flex'>
                        <div>
                            <img src="/img/dollar_icon.png" alt="" height="50px" />
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                            <h4 fontWeight="600" fontSize="17px" >Revenue <br />₹{total}.00</h4>
                            <span fontSize="16px" color="grey.600" >Shipping fees are not included</span>
                        </div>
                    </div>
                </div>
                <div className='col-sm-10 col-lg-3 card3 col-md-5 d-flex my-5 py-3 shadow ' >
                    <Link to='/admin/allUser' className='text-dark' style={{ "textDecoration": 'none' }}>

                        <div className='pt-3 d-flex' >
                            <div className='pt-3'>
                                <img src="/img/logo/user_logo.png" alt="" style={{ height: "50px" }} />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px" >
                                    Users <br />
                                    {totalUser.length}
                                </h4>
                                <span fontSize="16px" color="grey.600" >All registered users</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-sm-10 col-lg-3 card2 col-md-5 d-flex my-5 py-3 shadow ' >
                    <Link to='/admin/allOrders' className='text-dark' style={{ "textDecoration": 'none' }}>
                        <div className='pt-3 d-flex' >
                            <div className='pt-3'>
                                <img src="/img/delivery.png" alt="" />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px" >Orders <br />
                                    &nbsp;  {order.length}
                                </h4>
                                <span fontSize="16px" color="grey.600" >Excluding orders in transit</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-sm-10 col-lg-3 card3 col-md-5 d-flex my-5 py-3 shadow ' >
                    <Link to='/admin/products' className='text-dark' style={{ "textDecoration": 'none' }}>

                        <div className='pt-3 d-flex' >
                            <div className='pt-3'>
                                <img src="/img/product_icon.png" alt="" style={{ height: "50px" }} />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px" >
                                    Products <br />
                                    {totalProduct.length}
                                </h4>
                                <span fontSize="16px" color="grey.600" >In 4 Categories</span>
                            </div>
                        </div>
                    </Link>
                </div>


                {/* </div> */}
            </div>
            <div className='container'>
                <div className=" row " style={{}}>
                    <h3>Sale statistics</h3>
                    {/* <div className='col-1'></div> */}
                    <div className='col-8 border'>
                        <div className=' w-100' >
                            <h4>Graphical</h4>
                            <CChart
                                type="line"
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        {
                                            label: "Total orders ",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [data.jan, data.feb, data.mar, data.apr, data.may, data.june, data.jul, data.aug, data.sept, data.oct, data.nov, data.dec],
                                            borderWidth: 1
                                        },
                                        {
                                            label: "Total orders",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgb(236, 129, 7)",
                                            pointBackgroundColor: "rgb(236, 129, 7)",
                                            pointBorderColor: "#fff",
                                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            borderWidth: 1
                                        }

                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-4 border ' >
                        <div className=''>
                            <h4>Pie</h4>
                            <CChart
                                type="pie"
                                data={{
                                    labels: ["Product Sold", "Total Products", "Unsold Products"],
                                    datasets: [
                                        {
                                            backgroundColor: ['#41B883', '#00D8FF', '#DD1B16'],
                                            data: [order.length, totalProduct.length, totalProduct.length - order.length],
                                        }

                                    ],
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className='col-1'></div> */}
                    <div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Dashboard