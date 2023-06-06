import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Dashboard() {
    const [order, setOrder] = useState([]);
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
    const orders = async () => {
        const res = await axios.get('http://localhost:8000/product/getdataall');
        setTotalProducts(res.data);
        await axios('http://localhost:8000/order/allOrder')
            .then(res => {
                setOrder(res.data);
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
    console.log(total)
    useEffect(() => {
        orders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section style={{ marginBottom: '100px' }}>
            <div className="ms-5">
                <h1>Dashboard</h1>
                <div className='row mb-3'>
                    <div className='col-sm-12 card1 col-lg-3 col-md-6  my-5 py-3 shadow '>
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
                    <div className='col-sm-12 col-lg-3 card2 col-md-6 d-flex my-5 py-3 shadow' >
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
                    <div className='col-sm-12 col-lg-3 card3 col-md-6 d-flex my-5 py-3 shadow' >
                        <Link to='/admin/products' className='text-dark' style={{ "textDecoration": 'none' }}>

                            <div className='pt-3 d-flex' >
                                <div className='pt-3'>
                                    <img src="/img/QR_icon.webp" alt="" style={{ height: "50px" }} />
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

                </div>
                <div className=" row " style={{}}>
                    <h3>&nbsp; Sale statistics</h3>
                    <div className='col-1'></div>
                    <div className='col-6 border'>
                        <div className=' w-100' >
                            <h4>Graphical</h4>
                            <CChart
                                type="line"
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        {
                                            label: "Total orders for year 2023",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [data.jan, data.feb, data.mar, data.apr, data.may, data.june, data.jul, data.aug, data.sept, data.oct, data.nov, data.dec, 10]
                                        },
                                        {
                                            label: "Total orders for year 2022",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgb(236, 129, 7)",
                                            pointBackgroundColor: "rgb(236, 129, 7)",
                                            pointBorderColor: "#fff",
                                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
                                        }

                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-3 border ' >
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
                    <div className='col-1'></div>
                    <div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard