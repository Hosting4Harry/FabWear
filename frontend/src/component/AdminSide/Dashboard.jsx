import React from 'react'
import { CChart } from '@coreui/react-chartjs'

function Dashboard() {
    return (
        <section>
            <div className="container">
                <h1>Dashboard</h1>
                <div className='row mb-3  ' >
                    <div className='col-sm-12 me-2 col-md-4 col-lg-3  my-5 py-3 shadow '>
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
                    <div className='col-sm-12  me-2 col-md-3 col-lg-3 d-flex my-5 py-3 shadow' >
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
                    <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left my-5 py-3 shadow' >
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
                    <div className='col-sm-12 col-md-3 me-2  col-lg-3 d-flex border-left py-3 my-3 pt-1 shadow' >
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
                <div className="row d-flex card" style={{ height: "600px", width: "600px" }}>
                    <h3>Sale statistics</h3>
                    <div className='col card-body'>
                        <div className='container' >
                            <CChart
                                type="doughnut"
                                data={{

                                    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                                    datasets: [
                                        {
                                            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                            data: [40, 20, 80, 10],
                                        },]
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