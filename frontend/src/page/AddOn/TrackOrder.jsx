import React from 'react'
import './TrackOrder.css'
import { Link } from 'react-router-dom';

function TrackOrder() {
    return (
        <div>
            <div className="container">
                <div className=" padding-bottom-3x mb-1">
                    <div className="card mb-3">
                        <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span><span className="text-medium">001698653lp</span></div>
                        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> Checking Quality</div>
                            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> APR 27, 2021</div>
                        </div>
                        <div className="card-body">
                            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                <div className="step completed">
                                    <div className="step-icon-wrap">
                                        <div className="step-icon"><i className="pe-7s-cart"></i></div>
                                    </div>
                                    <h4 className="step-title">Confirmed Order</h4>
                                </div>
                                <div className="step completed">
                                    <div className="step-icon-wrap">
                                        <div className="step-icon"><i className="pe-7s-config"></i></div>
                                    </div>
                                    <h4 className="step-title">Processing Order</h4>
                                </div>
                                <div className="step completed">
                                    <div className="step-icon-wrap">
                                        <div className="step-icon"><i className="pe-7s-medal"></i></div>
                                    </div>
                                    <h4 className="step-title">Quality Check</h4>
                                </div>
                                <div className="step">
                                    <div className="step-icon-wrap">
                                        <div className="step-icon"><i className="pe-7s-car"></i></div>
                                    </div>
                                    <h4 className="step-title">Product Dispatched</h4>
                                </div>
                                <div className="step">
                                    <div className="step-icon-wrap">
                                        <div className="step-icon"><i className="pe-7s-home"></i></div>
                                    </div>
                                    <h4 className="step-title">Product Delivered</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div className="custom-control custom-checkbox mr-3">
                            <input className="custom-control-input" type="checkbox" id="notify_me" checked="" />
                            <label className="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                        </div>
                        <div className="text-left text-sm-right"><Link className="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackOrder