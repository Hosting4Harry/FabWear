import React from 'react'
import { CChart } from '@coreui/react-chartjs'
import './Dashboard.css'
function Dashboard() {
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
                                <h4 fontWeight="600" fontSize="17px" >Revenue <br />$ 13,456.50</h4>
                                <span fontSize="16px" color="grey.600" >Shipping fees are not included</span>

                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-3 card2 col-md-6 d-flex my-5 py-3 shadow' >
                        <div className='pt-3 d-flex' >
                            <div className='pt-3'>
                                <img src="/img/delivery.png" alt="" />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px" >Orders <br />
                                    53.668
                                </h4>
                                <span fontSize="16px" color="grey.600" >Excluding orders in transit</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-3 card3 col-md-6 d-flex my-5 py-3 shadow' >
                        <div className='pt-3 d-flex' >
                            <div className='pt-3'>
                                <img src="/img/QR_icon.webp" alt="" style={{ height: "50px" }} />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px" >Products<br />
                                    9856
                                </h4>
                                <span fontSize="16px" color="grey.600" >In 11 Categories</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-3 col-md-6 card4 d-flex my-5 py-3 shadow' >
                        <div className='pt-3 d-flex'>
                            <div>
                                <img src="/img/bag_icon.png" alt="" width="50px" />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <h4 fontWeight="600" fontSize="17px"  >Monthly Earning<br />
                                    $6,982
                                </h4>
                                <span fontSize="16px" color="grey.600" >Based in your local time.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex row " style={{}}>
                    <h3>Sale statistics</h3>
                    <div className='col-6 '>
                        <div className=' w-100' >
                            <CChart
                                type="line"
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        {
                                            label: "My First dataset",
                                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                                            borderColor: "rgba(220, 220, 220, 1)",
                                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                            pointBorderColor: "#fff",
                                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                                        },
                                        {
                                            label: "My Second dataset",
                                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard